import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColourService} from '../../styles/ColourService';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ComponentProps} from 'react';

export function FloatingActionButton({onPress, index = 0, icon = 'plus'}: {onPress: () => any, index?: number, icon?: ComponentProps<typeof MaterialCommunityIcons>['name']}) {
  const colourService = new ColourService({});

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      borderRadius: 28,
      bottom: 16 + (64 * index),
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
      <MaterialCommunityIcons style={styles.icon} size={styles.icon.width} name={icon}/>
    </TouchableOpacity>
  </View>
}