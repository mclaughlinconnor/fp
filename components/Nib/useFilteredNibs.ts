import {NibModel} from '../../db/models/NibModel';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';

export function useFilteredNibs(): [Realm.Results<NibModel> | [], (value: string) => void] {
  const [nibs, setNibs] = useState<Realm.Results<NibModel> | []>([]);
  const [filter, setFilter] = useState<string>();

  const getNibs = (): Realm.Results<NibModel> => {
    if (filter) {
      return realmInstance.objects('Nib')
        .filtered(filter) as Realm.Results<NibModel>;
    }

    return realmInstance.objects('Nib');
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const nibResults = getNibs();

    if (nibResults?.length) {
      setNibs(nibResults);
    }

    nibResults.addListener(() => {
      setNibs(getNibs());
    });

    return () => {
      nibResults?.removeAllListeners();

      setNibs([]);
    };
  }, [realmInstance, filter]);

  return [nibs, setFilter]
}