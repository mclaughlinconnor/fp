import NibFilter from './NibFilter';
import NibListItem from './NibListItem';
import {AbstractList} from '../../Abstract/AbstractList';
import {NibModel} from '../../../db/models/NibModel';
import {NibStackRouteType} from '../NibNavigator';
import {useFilteredNibs} from '../useFilteredNibs';
import {useNavigation} from '@react-navigation/native';

export default function NibList() {
  const navigation = useNavigation<NibStackRouteType['NibList']['navigation']>();

  const [nibs, setFilter] = useFilteredNibs();

  function renderItem({item}: {item: NibModel}) {
    return <NibListItem nib={item}/>;
  }

  const createAction = () => navigation.navigate('NibCreate', {});

  return (
    <AbstractList
      data={nibs}
      setFilter={setFilter}
      listItemRender={renderItem}
      noDataText={'No nib results found...'}
      createAction={createAction} FilterComponent={NibFilter}
    />
  );
}
