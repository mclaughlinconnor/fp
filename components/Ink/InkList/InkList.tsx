import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import InkListItem from './InkListItem';
import {useEffect, useState} from 'react';
import {InkStackRouteType} from '../InkNavigator';
import {realmInstance} from '../../../db/Realm';
import {InkModel} from '../../../db/models/InkModel';
import {useNavigation} from '@react-navigation/native';

export default function InkList() {
  const navigation = useNavigation<InkStackRouteType['InkList']['navigation']>();

  const [inks, setInks] = useState<Realm.Results<InkModel> | []>([]);

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const inkResults: Realm.Results<InkModel> = realmInstance.objects('Ink');
    if (inkResults?.length) {
      setInks(inkResults);
    }

    inkResults.addListener(() => {
      setInks(realmInstance.objects('Ink'));
    });

    return () => {
      inkResults?.removeAllListeners();

      setInks([]);
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

  function renderItem({item}: {item: InkModel}) {
    return <InkListItem ink={item}/>;
  }

  return (<View style={styles.view}>
    <FlatList
      contentContainerStyle={styles.container}
      data={inks}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
    <FloatingActionButton onPress={() => navigation.navigate('InkCreate', {})}/>
  </View>);
}
