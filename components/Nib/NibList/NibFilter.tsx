import AbstractFilter, {filterSpec} from '../../Abstract/AbstractFilter';
import {NibModel, NibSize, NibSizes} from '../../../db/models/NibModel';
import {realmInstance} from '../../../db/Realm';
import {useEffect, useState} from "react";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setFilter: (filter: string) => void;
}

export default function NibFilter({visible, setVisible, setFilter}: Props) {
  const [nibSize, setNibSize] = useState<NibSize>();
  const [manufacturer, setManufacturer] = useState<string>();
  const [colour, setColour] = useState<string>();

  const [allColours, setAllColours] = useState<string[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<string[]>([]);

  const generateQueryString = (): string => {
    const query: string[] = []

    if (manufacturer) {
      query.push(`manufacturer == "${manufacturer}"`);
    }

    if (colour) {
      query.push(`colour == "${colour}"`);
    }

    if (nibSize) {
      query.push(`nib.size == "${nibSize}"`);
    }

    return query.join(' AND ')
  }

  useEffect(() => {
    const nibResults: Realm.Results<NibModel> = realmInstance.objects('Nib');
    if (!nibResults?.length) {
      return
    }

    nibResults.addListener(() => {
      const allNibs: Realm.Results<NibModel> = realmInstance.objects('Nib');

      setAllColours([...new Set(allNibs.map(nib => nib.colour))])
      console.log(allColours);
      setAllManufacturers([...new Set(allNibs.map(nib => nib.manufacturer))])
    });
  }, [realmInstance])

  const filterSpec: filterSpec[] = [
    {controlType: 'dropdown', label: 'Select nib colour...', prop: 'colour', data: allColours, setValue: setColour, value: colour},
    {controlType: 'dropdown', label: 'Select nib manufacturer...', prop: 'manufacturer', data: allManufacturers, setValue: setManufacturer, value: manufacturer},
    {controlType: 'dropdown', label: 'Select nib size...', prop: 'nibSize', data: NibSizes, setValue: setNibSize, value: nibSize},
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
