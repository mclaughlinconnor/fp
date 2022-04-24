import {FlatList, StyleSheet} from 'react-native';
import {Text, View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import PenListItem from './PenListItem';
import {useEffect, useState} from 'react';
import {PenModel} from '../../../db/models/PenModel';
import {realmInstance} from '../../../db/Realm';
import {PenStackRouteType} from '../PenNavigator';
import {useNavigation} from '@react-navigation/native';
import PenFilter from './PenFilter';

export default function PenList() {
  const navigation = useNavigation<PenStackRouteType['PenList']['navigation']>();

  const [pens, setPens] = useState<Realm.Results<PenModel> | []>([]);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>();

  const getPens = (): Realm.Results<PenModel> => {
    if (filter) {
      return realmInstance.objects('Pen')
        .filtered(filter) as Realm.Results<PenModel>;
    }

    return realmInstance.objects('Pen');
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const penResults = getPens();

    if (penResults?.length) {
      setPens(penResults);
    }

    penResults.addListener(() => {
      setPens(getPens());
    });

    return () => {
      penResults?.removeAllListeners();

      setPens([]);
    };
  }, [realmInstance, filter]);

  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    emptyText: {
      fontSize: 18,
    },
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

  const empty = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No pen results found...</Text>
    </View>
  )

  const penList = (
    <FlatList
      contentContainerStyle={styles.container}
      data={pens}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
  );

  return (
    <View style={styles.view}>
      {pens.length ? penList : empty}
      <FloatingActionButton onPress={() => navigation.navigate('PenCreate', {})}/>
      <FloatingActionButton icon={'filter'} index={1} onPress={() => setFilterVisible(!filterVisible)}/>
      <PenFilter visible={filterVisible} setVisible={setFilterVisible} setFilter={setFilter}/>
    </View>
  );
}
