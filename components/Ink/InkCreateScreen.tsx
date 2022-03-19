import {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';
import {View} from '../Styling/Themed';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {InkModel} from '../../db/models/InkModel';
import {InkStackRouteType} from './InkNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PenCreateScreen({}) {
  const colourSvc = new ColourService({});
  const navigation = useNavigation<InkStackRouteType['InkCreate']['navigation']>();
  const route = useRoute<InkStackRouteType['InkCreate']['route']>();
  const {inkId} = route.params;

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
    const uuid = new Realm.BSON.UUID(inkId);
    const ink = realmInstance?.objectForPrimaryKey('Ink', uuid) as InkModel;
    if (!ink) {
      return;
    }

    onChangeInkToBeUpdated(ink);

    onChangeName(ink.name)
    onChangeManufacturer(ink.manufacturer)
    onChangeColour(ink.colour)
    onChangeVolume(ink.volume)
  }, [realmInstance, inkId])

  const [name, onChangeName] = useState('');
  const [colour, onChangeColour] = useState('');
  const [manufacturer, onChangeManufacturer] = useState('');
  const [volume, onChangeVolume] = useState<string | number>('');

  const [photo, onChangePhoto] = useState<CameraCapturedPicture>();

  const [inkToBeUpdated, onChangeInkToBeUpdated] = useState<InkModel>();
  const [confirmDisabled, onChangeConfirmDisabled] = useState<boolean>(false);

  const updateInk = async (): Promise<void> => {
    if (!inkToBeUpdated) {
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
  }

  const confirmOp = async () => {
    onChangeConfirmDisabled(true)

    if (inkId) {
      await updateInk();
      navigation.navigate('InkView', {inkId});
    } else {
      await addInk();
      navigation.navigate('InkList');
    }

    ToastAndroid.show('Done', ToastAndroid.SHORT);
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
        value={volume.toString()}
        placeholder={'Ink volume (ml)'}
        keyboardType={'numeric'}
      />
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={inkId ? 'Update' : 'Create'} onPress={confirmOp} color={colourSvc.getColour(undefined, 'primary')} disabled={confirmDisabled}/>
      </View>
    </SafeAreaView>
  );
}
