import {FlatList, StyleSheet} from 'react-native';
import {View} from '../../Styling/Themed';
import {FloatingActionButton} from '../../Styling/FloatingActionButton';
import InkListItem from './InkListItem';
import {useEffect, useState} from 'react';
import {Props} from '../InkNavigator';
import {realmInstance} from '../../../db/Realm';
import {InkModel} from '../../../db/models/InkModel';

export default function InkList({navigation}: Props) {
  const [inks, setInks] = useState<Realm.Results<InkModel> | []>([]);

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const inkResults: Realm.Results<InkModel> = realmInstance.objects('InkModel');
    if (inkResults?.length) {
      setInks(inkResults);
    }

    inkResults.addListener(() => {
      setInks(realmInstance.objects('InkModel'));
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
    <FloatingActionButton onPress={() => navigation.navigate('Ink', {screen: 'InkCreate'})}/>
  </View>);
}
