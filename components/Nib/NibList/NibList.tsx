import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import NibListItem from './NibListItem';
import {useEffect, useState} from 'react';
import {NibStackRouteType} from '../NibNavigator';
import {realmInstance} from '../../../db/Realm';
import {NibModel} from '../../../db/models/NibModel';
import {useNavigation} from '@react-navigation/native';

export default function NibList() {
  const navigation = useNavigation<NibStackRouteType['NibList']['navigation']>();

  const [nibs, setNibs] = useState<Realm.Results<NibModel> | []>([]);

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const nibResults: Realm.Results<NibModel> = realmInstance.objects('Nib');
    if (nibResults?.length) {
      setNibs(nibResults);
    }

    nibResults.addListener(() => {
      setNibs(realmInstance.objects('Nib'));
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
    <FloatingActionButton onPress={() => navigation.navigate('NibCreate')}/>
  </View>);
}
