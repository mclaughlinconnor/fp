import PenList from '../components/Pen/PenList/PenList';
import {useRealm} from '../hooks/useRealm';
import {useCallback} from 'react';
import {Pens} from '../constants/DummyData';
import {PenModel} from '../db/models/PenModel';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {NibModel} from '../db/models/NibModel';

export default function TabOneScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

  const {realmRef} = useRealm();

  const resetDatabase = useCallback(
    (): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.deleteAll();
      });
    },
    [realmRef]
  );

  const populateDummyData = useCallback(
    (): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        Pens.forEach(pen => {
          let nibs: NibModel[] = pen.nibs!.map(nib => {
            return realm?.objectForPrimaryKey('NibModel', nib._id) as NibModel
          });

          if (!nibs || !nibs.length) {
            nibs = pen.nibs!.map((nib)  => {
              return realm?.create('NibModel', NibModel.generate(nib));
            })
          }

          const createdPen: PenModel = realm?.create('PenModel', PenModel.generate(pen));
          nibs.forEach(nib => nib.pens.push(createdPen));
        })
      });
    },
    [realmRef]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title={'Reset Database'} onPress={resetDatabase}/>
      <Button title={'Populate Dummy Data'} onPress={populateDummyData}/>
      <PenList/>
    </SafeAreaView>
  );
}
