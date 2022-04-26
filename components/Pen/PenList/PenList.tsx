import PenFilter from './PenFilter';
import PenListItem from './PenListItem';
import {AbstractList} from '../../Abstract/AbstractList';
import {PenModel} from '../../../db/models/PenModel';
import {PenStackRouteType} from '../PenNavigator';
import {useFiltered} from '../../useFiltered';
import {useNavigation} from '@react-navigation/native';

export default function PenList() {
  const navigation = useNavigation<PenStackRouteType['PenList']['navigation']>();

  const [pens, setFilter] = useFiltered(PenModel, 'Pen');

  function renderItem({item}: {item: PenModel}) {
    return <PenListItem pen={item}/>;
  }

  return (
    <AbstractList
      setFilter={setFilter}
      createAction={() => navigation.navigate('PenCreate', {})}
      data={pens}
      FilterComponent={PenFilter}
      listItemRender={renderItem}
      noDataText={'No pen results found...'}
    />
  );
}
