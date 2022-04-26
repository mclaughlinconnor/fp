import {Button, Modal, Pressable, ViewProps} from 'react-native';
import {ColourService} from '../../styles/ColourService';
import {DropdownSelect} from '../Styling/DropdownSelect';
import {ReactElement} from "react";
import {TextInput} from '../Styling/TextInput';
import {View} from '../Styling/Themed';

type dropdownControlSpec = {controlType: 'dropdown', label: string, value: any, setValue: (value: any) => void, data: any[]}
type textControlSpec = {controlType: 'text', label: string, value: any, setValue: (value: any) => void}
type customControlSpec = {controlType: 'custom', value: any, customElement: ReactElement}

export type filterSpec = (dropdownControlSpec | textControlSpec | customControlSpec) & {prop: string};

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setFilter: (filter: string) => void;
  generateQueryString: (params: any) => string;
  filterSpec: filterSpec[]
}

export default function AbstractFilter({visible, setVisible, setFilter, generateQueryString, filterSpec}: Props) {
  const colourSvc = new ColourService({});

  const generateItem = (value: any): {value: any, label: string} => {
    return {value, label: value.toString()}
  }

  const styles = {
    overlay: {
      width: '100%',
      height: '100%',
      flex: 1,
    },
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingBottom: 16,
    },
    inputContainer: {
      marginHorizontal: 16,
      marginTop: 12,
    },
  }

  const complete = () => {
    setVisible(false);
    setFilter(
      generateQueryString(
        filterSpec.map(spec => {
          return {[spec.prop]: spec.value};
        })
      )
    );
  }

  const getControlElement = (spec: filterSpec) => {
    let element: ReactElement;

    switch (spec.controlType) {
      case 'dropdown':
        element = (
          <View style={styles.inputContainer} key={spec.prop}>
            <DropdownSelect
              label={spec.label}
              data={spec.data.map(generateItem)}
              onSelect={spec.setValue}
              defaultSelected={spec.value ? generateItem(spec.value) : undefined}
              allowNone={true}
            />
          </View>
        )
        break;
      case 'text':
        element = (
          <TextInput
            key={spec.prop}
            placeholder={spec.label}
            onChangeText={spec.setValue}
            value={spec.value}
          />
        )
        break;
      case 'custom':
        element = (
          <View style={styles.inputContainer} key={spec.prop}>
            {spec.customElement}
          </View>
        );
        break;
    }

    return element;
  }

  return (
    <Modal visible={visible} transparent animationType={'slide'}>
       <Pressable style={styles.overlay as ViewProps} onPress={() => setVisible(false)}>
         <View style={styles.container as ViewProps} elevation={12} colour={'background'}>
          {filterSpec.map(getControlElement)}
          <View style={styles.inputContainer}>
            <Button
              title={'Filter'}
              onPress={complete}
              color={colourSvc.getColour(undefined, 'primary')}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
