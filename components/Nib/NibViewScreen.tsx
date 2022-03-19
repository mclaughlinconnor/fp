import {Text, View} from '../Styling/Themed';
import {Image} from 'react-native-expo-image-cache';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {realmInstance} from '../../db/Realm';
import {PenModel} from '../../db/models/PenModel';
import {LinedHeading} from '../Styling/LinedHeading';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../styles/ColourService';
import {NibStackRouteType} from './NibNavigator';
import {NibModel} from '../../db/models/NibModel';

export default function NibViewScreen() {
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

  const [nib, setNib] = useState<NibModel>()

  const navigation = useNavigation<NibStackRouteType['NibView']['navigation']>();
  const route = useRoute<NibStackRouteType['NibView']['route']>();
  const {nibId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(nibId);
    const nib = realmInstance.objectForPrimaryKey('Nib', uuid) as NibModel;

    return nib.addListener(() => {
      setNib(realmInstance.objectForPrimaryKey('Nib', uuid));
    });
  }, [realmInstance, nibId])

  if (!nib) {
    return null;
  }

  const nibView = (
    <View>
      <LinedHeading text={'Nib'}/>
      <View style={styles.content}>
        <View style={styles.data}>
          <Text style={styles.name}>{nib.manufacturer} {nib.size}</Text>
          <Text>Colour: {nib.colour}</Text>
        </View>
        <Image style={styles.image} uri={nib.image.url}/>
      </View>
    </View>
  );

  const PenItemView = ({pen}: {pen: PenModel}) => {
    return (
      <View>
        <View style={styles.content}>
          <View style={styles.data}>
            <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
            <Text>Colour: {pen.colour}</Text>
          </View>
          <Image style={styles.image} uri={pen.image.url}/>
        </View>
      </View>
    );
  }

  const goToNibEdit = () => {
    return navigation.navigate('NibCreate', {nibId: nib._id.toHexString()})
  }

  return (
    <View>
      <MaterialCommunityIcons style={styles.edit} name={'pencil'} size={32} onPress={goToNibEdit}/>
      <ScrollView>
        <View elevation={4}>
          <Image style={styles.headerImage} uri={nib.image.url}/>
        </View>
        <View style={styles.textContainer}>
          {nibView}
          <LinedHeading text={'Pens'}/>
          {nib.pens.map(pen => <PenItemView pen={pen} key={pen._id.toHexString()}/>)}
        </View>
      </ScrollView>
    </View>
  )
}
