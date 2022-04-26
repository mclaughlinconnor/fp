import NibFilter from './NibFilter';
import NibListItem from './NibListItem';
import {AbstractList} from '../../Abstract/AbstractList';
import {NibModel} from '../../../db/models/NibModel';
import {NibStackRouteType} from '../NibNavigator';
import {useFiltered} from '../../useFiltered';
import {useNavigation} from '@react-navigation/native';

export default function NibList() {
  const navigation = useNavigation<NibStackRouteType['NibList']['navigation']>();

  const [nibs, setFilter] = useFiltered(NibModel, 'Nib');

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
