import AbstractCreateScreen, {createSpec} from '../Abstract/AbstractCreateScreen';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {InkModel} from '../../db/models/InkModel';
import {InkStackRouteType} from './InkNavigator';
import {ToastAndroid} from 'react-native';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PenCreateScreen({}) {
  const navigation = useNavigation<InkStackRouteType['InkCreate']['navigation']>();
  const route = useRoute<InkStackRouteType['InkCreate']['route']>();
  const {inkId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(inkId);
    const ink = realmInstance?.objectForPrimaryKey('Ink', uuid) as InkModel;
    if (!ink) {
      return;
    }

    onChangeInkToBeUpdated(ink);

    onChangeName(ink.name)
    onChangeManufacturer(ink.manufacturer)
    onChangeColour(ink.colour)
    onChangeVolume(ink.volume.toString())
  }, [realmInstance, inkId])

  const [name, onChangeName] = useState('');
  const [colour, onChangeColour] = useState('');
  const [manufacturer, onChangeManufacturer] = useState('');
  const [volume, onChangeVolume] = useState<string>('');

  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const [inkToBeUpdated, onChangeInkToBeUpdated] = useState<InkModel>();

  const updateInk = async (): Promise<void> => {
    if (!inkToBeUpdated || !inkId) {
      return
    }

    if (!colour || !manufacturer || !volume || !name || (!photo && !inkToBeUpdated.image)) {
      return;
    }

    let intVolume: number;
    try {
      intVolume = parseInt(volume.toString())
    } catch {
      return;
    }

    ToastAndroid.show('Updating ink...', ToastAndroid.SHORT);

    let image = inkToBeUpdated.image;
    if (photo) {
      image = await FileModel.uploadGenerate({}, photo.uri, 'images', 'inks')
      await FileModel.delete(inkToBeUpdated.image, 'images', 'inks');
    }

    realmInstance.write(() => {
      inkToBeUpdated.colour = colour;
      inkToBeUpdated.image = image;
      inkToBeUpdated.manufacturer = manufacturer;
      inkToBeUpdated.name = name;
      inkToBeUpdated.volume = intVolume;
    })

    navigation.navigate('InkView', {inkId});
  }

  const addInk = async (): Promise<void> => {
    let intVolume
    try {
      intVolume = parseInt(volume.toString());
    } catch {
      return;
    }

    if (!name || !colour || !manufacturer || !intVolume || !photo) {
      return;
    }

    ToastAndroid.show('Creating ink...', ToastAndroid.SHORT);

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
      realm?.create('Ink', InkModel.generate(ink));
    });

    navigation.navigate('InkList');
  }

  const createSpec: createSpec[] = [
    {controlType: 'text', value: name, setValue: onChangeName, label: 'Ink name', prop: 'name'},
    {controlType: 'text', value: manufacturer, setValue: onChangeManufacturer, label: 'Ink manufacturer', prop: 'manufacturer'},
    {controlType: 'text', value: colour, setValue: onChangeColour, label: 'Ink colour', prop: 'colour'},
    {controlType: 'text', value: volume, setValue: onChangeVolume, label: 'Ink volume (ml)', prop: 'volume', keyboardType: 'numeric'},
    {controlType: 'camera', prop: 'photo', setValue: onChangePhoto},
  ]

  return (
    <AbstractCreateScreen
      createSpec={createSpec}
      create={addInk}
      update={updateInk}
      {...(inkToBeUpdated ? {toBeUpdated: inkToBeUpdated} : undefined)}
    />
  );
}
