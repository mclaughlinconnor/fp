import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {Image} from "react-native-expo-image-cache";
import {Text, View} from '../../Styling/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../../styles/ColourService';
import {NibModel} from '../../../db/models/NibModel';
import useColorScheme from '../../../hooks/useColorScheme';
import React from 'react';
import {PenModel} from '../../../db/models/PenModel';
import {PenStackRouteType} from '../PenNavigator';
import {useNavigation} from '@react-navigation/native';

const colourSvc = new ColourService({});

const horizontalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const verticalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'column',
}

export default function PenListItem({pen}: {pen: PenModel}) {
  const theme = useColorScheme();
  const navigation = useNavigation<PenStackRouteType['PenList']['navigation']>();

  const styles = StyleSheet.create({
    icon: {
      width: 80,
      height: 80,
      marginHorizontal: 10,
    },
    view: {
      marginVertical: 4,
      marginHorizontal: 10,
      paddingVertical: 10,
      borderRadius: theme === 'light' ? 0 : 4, // Borked shadows aren't visible with the dark theme
      ...horizontalLayout,
    },
    data: {
      marginHorizontal: 10,
      ...verticalLayout
    },
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

  function nibNames(nibs: NibModel[]) {
    return nibs
      .map(nib => `${nib.manufacturer} ${nib.size}`)
      .join(', ');
  }

  const goToPen = () => {
    return navigation.navigate('PenView', {penId: pen._id.toHexString()})
  }

  const image = <Image style={{width: 100, height: 100, marginLeft: 12}} uri={pen.image.url} />;
  const noImage = <MaterialCommunityIcons
      size={styles.icon.width}
      style={[styles.icon, colourSvc.getTextColourStyle()]}
      name={pen.icon}
    />;

  return (
    <Pressable onPress={goToPen}>
      <View style={styles.view} elevation={2}>
        {Boolean(pen.image) ? image : noImage}
        <View style={styles.data}>
          <Text style={styles.nib}>{nibNames(pen.nibs)}</Text>
          <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
          <Text style={styles.color}>{pen.colour}</Text>
        </View>
      </View>
    </Pressable>
  );
}
