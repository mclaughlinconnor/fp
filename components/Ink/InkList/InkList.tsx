import InkFilter from './InkFilter';
import InkListItem from './InkListItem';
import {AbstractList} from '../../Abstract/AbstractList';
import {InkModel} from '../../../db/models/InkModel';
import {InkStackRouteType} from '../InkNavigator';
import {useFiltered} from '../../useFiltered';
import {useNavigation} from '@react-navigation/native';

export default function InkList() {
  const navigation = useNavigation<InkStackRouteType['InkList']['navigation']>();

  const [inks, setFilter] = useFiltered(InkModel, 'Ink');

  function renderItem({item}: {item: InkModel}) {
    return <InkListItem ink={item}/>;
  }

  const createAction = () => navigation.navigate('InkCreate', {});

  return (
    <AbstractList
      data={inks}
      setFilter={setFilter}
      listItemRender={renderItem}
      noDataText={'No ink results found'}
      createAction={createAction}
      FilterComponent={InkFilter}
    />
  );
}
