import AbstractCreateScreen, {createSpec} from '../Abstract/AbstractCreateScreen';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {NibModel, NibSize, NibSizes} from '../../db/models/NibModel';
import {NibStackRouteType} from './NibNavigator';
import {ToastAndroid} from 'react-native';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function NibCreateScreen({}) {
  const navigation = useNavigation<NibStackRouteType['NibCreate']['navigation']>();
  const route = useRoute<NibStackRouteType['NibCreate']['route']>();
  const {nibId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(nibId);
    const nib = realmInstance?.objectForPrimaryKey('Nib', uuid) as NibModel;
    if (!nib) {
      return;
    }

    onChangeNibToBeUpdated(nib);

    onChangeNibSize(nib.size)
    onChangeManufacturer(nib.manufacturer)
    onChangeColour(nib.colour)
  }, [realmInstance, nibId])

  const [nibSize, onChangeNibSize] = useState<NibSize | null>(null);
  const [manufacturer, onChangeManufacturer] = useState('');
  const [colour, onChangeColour] = useState('');

  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const [nibToBeUpdated, onChangeNibToBeUpdated] = useState<NibModel>();

  const generateNibSizeItems = (size: NibSize): {value: NibSize, label: string} => {
    return {value: size, label: size.toString()}
  }

  const updateNib = async (): Promise<void> => {
    if (!nibToBeUpdated || !nibId) {
      return
    }

    if (!colour || !manufacturer || !nibSize || (!photo && !nibToBeUpdated.image)) {
      return;
    }

    ToastAndroid.show('Updating nib...', ToastAndroid.SHORT);

    let image = nibToBeUpdated.image;
    if (photo) {
      image = await FileModel.uploadGenerate({}, photo.uri, 'images', 'nibs')
      await FileModel.delete(nibToBeUpdated.image, 'images', 'nibs');
    }

    realmInstance.write(() => {
      nibToBeUpdated.colour = colour;
      nibToBeUpdated.image = image;
      nibToBeUpdated.manufacturer = manufacturer;
      nibToBeUpdated.size = nibSize;
    })

    navigation.navigate('NibView', {nibId});
  }

  const addNib = async (): Promise<void> => {
    if (!colour || !manufacturer || !nibSize || !photo) {
      return;
    }

    ToastAndroid.show('Creating nib...', ToastAndroid.SHORT);

    const file = await FileModel.uploadGenerate({}, photo.uri, 'images', 'nibs')

    const nib = {
      colour,
      size: nibSize,
      manufacturer,
      image: file,
    } as Partial<NibModel>;

    const realm = realmInstance;
    realm?.write(() => {
      realm?.create('Nib', NibModel.generate(nib));
    });

    navigation.navigate('NibList');
  }

  const createSpec: createSpec[] = [
    {controlType: 'text', value: manufacturer, setValue: onChangeManufacturer, label: 'Nib manufacturer', prop: 'manufacturer'},
    {controlType: 'text', value: colour, setValue: onChangeColour, label: 'Nib colour', prop: 'colour'},
    {controlType: 'dropdown', value: nibSize, setValue: onChangeNibSize, prop: 'size', itemGenerator: generateNibSizeItems, label: 'Select nib size...', data: NibSizes},
    {controlType: 'camera', prop: 'photo', setValue: onChangePhoto},
  ];

  return (
    <AbstractCreateScreen
      createSpec={createSpec}
      create={addNib}
      update={updateNib}
      {...(nibToBeUpdated ? {toBeUpdated: nibToBeUpdated} : undefined)}
    />
  );
}
