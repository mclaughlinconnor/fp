import {useEffect, useState} from 'react';
import {PenModel} from '../../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../../db/models/NibModel';
import {View} from '../Styling/Themed';
import {DropdownSelect} from '../Styling/DropdownSelect';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';

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
  const [manufacturer, onChangeManufacturer] = useState('');
  const [colour, onChangeColour] = useState('');
  const [selectedNib, onChangeSelectedNib] = useState<NibModel | null>(null);
  const [dbNibs, onChangeDbNibs] = useState<Realm.Results<NibModel> | []>([]);
  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const addPen = async (): Promise<void> => {
    if (!colour || !name || !selectedNib || !photo || !manufacturer) {
      return;
    }

    const file = await FileModel.uploadGenerate({}, photo.uri, 'images', 'pens')

    const pen = PenModel.generate({
      colour,
      icon: 'fountain-pen-tip',
      image: file,
      manufacturer,
      name,
      nib: selectedNib,
    });

    realmInstance?.write(() => {
      realmInstance?.create('PenModel', pen);
    });
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const nibResults: Realm.Results<NibModel> = realmInstance.objects('NibModel');

    const nibResults: Realm.Results<NibModel> = realm.objects('NibModel');
    if (nibResults?.length) {
      onChangeDbNibs(nibResults);
    }

    nibResults.addListener(() => {
      onChangeDbNibs(realm.objects('NibModel'));
    });

    return () => {
      nibResults?.removeAllListeners();

      onChangeDbNibs([]);
    };
  }, [realmInstance.isClosed, realmInstance]);

  const generateNibItems = (nib: NibModel): {value: NibModel, label: string} => {
    return {value: nib, label: `${nib.manufacturer} ${nib.size}`}
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={onChangeManufacturer}
        value={manufacturer}
        placeholder={'Pen manufacturer'}
      />
      <TextInput
        onChangeText={onChangeName}
        value={name}
        placeholder={'Pen name'}
      />
      <TextInput
        onChangeText={onChangeColour}
        value={colour}
        placeholder={'Pen colour'}
      />
      <View style={{marginHorizontal: 16, marginTop: 12}}>
        <DropdownSelect label={'Select nib...'} data={dbNibs.map(generateNibItems)} onSelect={onChangeSelectedNib}/>
      </View>
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={'Create'} onPress={addPen} color={colourSvc.getColour(undefined, 'primary')}/>
      </View>
    </SafeAreaView>
  );
}
