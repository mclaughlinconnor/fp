import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import PenListItem from './PenListItem';
import {useCallback, useEffect, useState} from 'react';
import {PenModel} from '../../../db/models/PenModel';
import {Props} from '../PenNavigator';
import {realmInstance} from '../../../db/Realm';

export default function PenList({route, navigation}: Props) {
  const [pens, setPens] = useState<Realm.Results<PenModel> | []>([]);

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const penResults: Realm.Results<PenModel> = realmInstance.objects('PenModel');
    if (penResults?.length) {
      setPens(penResults);
    }

    penResults.addListener(() => {
      setPens(realmInstance.objects('PenModel'));
    });

    return () => {
      penResults?.removeAllListeners();

      setPens([]);
    };
  }, [realmInstance]);

  const handleAddPen = useCallback(
    (pen: PenModel): void => {
      realmInstance?.write(() => {
        realmInstance?.create('PenModel', PenModel.generate(pen));
      });
    },
    [realmInstance]
  );

  const handleDeletePen = useCallback(
    (pen: PenModel): void => {
      const realm = realmInstance;
      realm?.write(() => {
        realm?.delete(pen);
      });
    },
    [realmInstance]
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
