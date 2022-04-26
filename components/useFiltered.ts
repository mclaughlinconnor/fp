import {useEffect, useState} from 'react';
import {realmInstance} from '../db/Realm';

export function useFiltered<T, K extends keyof T>(model: T, modelName: string): [Realm.Results<T> | [], (value: string) => void] {
  const [data, setDataPoints] = useState<Realm.Results<T> | []>([]);
  const [filter, setFilter] = useState<string>();

  const getData = (): Realm.Results<T> => {
    if (filter) {
      return realmInstance.objects(modelName)
        .filtered(filter) as unknown as Realm.Results<T>;
    }

    return realmInstance.objects(modelName);
  }

  useEffect(() => {
    if (!realmInstance) {
      return;
    }

    const results = getData();

    if (results?.length) {
      setDataPoints(results);
    }

    results.addListener(() => {
      setDataPoints(getData());
    });

    return () => {
      results?.removeAllListeners();

      setDataPoints([]);
    };
  }, [realmInstance, filter]);

  return [data, setFilter]
}