import {StyleSheet, ViewStyle} from 'react-native';
import {Image} from "react-native-expo-image-cache";
import {Text, View} from '../../Styling/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../../styles/ColourService';
import useColorScheme from '../../../hooks/useColorScheme';
import {InkModel} from '../../../db/models/InkModel';

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

export default function InkListItem({ink}: {ink: InkModel}) {
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
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    manufacturer: {
      textTransform: 'uppercase',
    },
  });

  const image = <Image style={{width: 100, height: 100, marginLeft: 12}} uri={ink.image?.url} />;
  const noImage = <MaterialCommunityIcons
      size={styles.icon.width}
      style={[styles.icon, colourSvc.getTextColourStyle()]}
      name={'water'}
    />;

  return (<View style={styles.view} elevation={2}>
    <Text>{Boolean(ink.image)}</Text>
    {Boolean(ink.image) ? image : noImage}
    <View style={styles.data}>
      <Text style={styles.manufacturer}>{ink.manufacturer}</Text>
      <Text style={styles.name}>{ink.name}</Text>
      <Text style={styles.color}>{ink.colour}</Text>
    </View>
  </View>);
}
