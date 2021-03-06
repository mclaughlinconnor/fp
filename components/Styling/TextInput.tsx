import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput as DefaultTextInput,
  Text,
  Animated,
  TextStyle,
  ViewStyle,
  Pressable, KeyboardType,
} from "react-native";
import {ColourService} from '../../styles/ColourService';

interface Props {
  style?: TextStyle;
  onChangeText?: ((nib: string) => void) | undefined;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
}

export function TextInput({style, value, onChangeText, placeholder, keyboardType}: Props) {
  const colourSvc = new ColourService({});

  const inputRef = useRef<DefaultTextInput>(null);

  const inputElevation = 1;

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
      ...colourSvc.getViewElevationStyle(inputElevation) as ViewStyle,
      ...colourSvc.getTextColourStyle(),
    },
    label: {
      color: colourSvc.getTextColour(undefined, 'label'),
      fontSize: 16,
    },
    labelContainer: {
      top: 24,
      width: 200,
      left: 16 + 16, // Overall padding + Label padding
      right: 12 + 16, // Overall padding + Label padding
      position: 'absolute',
      elevation: inputElevation + 1,
    },
  });

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value) {
      moveTextTop();
    }
  }, [value])

  const onFocusHandler = () => {
    inputRef.current?.focus();
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
    outputRange: [0, -24],
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
      <Pressable onPress={onFocusHandler}>
        <DefaultTextInput
          style={styles.input}
          value={value}
          keyboardType={keyboardType || 'default'}
          onChangeText={onChangeText}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={inputRef || undefined}
        />
        <Animated.View style={[styles.labelContainer, animStyle]}>
          <Text style={styles.label}>{placeholder}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

