import {Text, View} from '../Styling/Themed';
import {Image} from 'react-native-expo-image-cache';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {realmInstance} from '../../db/Realm';
import {PenModel} from '../../db/models/PenModel';
import {LinedHeading} from '../Styling/LinedHeading';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../styles/ColourService';
import {InkStackRouteType} from './InkNavigator';
import {InkModel} from '../../db/models/InkModel';
import {BottomTabProps} from '../../navigation/types';

export default function InkViewScreen() {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    headerImage: {
      width: '100%',
      aspectRatio: 1,
    },
    edit: {
      position: 'absolute',
      top: 16,
      right: 16,
      elevation: 8,
      color: colourSvc.getTextColour(undefined, 'primary'),
      padding: 8,
      borderRadius: 8,
      backgroundColor: colourSvc.getColour(undefined, 'primary'),
      zIndex: 1
    },
    textContainer: {
      margin: 12,
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 12,
      alignItems: 'center'
    },
    data: {
      flexDirection: 'column',
      width: '70%',
    },
    image: {
      width: '20%',
      aspectRatio: 1,
    },
  });

  const [ink, setInk] = useState<InkModel>()

  const navigation = useNavigation<InkStackRouteType['InkView']['navigation']>();
  const rootNavigation = useNavigation<BottomTabProps['navigation']>();
  const route = useRoute<InkStackRouteType['InkView']['route']>();
  const {inkId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(inkId);
    const ink = realmInstance.objectForPrimaryKey('Ink', uuid) as InkModel;

    return ink.addListener(() => {
      setInk(realmInstance.objectForPrimaryKey('Ink', uuid));
    });
  }, [realmInstance, inkId])

  if (!ink) {
    return null;
  }

  const goToPen = (pen: PenModel) => {
    return rootNavigation.navigate('Pen', {screen: 'PenView', params: {penId: pen._id.toHexString()}})
  }

  const inkView = (
    <View>
      <LinedHeading text={'Ink'}/>
      <View style={styles.content}>
        <View style={styles.data}>
          <Text style={styles.name}>{ink.manufacturer} {ink.name}</Text>
          <Text>Volume: {ink.volume}ml</Text>
          <Text>Colour: {ink.colour}</Text>
        </View>
        <Image style={styles.image} uri={ink.image.url}/>
      </View>
    </View>
  );

  const PenItemView = ({pen}: {pen: PenModel}) => {
    return (
      <Pressable onPress={() => goToPen(pen)}>
        <View style={styles.content}>
          <View style={styles.data}>
            <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
            <Text>Colour: {pen.colour}</Text>
          </View>
          <Image style={styles.image} uri={pen.image.url}/>
        </View>
      </Pressable>
    );
  }

  const goToInkEdit = () => {
    return navigation.navigate('InkCreate', {inkId: ink._id.toHexString()})
  }

  return (
    <View>
      <MaterialCommunityIcons style={styles.edit} name={'pencil'} size={32} onPress={goToInkEdit}/>
      <ScrollView>
        <View elevation={4}>
          <Image style={styles.headerImage} uri={ink.image.url}/>
        </View>
        <View style={styles.textContainer}>
          {inkView}
          <LinedHeading text={'Pens'}/>
          {ink.pens.map(pen => <PenItemView pen={pen} key={pen._id.toHexString()}/>)}
        </View>
      </ScrollView>
    </View>
  )
}
