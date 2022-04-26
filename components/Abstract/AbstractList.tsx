import {ElementType, ReactElement, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FloatingActionButton} from '../Styling/FloatingActionButton';
import {Text, View} from '../Styling/Themed';

type Props = {
  data: Realm.Results<any> | [];
  setFilter: (value: string) => void;
  listItemRender: (item: any) => ReactElement;
  noDataText: string;
  createAction: () => void;
  FilterComponent: ElementType;
}

export function AbstractList({data, setFilter, listItemRender, noDataText, createAction, FilterComponent}: Props) {
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

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

  const empty = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{noDataText}</Text>
    </View>
  )

  const dataList = (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={listItemRender}
      keyExtractor={item => item._id.toString()}
    />
  );

  return (
    <View style={styles.view}>
      {data.length ? dataList : empty}
      <FloatingActionButton onPress={createAction}/>
      <FloatingActionButton icon={'filter'} index={1} onPress={() => setFilterVisible(!filterVisible)}/>
      <FilterComponent visible={filterVisible} setVisible={setFilterVisible} setFilter={setFilter}/>
    </View>
  );
}