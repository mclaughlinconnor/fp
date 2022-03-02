import {useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel, NibSize, NibSizes} from '../../db/models/NibModel';
import {View} from '../Styling/Themed';
import {DropdownSelect} from '../Styling/DropdownSelect';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';

export default function NibCreateScreen({}) {
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

  const [nibSize, onChangeNibSize] = useState<NibSize | null>(null);
  const [manufacturer, onChangeManufacturer] = useState('');
  const [colour, onChangeColour] = useState('');

  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const generateNibSizeItems = (size: NibSize): {value: NibSize, label: string} => {
    return {value: size, label: size.toString()}
  }

  const addNib = async (): Promise<void> => {
    if (!colour || !manufacturer || !nibSize || !photo) {
      return;
    }

    const file = await FileModel.uploadGenerate({}, photo.uri, 'images', 'nibs')

    const nib = {
      colour,
      size: nibSize,
      manufacturer,
      image: file,
    } as Partial<NibModel>;

    const realm = realmInstance;
    realm?.write(() => {
      realm?.create('NibModel', NibModel.generate(nib));
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={onChangeManufacturer}
        value={manufacturer}
        placeholder={'Nib manufacturer'}
      />
      <TextInput
        onChangeText={onChangeColour}
        value={colour}
        placeholder={'Nib colour'}
      />
      <View style={{marginHorizontal: 16, marginTop: 12}}>
        <DropdownSelect label={'Select nib size...'} data={NibSizes.map(generateNibSizeItems)} onSelect={onChangeNibSize}/>
      </View>
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={'Create'} onPress={addNib} color={colourSvc.getColour(undefined, 'primary')}/>
      </View>
    </SafeAreaView>
  );
}
