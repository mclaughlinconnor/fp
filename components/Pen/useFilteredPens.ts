import {useEffect, useState} from 'react';
import {realmInstance} from '../../db/Realm';
import {PenModel} from '../../db/models/PenModel';

export function useFilteredPens(): [Realm.Results<PenModel> | [], (value: string) => void] {
  const [pens, setPens] = useState<Realm.Results<PenModel> | []>([]);
  const [filter, setFilter] = useState<string>();

  const getPens = (): Realm.Results<PenModel> => {
    if (filter) {
      return realmInstance.objects('Pen')
        .filtered(filter) as Realm.Results<PenModel>;
    }

    return realmInstance.objects('Pen');
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const penResults = getPens();

    if (penResults?.length) {
      setPens(penResults);
    }

    penResults.addListener(() => {
      setPens(getPens());
    });

    return () => {
      penResults?.removeAllListeners();

      setPens([]);
    };
  }, [realmInstance, filter]);

  return [pens, setFilter]
}