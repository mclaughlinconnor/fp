import AbstractFilter, {filterSpec} from '../../Abstract/AbstractFilter';
import {InkModel} from '../../../db/models/InkModel';
import {realmInstance} from '../../../db/Realm';
import {useEffect, useState} from "react";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setFilter: (filter: string) => void;
}

export default function InkFilter({visible, setVisible, setFilter}: Props) {
  const [manufacturer, setManufacturer] = useState<string>();
  const [colour, setColour] = useState<string>();
  const [volume, setVolume] = useState<number>();

  const [allColours, setAllColours] = useState<string[]>([]);
  const [allVolumes, setAllVolumes] = useState<number[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<string[]>([]);

  const generateQueryString = (): string => {
    const query: string[] = []

    if (volume) {
      query.push(`volume == "${volume}"`);
    }

    if (manufacturer) {
      query.push(`manufacturer == "${manufacturer}"`);
    }

    if (colour) {
      query.push(`colour == "${colour}"`);
    }

    return query.join(' AND ')
  }

  useEffect(() => {
    const nibResults: Realm.Results<InkModel> = realmInstance.objects('Ink');
    if (!nibResults?.length) {
      return
    }

    nibResults.addListener(() => {
      const allInks: Realm.Results<InkModel> = realmInstance.objects('Ink');

      setAllColours([...new Set(allInks.map(ink => ink.colour))])
      setAllManufacturers([...new Set(allInks.map(ink => ink.manufacturer))])
      setAllVolumes([...new Set(allInks.map(ink => ink.volume))])
    });
  }, [realmInstance])

  const filterSpec: filterSpec[] = [
    {controlType: 'dropdown', label: 'Select ink colour...', prop: 'colour', data: allColours, setValue: setColour, value: colour},
    {controlType: 'dropdown', label: 'Select ink manufacturer...', prop: 'manufacturer', data: allManufacturers, setValue: setManufacturer, value: manufacturer},
    {controlType: 'dropdown', label: 'Select ink volume...', prop: 'volume', data: allVolumes, setValue: setVolume, value: volume},
  ]

  return (
    <AbstractFilter
      setFilter={setFilter}
      visible={visible}
      setVisible={setVisible}
      generateQueryString={generateQueryString}
      filterSpec={filterSpec}
    />
  )
}
