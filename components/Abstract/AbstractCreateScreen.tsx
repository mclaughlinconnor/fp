import CameraInput from '../Styling/Camera/CameraInput';
import {Button, KeyboardType, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';
import {CameraCapturedPicture} from 'expo-camera';
import {ColourService} from '../../styles/ColourService';
import {DropdownSelect} from '../Styling/DropdownSelect';
import {InkModel} from '../../db/models/InkModel';
import {NibModel} from '../../db/models/NibModel';
import {PenModel} from '../../db/models/PenModel';
import {TextInput} from '../Styling/TextInput';
import {View} from '../Styling/Themed';
import {useState} from 'react';

type dropdownControlSpec = {
  controlType: 'dropdown';
  value: any;
  setValue: (value: any) => void;
  label: string;
  data: any[] | Realm.Results<any>;
  itemGenerator: (value: any) => {
    label: string;
    value: any;
  };
  allowNone: boolean;
}

type textControlSpec = {
  controlType: 'text';
  value: string;
  setValue: (value: string) => void;
  label: string;
  keyboardType?: KeyboardType;
}

type cameraControlSpec = {
  controlType: 'camera';
  setValue: (value: CameraCapturedPicture) => void;
}

export type createSpec = (textControlSpec | dropdownControlSpec | cameraControlSpec) & {prop: string};

type Props = {
  createSpec: createSpec[];
  create: (data: any) => Promise<void>;
  update: (data: any) => Promise<void>;
  toBeUpdated?: PenModel | InkModel | NibModel;
}

export const isIdPropertyChanged = (oldProperty: any, newProperty: any) => {
  return oldProperty?._id?.toHexString() === newProperty?._id?.toHexString() ? undefined : newProperty;
}

export const isPropertyChanged = (oldPenProperty: any, newPenProperty: any) => {
  return oldPenProperty === newPenProperty ? undefined : newPenProperty;
}


export default function AbstractCreateScreen({createSpec, create, update, toBeUpdated}: Props) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    create: {
      marginTop: 'auto',
      marginBottom: 12,
      marginHorizontal: 16,
    }
  });

  const [confirmDisabled, onChangeConfirmDisabled] = useState<boolean>(false);

  const confirmOp = async () => {
    onChangeConfirmDisabled(true)

    if (Boolean(toBeUpdated)) {
      await update(toBeUpdated);
    } else {
      await create(toBeUpdated);
    }

    ToastAndroid.show('Done', ToastAndroid.SHORT);
  }

  const getControlElement = (spec: createSpec) => {
    let element;

    switch (spec.controlType) {
      case 'text':
        element = (
          <TextInput
            key={spec.prop}
            onChangeText={spec.setValue}
            value={spec.value}
            placeholder={spec.label}
            keyboardType={spec.keyboardType || 'default'}
          />
        );
        break;
      case 'dropdown':
        element = (
          <View style={{marginHorizontal: 16, marginTop: 12}} key={spec.prop}>
            <DropdownSelect
              label={spec.label}
              data={spec.data.map(spec.itemGenerator)}
              onSelect={spec.setValue}
              defaultSelected={
                spec.value ? spec.itemGenerator(spec.value) : undefined
              }
              allowNone={spec.allowNone}
            />
          </View>
        );
        break;
      case 'camera':
        element = <CameraInput onPhotoSave={spec.setValue} key={spec.prop}/>;
        break;
    }

    return element;
  }

  return (
    <SafeAreaView style={styles.container}>
      {createSpec.map(getControlElement)}
      <View style={styles.create}>
        <Button
          title={Boolean(toBeUpdated) ? 'Update' : 'Create'}
          onPress={confirmOp}
          color={colourSvc.getColour(undefined, 'primary')}
          disabled={confirmDisabled}
        />
      </View>
    </SafeAreaView>
  );
}
