import {Text, View} from '../Styling/Themed';
import {Image} from 'react-native-expo-image-cache';
import {ScrollView, StyleSheet} from 'react-native';
import {PenStackRouteType} from './PenNavigator';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {realmInstance} from '../../db/Realm';
import {PenModel} from '../../db/models/PenModel';
import {LinedHeading} from '../Styling/LinedHeading';

export default function PenViewScreen() {
  const styles = StyleSheet.create({
    headerImage: {
      width: '100%',
      aspectRatio: 1,
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

  const route = useRoute<PenStackRouteType['PenView']['route']>();
  const {penId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(penId);
    const pen = realmInstance?.objectForPrimaryKey('PenModel', uuid) as PenModel;
    setPen(pen);
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

  return (
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
  )
}
