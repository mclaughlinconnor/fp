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
import {InkModel} from '../../db/models/InkModel';
import {useRoute} from '@react-navigation/native';
import {PenStackRouteType} from './PenNavigator';

export default function PenCreateScreen({}) {
  const colourSvc = new ColourService({});
  const route = useRoute<PenStackRouteType['PenCreate']['route']>();
  const {penId} = route.params;

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

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(penId);
    const pen = realmInstance?.objectForPrimaryKey('Pen', uuid) as PenModel;
    if (!pen) {
      return;
    }

    onChangePenToBeUpdated(pen);

    onChangeName(pen.name)
    onChangeManufacturer(pen.manufacturer)
    onChangeColour(pen.colour)
    onChangeSelectedNib(pen.nib)
    onChangeSelectedInk(pen.ink)
  }, [realmInstance, penId])

  const [name, onChangeName] = useState('');
  const [manufacturer, onChangeManufacturer] = useState('');
  const [colour, onChangeColour] = useState('');
  const [selectedNib, onChangeSelectedNib] = useState<NibModel | null>(null);
  const [selectedInk, onChangeSelectedInk] = useState<InkModel | null>(null);
  const [dbNibs, onChangeDbNibs] = useState<Realm.Results<NibModel> | []>([]);
  const [dbInks, onChangeDbInks] = useState<Realm.Results<InkModel> | []>([]);
  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();
  const [penToBeUpdated, onChangePenToBeUpdated] = useState<PenModel>();

  const updatePen = async (): Promise<void> => {
    if (!penToBeUpdated) {
      return
    }

    if (!colour || !name || !selectedNib || !selectedInk || (!photo && !penToBeUpdated.image) || !manufacturer) {
      return;
    }

    penToBeUpdated.colour = colour;
    const image = photo ? await FileModel.uploadGenerate({}, photo.uri, 'images', 'pens') : penToBeUpdated.image

    realmInstance.write(() => {
      penToBeUpdated.colour = colour;
      penToBeUpdated.image = image;
      penToBeUpdated.ink = selectedInk;
      penToBeUpdated.manufacturer = manufacturer;
      penToBeUpdated.name = name;
      penToBeUpdated.nib = selectedNib;
    })
  }

  const addPen = async (): Promise<void> => {
    if (!colour || !name || !selectedNib || !selectedInk || !photo || !manufacturer) {
      return;
    }

    const file = await FileModel.uploadGenerate({}, photo.uri, 'images', 'pens')

    const pen = PenModel.generate({
      colour,
      icon: 'fountain-pen-tip',
      image: file,
      ink: selectedInk,
      manufacturer,
      name,
      nib: selectedNib,
    });

    realmInstance?.write(() => {
      realmInstance?.create('Pen', pen);
    });
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const nibResults: Realm.Results<NibModel> = realmInstance.objects('Nib');
    const inkResults: Realm.Results<InkModel> = realmInstance.objects('Ink');

    if (nibResults?.length) {
      onChangeDbNibs(nibResults);
    }

    if (inkResults?.length) {
      onChangeDbInks(inkResults);
    }

    nibResults.addListener(() => {
      onChangeDbNibs(realmInstance.objects('Nib'));
    });

    inkResults.addListener(() => {
      onChangeDbInks(realmInstance.objects('Ink'));
    });

    return () => {
      nibResults?.removeAllListeners();
      inkResults?.removeAllListeners();

      onChangeDbNibs([]);
      onChangeDbInks([]);
    };
  }, [realmInstance.isClosed, realmInstance]);

  const generateNibItems = (nib: NibModel): {value: NibModel, label: string} => {
    return {value: nib, label: `${nib.manufacturer} ${nib.size}`}
  }

  const generateInkItems = (ink: InkModel): {value: InkModel, label: string} => {
    return {value: ink, label: `${ink.manufacturer} ${ink.name} (${ink.volume}ml)`}
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
        <DropdownSelect label={'Select nib...'} data={dbNibs.map(generateNibItems)} onSelect={onChangeSelectedNib} defaultSelected={selectedNib ? generateNibItems(selectedNib) : undefined}/>
      </View>
      <View style={{marginHorizontal: 16, marginTop: 12}}>
        <DropdownSelect label={'Select ink...'} data={dbInks.map(generateInkItems)} onSelect={onChangeSelectedInk} defaultSelected={selectedInk ? generateInkItems(selectedInk) : undefined}/>
      </View>
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={penId ? 'Update' : 'Create'} onPress={penId ? updatePen : addPen} color={colourSvc.getColour(undefined, 'primary')}/>
      </View>
    </SafeAreaView>
  );
}
