import PenList from './PenList/PenList';
import {useCallback} from 'react';
import {Pens} from '../../constants/DummyData';
import {PenModel} from '../../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../../db/models/NibModel';
import {Props} from './PenNavigator';
import {ColourService} from '../../styles/ColourService';
import {realmInstance} from '../../db/Realm';
import {FileModel} from '../../db/models/FileModel';

export default function PenScreen({route, navigation}: Props) {
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
          let nibs: NibModel[] = pen.nibs!.reduce((acc, nib) => {
            const queriedNib = realm?.objectForPrimaryKey('NibModel', nib._id) as NibModel;

            if (queriedNib) {
              acc.push(queriedNib);
            }

            return acc;
          }, [] as NibModel[]);

          let image: FileModel;
          if (pen.image) {
            image = realm?.objectForPrimaryKey('FileModel', pen.image._id) as FileModel;

            if (!image) {
              image = realm?.create('FileModel', FileModel.generate(pen.image)) as FileModel
            }

            pen.image = image;
          }


          if (!nibs || !nibs.length) {
            nibs = pen.nibs!.map((nib)  => {
              let nibImage: FileModel;
              if (nib.image) {
                nibImage = realm?.objectForPrimaryKey('FileModel', nib.image._id) as FileModel;

                if (!image) {
                  image = realm?.create('FileModel', FileModel.generate(nib.image)) as FileModel
                }

                nib.image = nibImage;
              }
              return realm?.create('NibModel', NibModel.generate(nib));
            })
          }

          const createdPen: PenModel = realm?.create('PenModel', PenModel.generate(pen));
          nibs.forEach(nib => nib.pens.push(createdPen));
        })
      });
    },
    [realmInstance]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title={'Reset Database'} onPress={resetDatabase} color={colourSvc.getColour(undefined, 'primary')}/>
      <Button title={'Populate Dummy Data'} onPress={populateDummyData} color={colourSvc.getColour(undefined, 'primary')}/>
      <PenList navigation={navigation} route={route}/>
    </SafeAreaView>
  );
}
