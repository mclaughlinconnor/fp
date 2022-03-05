import {Text, View} from '../Styling/Themed';
import {Image} from 'react-native-expo-image-cache';
import {ScrollView, StyleSheet} from 'react-native';
import {PenStackRouteType} from './PenNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {realmInstance} from '../../db/Realm';
import {PenModel} from '../../db/models/PenModel';
import {LinedHeading} from '../Styling/LinedHeading';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../styles/ColourService';

export default function PenViewScreen() {
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

  const [pen, setPen] = useState<PenModel>()

  const navigation = useNavigation<PenStackRouteType['PenView']['navigation']>();
  const route = useRoute<PenStackRouteType['PenView']['route']>();
  const {penId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(penId);
    const pen = realmInstance.objectForPrimaryKey('PenModel', uuid) as PenModel;

    pen.addListener(() => {
      setPen(realmInstance.objectForPrimaryKey('PenModel', uuid));
    });
  }, [realmInstance, penId])

  if (!pen) {
    return null;
  }

  const inkView = !pen.ink ? null : (
    <View>
      <LinedHeading text={'Ink'}/>
      <View style={styles.content}>
        <View style={styles.data}>
          <Text style={styles.name}>{pen.ink.manufacturer} {pen.ink.name}</Text>
          <Text>Ink volume: {pen.ink.volume}ml</Text>
          <Text>Ink colour: {pen.ink.colour}</Text>
        </View>
        <Image style={styles.image} uri={pen.ink.image.url}/>
      </View>
    </View>
  );

  const nibView = !pen.nib ? null : (
    <View>
      <LinedHeading text={'Nib'}/>
      <View style={styles.content}>
        <View style={styles.data}>
          <Text style={styles.name}>{pen.nib.manufacturer} {pen.nib.size}</Text>
          <Text>Size: {pen.nib.colour}</Text>
        </View>
        <Image style={styles.image} uri={pen.nib.image.url}/>
      </View>
    </View>
  );

  const penView = (
    <View>
      <LinedHeading text={'Pen'}/>
      <View style={styles.content}>
        <View style={styles.data}>
          <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
          <Text>Colour: {pen.colour}</Text>
        </View>
      </View>
    </View>
  );

  const goToPenEdit = () => {
    return navigation.navigate('PenCreate', {penId: pen._id.toHexString()})
  }

  return (
    <View>
      <MaterialCommunityIcons style={styles.edit} name={'pencil'} size={32} onPress={goToPenEdit}/>
      <ScrollView>
        <View elevation={4}>
          <Image style={styles.headerImage} uri={pen.image.url}/>
        </View>
        <View style={styles.textContainer}>
          {penView}
          {pen.nib ? nibView : null}
          {pen.ink ? inkView : null}
        </View>
      </ScrollView>
    </View>
  )
}
