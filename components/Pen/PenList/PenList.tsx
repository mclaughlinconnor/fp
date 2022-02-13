import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import PenListItem from './PenListItem';
import {useCallback, useEffect, useState} from 'react';
import {useRealm} from '../../../hooks/useRealm';
import {PenModel} from '../../../db/models/PenModel';

export default function PenList() {
  const [pens, setPens] = useState<Realm.Results<PenModel> | []>([]);

  const {realmRef, isReady} = useRealm();

  useEffect(() => {
    if (!realmRef.current || !isReady) {
      return;
    }

    const realm = realmRef.current;

    const penResults: Realm.Results<PenModel> = realm.objects('PenModel');
    if (penResults?.length) {
      setPens(penResults);
    }

    penResults.addListener(() => {
      setPens(realm.objects('PenModel'));
    });

    return () => {
      penResults?.removeAllListeners();

      setPens([]);
    };
  }, [isReady, realmRef]);

  const handleAddPen = useCallback(
    (pen: PenModel): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.create('PenModel', PenModel.generate(pen));
      });
    },
    [realmRef]
  );

  const handleDeletePen = useCallback(
    (pen: PenModel): void => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.delete(pen);
      });
    },
    [realmRef]
  );

  const styles = StyleSheet.create({
    view: {
      width: '100%',
      flex: 1
    },
    container: {
      paddingVertical: 5,
    },
  });

  function renderItem({item}: {item: PenModel}) {
    return <PenListItem pen={item}/>;
  }

  return (<View style={styles.view}>
    <FlatList
      contentContainerStyle={styles.container}
      data={pens}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
  </View>);
}
