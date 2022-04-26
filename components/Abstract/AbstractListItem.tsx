import React, {ReactElement} from 'react';
import useColorScheme from '../../hooks/useColorScheme';
import {GestureResponderEvent, Pressable, StyleSheet, ViewStyle} from 'react-native';
import {Image} from "react-native-expo-image-cache";
import {View} from '../Styling/Themed';

const horizontalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const verticalLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'column',
}

type Props = {
  goToView: (event: GestureResponderEvent) => void;
  imageUrl: string;
  objectDataElement: ReactElement;
}

export default function AbstractListItem({goToView, imageUrl, objectDataElement}: Props) {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
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
  });

  const image = <Image style={{width: 100, height: 100, marginLeft: 12}} uri={imageUrl} />;

  return (
    <Pressable onPress={goToView}>
      <View style={styles.view} elevation={2}>
        {image}
        <View style={styles.data}>
          {objectDataElement}
        </View>
      </View>
    </Pressable>
  );
}
