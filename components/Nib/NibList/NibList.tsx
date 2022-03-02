import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import NibListItem from './NibListItem';
import {useEffect, useState} from 'react';
import {Props} from '../NibNavigator';
import {realmInstance} from '../../../db/Realm';
import {NibModel} from '../../../db/models/NibModel';

export default function NibList({navigation}: Props) {
  const [nibs, setNibs] = useState<Realm.Results<NibModel> | []>([]);

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const nibResults: Realm.Results<NibModel> = realmInstance.objects('NibModel');
    if (nibResults?.length) {
      setNibs(nibResults);
    }

    nibResults.addListener(() => {
      setNibs(realmInstance.objects('NibModel'));
    });

    return () => {
      nibResults?.removeAllListeners();

      setNibs([]);
    };
  }, [realmInstance]);

  const styles = StyleSheet.create({
    view: {
      width: '100%',
      flex: 1
    },
    container: {
      paddingVertical: 5,
    },
  });

  function renderItem({item}: {item: NibModel}) {
    return <NibListItem nib={item}/>;
  }

  return (<View style={styles.view}>
    <FlatList
      contentContainerStyle={styles.container}
      data={nibs}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
    <FloatingActionButton onPress={() => navigation.navigate('Nib', {screen: 'NibCreate'})}/>
  </View>);
}
