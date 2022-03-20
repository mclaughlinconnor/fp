import PenList from './PenList/PenList';
import {useCallback} from 'react';
import {Pens} from '../../constants/DummyData';
import {PenModel} from '../../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../../db/models/NibModel';
import {ColourService} from '../../styles/ColourService';
import {realmInstance} from '../../db/Realm';
import {FileModel} from '../../db/models/FileModel';
import {InkModel} from '../../db/models/InkModel';

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
            image = realm?.objectForPrimaryKey('File', pen.image._id) as FileModel;

            if (!image) {
              image = realm?.create('File', FileModel.generate(pen.image)) as FileModel
            }

            pen.image = image;
          }

          let ink: InkModel;
          if (pen.ink) {
            let inkImage: FileModel;
            if (pen.ink.image) {
              inkImage = realm?.objectForPrimaryKey('File', pen.ink.image._id) as FileModel;

              if (!inkImage) {
                inkImage = realm?.create('File', FileModel.generate(pen.ink.image)) as FileModel
              }

              pen.ink.image = inkImage;
            }

            ink = realm?.objectForPrimaryKey('Ink', pen.ink?._id) as InkModel;
            if (!ink) {
              ink = realm.create('Ink', InkModel.generate(pen.ink));
            }

            pen.ink = ink;
          }

          let nib: NibModel;
          if (pen.nib) {
            let nibImage: FileModel;
            if (pen.nib.image) {
              nibImage = realm?.objectForPrimaryKey('File', pen.nib.image._id) as FileModel;

              if (!nibImage) {
                nibImage = realm?.create('File', FileModel.generate(pen.nib.image)) as FileModel
              }

              pen.nib.image = nibImage;
            }

            nib = realm?.objectForPrimaryKey('Nib', pen.nib?._id) as NibModel;
            if (!nib) {
              nib = realm.create('Nib', NibModel.generate(pen.nib));
            }

            pen.nib = nib;
          }

          realm?.create('Pen', PenModel.generate(pen));
        })
      });
    },
    [realmInstance]
  );

  const debugButtons = (
    <>
      <Button title={'Reset Database'} onPress={resetDatabase} color={colourSvc.getColour(undefined, 'primary')}/>
      <Button title={'Populate Dummy Data'} onPress={populateDummyData} color={colourSvc.getColour(undefined, 'primary')}/>
    </>
  )

  return (
    <SafeAreaView style={styles.container}>
      {__DEV__ ? debugButtons : null}
      <PenList/>
    </SafeAreaView>
  );
}
