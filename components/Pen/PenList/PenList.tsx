import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import PenListItem from './PenListItem';
import {useEffect, useState} from 'react';
import {PenModel} from '../../../db/models/PenModel';
import {realmInstance} from '../../../db/Realm';
import {PenStackRouteType} from '../PenNavigator';
import {useNavigation} from '@react-navigation/native';

export default function PenList() {
  const navigation = useNavigation<PenStackRouteType['PenList']['navigation']>();

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
    <FloatingActionButton onPress={() => navigation.navigate('PenCreate')}/>
  </View>);
}
