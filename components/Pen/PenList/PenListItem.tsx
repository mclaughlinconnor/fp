import {StyleSheet, ViewStyle} from 'react-native';
import {Text, View} from '../../Styling/Themed';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ColourService} from '../../../styles/ColourService';
import {PenModel} from '../../../db/models/PenModel';
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

export default function PenListItem({pen}: {pen: PenModel}) {
  const theme = useColorScheme();

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

  return (<View style={styles.view} elevation={2}>
    <MaterialCommunityIcons
      size={styles.icon.width}
      style={[styles.icon, colourSvc.getTextColourStyle()]}
      name={pen.icon}
    />
    <View style={styles.data}>
      <Text style={styles.nib}>{nibNames(pen.nibs)}</Text>
      <Text style={styles.name}>{pen.name}</Text>
      <Text style={styles.color}>{pen.colour}</Text>
    </View>
  </View>);
}
