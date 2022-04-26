import AbstractViewScreen from '../Abstract/AbstractViewScreen';
import {InkModel} from '../../db/models/InkModel';
import {InkStackRouteType} from './InkNavigator';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function InkViewScreen() {
  const [ink, setInk] = useState<InkModel>()

  const navigation = useNavigation<InkStackRouteType['InkView']['navigation']>();
  const route = useRoute<InkStackRouteType['InkView']['route']>();
  const {inkId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(inkId);
    const ink = realmInstance.objectForPrimaryKey('Ink', uuid) as InkModel;

    return ink.addListener(() => {
      setInk(realmInstance.objectForPrimaryKey('Ink', uuid));
    });
  }, [realmInstance, inkId])

  if (!ink) {
    return null;
  }

  const goToInkEdit = () => {
    return navigation.navigate('InkCreate', {inkId: ink._id.toHexString()})
  }

  return (
    <AbstractViewScreen goToEdit={goToInkEdit} data={ink} dataType={'ink'}/>
  )
}
