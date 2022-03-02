import {StyleSheet, ViewStyle} from 'react-native';
import {Image} from "react-native-expo-image-cache";
import {Text, View} from '../../Styling/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../../styles/ColourService';
import {NibModel} from '../../../db/models/NibModel';
import useColorScheme from '../../../hooks/useColorScheme';

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

export default function NibListItem({nib}: {nib: NibModel}) {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    icon: {
      width: 100,
      height: 100,
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
    manufacturer: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    size: {
      textTransform: 'uppercase',
    },
  });

  const image = <Image style={{width: 100, height: 100, marginLeft: 12}} uri={nib.image?.url} />;
  const noImage = <MaterialCommunityIcons
      size={styles.icon.width}
      style={[styles.icon, colourSvc.getTextColourStyle()]}
      name={'fountain-pen-tip'}
    />;

  return (<View style={styles.view} elevation={2}>
    <Text>{Boolean(nib.image)}</Text>
    {Boolean(nib.image) ? image : noImage}
    <View style={styles.data}>
      <Text style={styles.size}>{nib.size}</Text>
      <Text style={styles.manufacturer}>{nib.manufacturer}</Text>
      <Text style={styles.color}>{nib.colour}</Text>
    </View>
  </View>);
}
