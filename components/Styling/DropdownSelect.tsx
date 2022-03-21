import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, Modal, View, Pressable, ViewStyle, TextStyle, Animated, Easing} from 'react-native';
import {ColourService} from '../../styles/ColourService';
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface Props {
  label: string;
  data: {label: string; value: any}[];
  onSelect?: ((value: any) => void) | undefined;
  defaultSelected?: any;
  allowNone?: boolean;
}

export function DropdownSelect({label, data, onSelect, defaultSelected, allowNone}: Props) {
  const caretRotateAnim = useRef(new Animated.Value(1)).current;

  const StartButton = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownHorizontal, setDropdownHorizontal] = useState(0);

  useEffect(() => {
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [defaultSelected])


  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 48,
      borderBottomColor: colourSvc.getTextColour(),
      borderBottomWidth: 2,
      backgroundColor: colourSvc.getColour(undefined, 'surface', 'dark'),
      ...colourSvc.getViewElevationStyle(1) as ViewStyle,
    },
    buttonText: {
      flex: 1,
      marginLeft: 16,
      fontSize: 16,
      color: colourSvc.getTextColour(undefined, selected ? 'surface' : 'label'),
    },
    buttonChevron: {
      marginRight: 12,
      ...colourSvc.getTextColourStyle() as TextStyle,
    },
    icon: {
      marginRight: 10,
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: colourSvc.getColour(undefined, 'surface', 'dark'),
      ...colourSvc.getViewElevationStyle(1) as ViewStyle,
    },
    overlay: {
      width: '100%',
      height: '100%',
    },
    item: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    itemText: {
      ...colourSvc.getTextColourStyle() as TextStyle,
    },
  });

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const caretFlip = (open: boolean): void => {
    Animated.timing(
      caretRotateAnim,
      {
        toValue: open ? -1 : 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease
      }
    ).start();
  }

  useEffect(() => {
    StartButton.current?.measureInWindow((x, y, width, height) => {
      setDropdownHorizontal(x);
      setDropdownTop(y+height);
    });
  }, [StartButton])

  const openDropdown = (): void => {
    setVisible(true);
    caretFlip(true);
  };

  const closeDropdown = (): void => {
    setVisible(false);
    caretFlip(false);
  }

  const onItemPress = (item: any): void => {
    setSelected(item);
    if (onSelect) {
      onSelect(item.value);
    }
    setVisible(false);
  };

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <Pressable style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </Pressable>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType={"fade"}>
        <Pressable style={styles.overlay} onPress={closeDropdown}>
          <View style={[styles.dropdown, { top: dropdownTop, left: dropdownHorizontal, right: dropdownHorizontal }]}>
            <FlatList
              data={allowNone ? [{label: 'None', value: undefined}, ...data] : data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <Pressable ref={StartButton} style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {selected?.label || label}
      </Text>
      <Animated.View style={{transform: [{scaleY: caretRotateAnim}]}}>
        <MaterialCommunityIcons name={'chevron-down'} size={24} style={styles.buttonChevron}/>
      </Animated.View>
    </Pressable>
  );
}

