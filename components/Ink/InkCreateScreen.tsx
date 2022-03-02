import {useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {View} from '../Styling/Themed';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {InkModel} from '../../db/models/InkModel';

export default function PenCreateScreen({}) {
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

  const [name, onChangeName] = useState('');
  const [colour, onChangeColour] = useState('');
  const [manufacturer, onChangeManufacturer] = useState('');
  const [volume, onChangeVolume] = useState<string>('');

  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const addInk = async (): Promise<void> => {
    let intVolume
    try {
      intVolume = parseInt(volume);
    } catch {
      return;
    }

    if (!name || !colour || !manufacturer || !intVolume || !photo) {
      return;
    }

    const file = await FileModel.uploadGenerate({}, photo.uri, 'images', 'inks')

    const ink = {
      name,
      colour,
      manufacturer,
      volume: intVolume,
      image: file,
    } as Partial<InkModel>;

    const realm = realmInstance;
    realm?.write(() => {
      realm?.create('InkModel', InkModel.generate(ink));
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={onChangeName}
        value={name}
        placeholder={'Ink name'}
      />
      <TextInput
        onChangeText={onChangeManufacturer}
        value={manufacturer}
        placeholder={'Ink manufacturer'}
      />
      <TextInput
        onChangeText={onChangeColour}
        value={colour}
        placeholder={'Ink colour'}
      />
      <TextInput
        onChangeText={onChangeVolume}
        value={volume}
        placeholder={'Ink volume (ml)'}
        keyboardType={'numeric'}
      />
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={'Create'} onPress={addInk} color={colourSvc.getColour(undefined, 'primary')}/>
      </View>
    </SafeAreaView>
  );
}
