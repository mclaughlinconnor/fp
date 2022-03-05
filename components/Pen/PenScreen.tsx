import PenList from './PenList/PenList';
import {useCallback} from 'react';
import {Pens} from '../../constants/DummyData';
import {PenModel} from '../../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../../db/models/NibModel';
import {ColourService} from '../../styles/ColourService';
import {realmInstance} from '../../db/Realm';
import {FileModel} from '../../db/models/FileModel';

export default function PenScreen() {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...colourSvc.getColourStyle()
    }
  });

  const resetDatabase = useCallback(
    (): void => {
      const realm = realmInstance;
      realm?.write(() => {
        realm?.deleteAll();
      });
    },
    [realmInstance]
  );

  const populateDummyData = useCallback(
    (): void => {
      const realm = realmInstance;
      realm?.write(() => {
        Pens.forEach(pen => {
          let image: FileModel;
          if (pen.image) {
            image = realm?.objectForPrimaryKey('FileModel', pen.image._id) as FileModel;

            if (!image) {
              image = realm?.create('FileModel', FileModel.generate(pen.image)) as FileModel
            }

            pen.image = image;
          }

          let nib: NibModel;
          if (pen.nib) {
            let nibImage: FileModel;
            if (pen.nib.image) {
              nibImage = realm?.objectForPrimaryKey('FileModel', pen.nib.image._id) as FileModel;

              if (!nibImage) {
                nibImage = realm?.create('FileModel', FileModel.generate(pen.nib.image)) as FileModel
              }

              pen.nib.image = nibImage;
            }

            nib = realm?.objectForPrimaryKey('NibModel', pen.nib?._id) as NibModel;
            if (!nib) {
              nib = realm.create('NibModel', NibModel.generate(pen.nib));
            }
            pen.nib = nib;

          }

          realm?.create('PenModel', PenModel.generate(pen));
        })
      });
    },
    [realmInstance]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title={'Reset Database'} onPress={resetDatabase} color={colourSvc.getColour(undefined, 'primary')}/>
      <Button title={'Populate Dummy Data'} onPress={populateDummyData} color={colourSvc.getColour(undefined, 'primary')}/>
      <PenList/>
    </SafeAreaView>
  );
}
