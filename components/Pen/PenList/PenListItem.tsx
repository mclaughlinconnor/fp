import AbstractListItem from '../../Abstract/AbstractListItem';
import React from 'react';
import {PenModel} from '../../../db/models/PenModel';
import {PenStackRouteType} from '../PenNavigator';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../Styling/Themed';
import {useNavigation} from '@react-navigation/native';

export default function PenListItem({pen}: {pen: PenModel}) {
  const navigation = useNavigation<PenStackRouteType['PenList']['navigation']>();

  const styles = StyleSheet.create({
    color: {
      fontSize: 14,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    nib: {
      textTransform: 'uppercase',
    },
  });

  const goToPen = () => {
    return navigation.navigate('PenView', {penId: pen._id.toHexString()})
  }

  const penDataElement = (
    <View>
      <Text style={styles.nib}>{pen.nib.manufacturer} {pen.nib.size}</Text>
      <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
      <Text style={styles.color}>{pen.colour}</Text>
    </View>
  )

  return (
    <AbstractListItem goToView={goToPen} imageUrl={pen.image.url} objectDataElement={penDataElement} />
  )
}
