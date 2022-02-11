import { StyleSheet, ViewStyle } from 'react-native';
import { Text, View } from '../../Themed';
import { Pen } from '../Pen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const depthTwo = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,

  elevation: 2,
}

const card = {
  backgroundColor: 'white',
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
    marginHorizontal: 10
  },
  item: {
    marginVertical: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    ...horizontalLayout,
    ...card,
    ...depthTwo
  },
  data: {
    marginHorizontal: 10,
    color: 'black',
    backgroundColor: 'white',
    ...verticalLayout
  },
  color: {
    fontSize: 14,
    color: 'black'
  },
  name: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold'
  },
  nib: {
    textTransform: 'uppercase',
    color: 'black'
  }
});

export default function PenListItem({ pen }: { pen: Pen }) {
  return (
    <View style={styles.item}>
      <MaterialCommunityIcons size={styles.icon.width} style={styles.icon} name={pen.icon} />
      <View style={styles.data}>
        <Text style={styles.nib}>{pen.nib.size}</Text>
        <Text style={styles.name}>{pen.name}</Text>
        <Text style={styles.color}>{pen.color}</Text>
      </View>
    </View>
  );
}
