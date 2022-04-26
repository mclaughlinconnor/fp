import AbstractViewScreen from '../Abstract/AbstractViewScreen';
import {PenModel} from '../../db/models/PenModel';
import {PenStackRouteType} from './PenNavigator';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PenViewScreen() {
  const [pen, setPen] = useState<PenModel>()

  const navigation = useNavigation<PenStackRouteType['PenView']['navigation']>();
  const route = useRoute<PenStackRouteType['PenView']['route']>();
  const {penId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(penId);
    const pen = realmInstance.objectForPrimaryKey('Pen', uuid) as PenModel;

    return pen.addListener(() => {
      setPen(realmInstance.objectForPrimaryKey('Pen', uuid));
    });
  }, [realmInstance, penId])

  if (!pen) {
    return null;
  }

  const goToEdit = () => {
    return navigation.navigate('PenCreate', {penId: pen._id.toHexString()})
  }

  return (
    <AbstractViewScreen goToEdit={goToEdit} data={pen} dataType={'pen'}/>
  )
}
