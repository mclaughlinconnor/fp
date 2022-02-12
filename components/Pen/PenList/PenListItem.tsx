import { StyleSheet, ViewStyle } from 'react-native';
import { Text, View } from '../../Styling/Themed';
import { Pen } from '../Pen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ColourService} from '../../../styles/ColourService';

const colourSvc = new ColourService({});

const card = {
  borderRadius: 4
}

const horizontalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const verticalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  item: {
    marginVertical: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    ...horizontalLayout,
    ...card,
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
    fontWeight: 'bold'
  },
  nib: {
    textTransform: 'uppercase',
  }
});

export default function PenListItem({ pen }: { pen: Pen }) {
  return (
    <View style={styles.item} elevation={2}>
      <MaterialCommunityIcons size={styles.icon.width} style={[styles.icon, colourSvc.getTextColourStyle()]} name={pen.icon} />
      <View style={styles.data}>
        <Text style={styles.nib}>{pen.nib.size}</Text>
        <Text style={styles.name}>{pen.name}</Text>
        <Text style={styles.color}>{pen.color}</Text>
      </View>
    </View>
  );
}
