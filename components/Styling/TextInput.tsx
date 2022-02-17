import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput as DefaultTextInput,
  Text,
  Animated,
  TextStyle,
  ViewStyle,
} from "react-native";
import {ColourService, OVER_ALL} from '../../styles/ColourService';

interface Props {
  style?: TextStyle;
  onChangeText?: ((nib: string) => void) | undefined;
  value?: string;
  placeholder?: string;
}

export function TextInput({style, value, onChangeText, placeholder}: Props) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      ...style
    },
    input: {
      height: 48,
      marginTop: 12,
      marginHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: colourSvc.getTextColour(),
      paddingBottom: 8,
      paddingTop: 20,
      paddingLeft: 16,
      paddingRight: 12,
      fontSize: 16,
      backgroundColor: colourSvc.getColour(undefined, 'surface', 'dark'),
      ...colourSvc.getViewElevationStyle(1) as ViewStyle,
      ...colourSvc.getTextColourStyle(),
    },
    label: {
      color: colourSvc.getTextColour(undefined, 'label'),
      fontSize: 16,
    },
    labelContainer: {
      top: 24,
      width: 100,
      left: 16 + 16, // Overall padding + Label padding
      right: 12 + 16, // Overall padding + Label padding
      position: 'absolute',
      elevation: OVER_ALL,
    },
  });

  const moveText = useRef(new Animated.Value(0)).current;

  console.log(colourSvc.getColour(undefined, 'surface', 'dark'));

  useEffect(() => {
    if (value) {
      moveTextTop();
    }
  }, [])

  const onFocusHandler = () => {
    moveTextTop();
  };

  const onBlurHandler = () => {
    if (!value) {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const labelSize = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });
  const labelXOffset = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });
  const labelYOffset = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const animStyle = {
    transform: [
      {translateX: labelXOffset},
      {translateY: labelYOffset},
      {scale: labelSize}
    ],
  };

  return (
    <View style={styles.container}>
      <DefaultTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
      <Animated.View style={[styles.labelContainer, animStyle]}>
        <Text style={styles.label}>{placeholder}</Text>
      </Animated.View>
    </View>
  );
}

