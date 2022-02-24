import {useEffect, useState} from 'react';
import {PenModel} from '../../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../../db/models/NibModel';
import {View} from '../Styling/Themed';
import {NibSelect} from '../Nib/NibSelect';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';

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
  const [selectedNib, onChangeSelectedNib] = useState<NibModel | null>(null);
  const [dbNibs, onChangeDbNibs] = useState<Realm.Results<NibModel> | []>([]);
  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const addPen = (): void => {
    if (!colour || !name || !selectedNib) {
      return;
    }

    const pen = {
      colour,
      name,
      nibs: [selectedNib],
      icon: 'fountain-pen-tip'
    } as Partial<PenModel>;

    const realm = realmInstance;
    realm?.write(() => {
      const createdPen = realm?.create('PenModel', PenModel.generate(pen)) as PenModel;
      let nibs = pen.nibs?.map(nib => {
        if (nib._id) {
          return realm.objectForPrimaryKey('NibModel', nib._id) as NibModel;
        } else {
          return realm?.create('NibModel', NibModel.generate(nib)) as NibModel;
        }
      })

      nibs?.forEach(nib => nib.pens.push(createdPen));
    });
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const realm = realmInstance;

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
        <NibSelect label={'Select nib...'} data={dbNibs.map(generateNibItems)} onSelect={onChangeSelectedNib}/>
      </View>
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={'Create'} onPress={addPen} color={colourSvc.getColour(undefined, 'primary')}/>
      </View>
    </SafeAreaView>
  );
}
