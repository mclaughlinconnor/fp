import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../Themed';
import PenListItem from './PenListItem';
import { Pen } from '../Pen';
import PenService from '../PenService';

export default function PenList() {

  const penSvc = new PenService({});

  function getPens(): Pen[] {
    return penSvc.allPens();
  }

  function renderItem ({ item }: { item: Pen }) {
    return <PenListItem pen={item} />;
  }

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={getPens()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%'
  },
});
