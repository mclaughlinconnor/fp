import AbstractCreateScreen, {
  createSpec,
  isIdPropertyChanged,
  isPropertyChanged,
} from '../Abstract/AbstractCreateScreen';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {InkModel} from '../../db/models/InkModel';
import {NibModel} from '../../db/models/NibModel';
import {PenModel} from '../../db/models/PenModel';
import {PenStackRouteType} from './PenNavigator';
import {PenUpdateModel, UpdateTypes} from '../../db/models/PenUpdateModel';
import {ToastAndroid} from 'react-native';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PenCreateScreen({}) {
  const navigation = useNavigation<PenStackRouteType['PenCreate']['navigation']>();
  const route = useRoute<PenStackRouteType['PenCreate']['route']>();
  const {penId} = route.params;

  const [name, onChangeName] = useState('');
  const [manufacturer, onChangeManufacturer] = useState('');
  const [colour, onChangeColour] = useState('');
  const [selectedNib, onChangeSelectedNib] = useState<NibModel | null>(null);
  const [selectedInk, onChangeSelectedInk] = useState<InkModel | undefined>(undefined);
  const [dbNibs, onChangeDbNibs] = useState<Realm.Results<NibModel> | []>([]);
  const [dbInks, onChangeDbInks] = useState<Realm.Results<InkModel> | []>([]);
  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();
  const [penToBeUpdated, onChangePenToBeUpdated] = useState<PenModel>();

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

  const updatePen = async (): Promise<void> => {
    if (!penToBeUpdated || !penId) {
      return
    }

    if (!colour || !name || !selectedNib || (!photo && !penToBeUpdated.image) || !manufacturer) {
      return;
    }

    ToastAndroid.show('Updating pen...', ToastAndroid.SHORT);

    let image = penToBeUpdated.image;
    if (photo) {
      image = await FileModel.uploadGenerate({}, photo.uri, 'images', 'pens')
      await FileModel.delete(penToBeUpdated.image, 'images', 'pens');
    }

    realmInstance.write(() => {
      const update = PenUpdateModel.generate({
        updateType: UpdateTypes.UPDATE,
        pen: penToBeUpdated,
        date: new Date(),
        colour: isPropertyChanged(penToBeUpdated.colour, colour),
        image: isPropertyChanged(penToBeUpdated.image, image),
        manufacturer: isPropertyChanged(penToBeUpdated.manufacturer, manufacturer),
        name: isPropertyChanged(penToBeUpdated.name, name),
        ink: isIdPropertyChanged(penToBeUpdated.ink, selectedInk),
        nib: isIdPropertyChanged(penToBeUpdated.nib, selectedNib),
      })

      penToBeUpdated.colour = colour;
      penToBeUpdated.image = image;
      penToBeUpdated.ink = selectedInk || undefined;
      penToBeUpdated.manufacturer = manufacturer;
      penToBeUpdated.name = name;
      penToBeUpdated.nib = selectedNib;

      realmInstance.create('PenUpdate', update);

      navigation.navigate('PenView', {penId});
    })
  }

  const addPen = async (): Promise<void> => {
    if (!colour || !name || !selectedNib || !photo || !manufacturer) {
      return;
    }

    ToastAndroid.show('Creating pen...', ToastAndroid.SHORT);

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
      const createdPen = realmInstance?.create('Pen', pen) as PenModel;

      const update = PenUpdateModel.generate({
        updateType: UpdateTypes.ADD,
        ink: selectedInk || undefined,
        nib: selectedNib,
        pen: createdPen,
        date: new Date(),
      })

      realmInstance.create('PenUpdate', update);

      navigation.navigate('PenList');
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
    };
  }, [realmInstance.isClosed, realmInstance]);

  const generateNibItems = (nib: NibModel): {value: NibModel, label: string} => {
    return {value: nib, label: `${nib.manufacturer} ${nib.size}`}
  }

  const generateInkItems = (ink: InkModel): {value: InkModel, label: string} => {
    return {value: ink, label: `${ink.manufacturer} ${ink.name} (${ink.volume}ml)`}
  }

  const createSpec: createSpec[] = [
    {controlType: 'text', prop: 'manufacturer', value: manufacturer, setValue: onChangeManufacturer, label: 'Pen manufacturer'},
    {controlType: 'text', prop: 'name', value: name, setValue: onChangeName, label: 'Pen name'},
    {controlType: 'text', prop: 'colour', value: colour, setValue: onChangeColour, label: 'Pen colour'},
    {controlType: 'dropdown', prop: 'nib', value: selectedNib, setValue: onChangeSelectedNib, itemGenerator: generateNibItems, label: 'Select nib...', data: dbNibs},
    {controlType: 'dropdown', prop: 'ink', value: selectedInk, setValue: onChangeSelectedInk, itemGenerator: generateInkItems, label: 'Select ink...', data: dbInks},
    {controlType: 'camera', prop: 'photo', setValue: onChangePhoto},
  ]

  console.log(selectedNib);

  return (
    <AbstractCreateScreen
      createSpec={createSpec}
      create={addPen}
      update={updatePen}
      {...(penToBeUpdated ? {toBeUpdated: penToBeUpdated} : undefined)}
    />
  )
}
