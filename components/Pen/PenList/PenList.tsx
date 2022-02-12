import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../Styling/Themed';
import PenListItem from './PenListItem';
import { Pen } from '../Pen';
import PenService from '../PenService';

export default function PenList() {
  const styles = StyleSheet.create({
    item: {
      width: '100%'
    },
    container: {
      // marginVertical: 0,
      paddingVertical: 5
    }
  });

  const penSvc = new PenService({});

  function getPens(): Pen[] {
    return penSvc.allPens();
  }

  function renderItem ({ item }: { item: Pen }) {
    return <PenListItem pen={item} />;
  }

  return (
    <View>
      <View style={styles.item}>
        <FlatList
          contentContainerStyle={styles.container}
          data={getPens()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}
