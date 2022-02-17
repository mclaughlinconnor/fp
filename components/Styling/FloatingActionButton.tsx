import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColourService} from '../../styles/ColourService';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export function FloatingActionButton({onPress}: {onPress: () => any}) {
  const colourService = new ColourService({});

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      borderRadius: 28,
      bottom: 16,
      right: 16,
      alignItems: 'center',
      justifyContent: 'center',
      ...colourService.getColourStyle(undefined, 'primary')
    },
    icon: {
      width: 24,
      height: 24,
      ...colourService.getTextColourStyle(undefined, 'primary')
    }
  })

  return <View style={styles.fab}>
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons style={styles.icon} size={styles.icon.width} name={'plus'}/>
    </TouchableOpacity>
  </View>
}