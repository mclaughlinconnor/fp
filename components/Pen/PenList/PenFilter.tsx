import {useEffect, useState} from "react";
import {Button, Modal, Pressable, ViewProps} from 'react-native';
import {TextInput} from '../../Styling/TextInput';
import {Text, View} from '../../Styling/Themed';
import {DropdownSelect} from '../../Styling/DropdownSelect';
import {NibSize, NibSizes} from '../../../db/models/NibModel';
import {PenModel} from '../../../db/models/PenModel';
import {realmInstance} from '../../../db/Realm';
import {ColourService} from '../../../styles/ColourService';
import CheckBox from '@react-native-community/checkbox';

export default function PenFilter({visible, setVisible, setFilter}: {visible: boolean, setVisible: (visible: boolean) => void, setFilter: (filter: string) => void}) {
  const colourSvc = new ColourService({});

  const generateItem = (value: any): {value: any, label: string} => {
    return {value, label: value.toString()}
  }

  const [selectedNibSize, setSelectedNibSize] = useState<NibSize>();
  const [manufacturer, setManufacturer] = useState<string>();
  const [name, setName] = useState<string>();
  const [colour, setColour] = useState<string>();
  const [inked, setInked] = useState<boolean>(false);
  const [uninked, setUninked] = useState<boolean>(false);

  const [allColours, setAllColours] = useState<string[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<string[]>([]);

  const styles = {
    overlay: {
      width: '100%',
      height: '100%',
      flex: 1,
    },
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingBottom: 16,
    },
    inputContainer: {
      marginHorizontal: 16,
      marginTop: 12,
    },
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

    if (selectedNibSize) {
      query.push(`nib.size == "${selectedNibSize}"`);
    }

    if (uninked) {
      query.push('ink == null')
    }

    if (inked) {
      query.push('ink != null')
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

  const complete = () => {
    setVisible(false);
    setFilter(generateQueryString());
  }

  const setUninkedQuery = (value: boolean) => {
    setUninked(value);
    if (value) {
      setInked(false)
    }
  }

  const setInkedQuery = (value: boolean) => {
    setInked(value);
    if (value) {
      setUninked(false)
    }
  }

  return (
    <Modal visible={visible} transparent animationType={'slide'}>
      <Pressable style={styles.overlay as ViewProps} onPress={() => setVisible(false)}>
        <View style={styles.container as ViewProps} elevation={12} colour={'background'}>
          <TextInput placeholder={'Pen name'} onChangeText={setName} value={name} />
          <View style={styles.inputContainer}>
            <DropdownSelect
              label={'Select pen colour...'}
              data={allColours.map(generateItem)}
              onSelect={setColour}
              defaultSelected={colour ? generateItem(colour) : undefined}
              allowNone={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <DropdownSelect
              label={'Select pen manufacturer...'}
              data={allManufacturers.map(generateItem)}
              onSelect={setManufacturer}
              defaultSelected={manufacturer ? generateItem(manufacturer) : undefined}
              allowNone={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <DropdownSelect
              label={'Select nib size...'}
              data={NibSizes.map(generateItem)}
              onSelect={setSelectedNibSize}
              defaultSelected={selectedNibSize ? generateItem(selectedNibSize) : undefined}
              allowNone={true}
            />
          </View>
          <View style={[styles.inputContainer, styles.checkboxContainer as ViewProps]}>
            <Text style={styles.checkboxLabel}>
              Pen is inked?
            </Text>
            <CheckBox
              value={inked}
              onValueChange={setInkedQuery}
            />
          </View>
          <View style={[styles.inputContainer, styles.checkboxContainer as ViewProps]}>
            <Text style={styles.checkboxLabel}>
              Pen isn't inked?
            </Text>
            <CheckBox
              value={uninked}
              onValueChange={setUninkedQuery}
            />
          </View>
          <View style={styles.inputContainer}>
            <Button
              title={'Filter'}
              onPress={complete}
              color={colourSvc.getColour(undefined, 'primary')}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
