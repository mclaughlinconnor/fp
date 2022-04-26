import AbstractFilter, {filterSpec} from '../../Abstract/AbstractFilter';
import CheckBox from '@react-native-community/checkbox';
import {NibSize, NibSizes} from '../../../db/models/NibModel';
import {PenModel} from '../../../db/models/PenModel';
import {Text, View} from '../../Styling/Themed';
import {ViewProps} from 'react-native';
import {realmInstance} from '../../../db/Realm';
import {useEffect, useState} from "react";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setFilter: (filter: string) => void;
}

export default function PenFilter({visible, setVisible, setFilter}: Props) {
  const [nibSize, setNibSize] = useState<NibSize>();
  const [manufacturer, setManufacturer] = useState<string>();
  const [name, setName] = useState<string>();
  const [colour, setColour] = useState<string>();
  const [inked, setInked] = useState<'inked' | 'uninked' | undefined>(undefined);

  const [allColours, setAllColours] = useState<string[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<string[]>([]);

  const styles = {
    checkboxContainer: {
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkboxLabel: {
      fontSize: 16,
    },
  }

  const generateQueryString = (): string => {
    const query: string[] = []

    if (manufacturer) {
      query.push(`manufacturer == "${manufacturer}"`);
    }

    if (name) {
      query.push(`name CONTAINS[c] "${name}"`);
    }

    if (colour) {
      query.push(`colour == "${colour}"`);
    }

    if (nibSize) {
      query.push(`nib.size == "${nibSize}"`);
    }

    if (inked) {
      switch (inked) {
        case 'inked':
          query.push('ink != null')
          break;
        case 'uninked':
          query.push('ink == null')
          break;
      }
    }

    return query.join(' AND ')
  }

  useEffect(() => {
    const penResults: Realm.Results<PenModel> = realmInstance.objects('Pen');
    if (!penResults?.length) {
      return
    }

    penResults.addListener(() => {
      const allPens: Realm.Results<PenModel> = realmInstance.objects('Pen');

      setAllColours([...new Set(allPens.map(pen => pen.colour))])
      setAllManufacturers([...new Set(allPens.map(pen => pen.manufacturer))])
    });
  }, [realmInstance])

  const setUninkedQuery = (value: boolean) => {
    if (value) {
      setInked('uninked');
    } else {
      setInked(undefined);
    }
  }

  const setInkedQuery = (value: boolean) => {
    if (value) {
      setInked('inked');
    } else {
      setInked(undefined)
    }
  }

  const inkedElement = (
    <>
      <View style={styles.checkboxContainer as ViewProps}>
        <Text style={styles.checkboxLabel}>
          Pen is inked?
        </Text>
        <CheckBox
          value={inked === 'inked'}
          onValueChange={setInkedQuery}
        />
      </View>
      <View style={styles.checkboxContainer as ViewProps}>
        <Text style={styles.checkboxLabel}>
          Pen isn't inked?
        </Text>
        <CheckBox
          value={inked === 'uninked'}
          onValueChange={setUninkedQuery}
        />
      </View>
    </>
  )

  const filterSpec: filterSpec[] = [
    {controlType: 'text', label: 'Pen name', prop: 'name', setValue: setName, value: name},
    {controlType: 'dropdown', label: 'Select pen colour...', prop: 'colour', data: allColours, setValue: setColour, value: colour},
    {controlType: 'dropdown', label: 'Select pen manufacturer...', prop: 'manufacturer', data: allManufacturers, setValue: setManufacturer, value: manufacturer},
    {controlType: 'dropdown', label: 'Select nib size...', prop: 'nibSize', data: NibSizes, setValue: setNibSize, value: nibSize},
    {controlType: 'custom', value: inked, prop: 'inked', customElement: inkedElement},
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
