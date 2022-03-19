import {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';
import {NibModel, NibSize, NibSizes} from '../../db/models/NibModel';
import {View} from '../Styling/Themed';
import {DropdownSelect} from '../Styling/DropdownSelect';
import {ColourService} from '../../styles/ColourService';
import {TextInput} from '../Styling/TextInput';
import {realmInstance} from '../../db/Realm';
import CameraInput from '../Styling/Camera/CameraInput';
import {CameraCapturedPicture} from 'expo-camera';
import {FileModel} from '../../db/models/FileModel';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NibStackRouteType} from './NibNavigator';

export default function NibCreateScreen({}) {
  const colourSvc = new ColourService({});
  const navigation = useNavigation<NibStackRouteType['NibCreate']['navigation']>();
  const route = useRoute<NibStackRouteType['NibCreate']['route']>();
  const {nibId} = route.params;

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
  const [confirmDisabled, onChangeConfirmDisabled] = useState<boolean>(false);

  const generateNibSizeItems = (size: NibSize): {value: NibSize, label: string} => {
    return {value: size, label: size.toString()}
  }

  const updateNib = async (): Promise<void> => {
    if (!nibToBeUpdated) {
      return
    }

    if (!colour || !manufacturer || !nibSize || (!photo && !nibToBeUpdated.image)) {
      return;
    }

    ToastAndroid.show('Updating nib...', ToastAndroid.SHORT);

    const image = photo ? await FileModel.uploadGenerate({}, photo.uri, 'images', 'nibs') : nibToBeUpdated.image

    realmInstance.write(() => {
      nibToBeUpdated.colour = colour;
      nibToBeUpdated.image = image;
      nibToBeUpdated.manufacturer = manufacturer;
      nibToBeUpdated.size = nibSize;
    })
  }

  const addNib = async (): Promise<void> => {
    if (!colour || !manufacturer || !nibSize || !photo) {
      return;
    }

    ToastAndroid.show('Creating pen...', ToastAndroid.SHORT);

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
  }

  const confirmOp = async () => {
    onChangeConfirmDisabled(true)

    if (nibId) {
      await updateNib();
      navigation.navigate('NibView', {nibId});
    } else {
      await addNib();
      navigation.navigate('NibList');
    }

    ToastAndroid.show('Done', ToastAndroid.SHORT);
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
        <DropdownSelect
          label={'Select nib size...'}
          data={NibSizes.map(generateNibSizeItems)}
          onSelect={onChangeNibSize}
          defaultSelected={
            nibSize ? generateNibSizeItems(nibSize) : undefined
          }
        />
      </View>
      <CameraInput onPhotoSave={onChangePhoto}/>
      <View style={styles.create}>
        <Button title={nibId ? 'Update' : 'Create'} onPress={confirmOp} color={colourSvc.getColour(undefined, 'primary')} disabled={confirmDisabled}/>
      </View>
    </SafeAreaView>
  );
}
