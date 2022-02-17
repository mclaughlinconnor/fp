import {Brightness, Colour, ColourMode, Elevation, Style} from './Styles';
import useColorScheme from '../hooks/useColorScheme';
import {Component} from 'react';
import {backgroundColor, Colours} from './Colours';
import {shadowElevation} from './Elevations';

export const OVER_ALL = 1000;

export class ColourService extends Component<{}, {}> {
  getColourStyle(brightness?: Brightness, colour: Colour = 'surface') {
    if (!brightness) {
      brightness = useColorScheme() as Brightness;
    }

    return {
      color: Colours[brightness].text[colour],
      backgroundColor: Colours[brightness].color[colour].primary,
    }
  }

  getTextColourStyle(brightness?: Brightness, colour: Colour = 'surface') {
    if (!brightness) {
      brightness = useColorScheme() as Brightness;
    }

    return {
      color: Colours[brightness].text[colour],
    }
  }

  getColour(brightness?: Brightness, colour: Colour = 'surface', mode: ColourMode = 'primary') {
    if (!brightness) {
      brightness = useColorScheme() as Brightness;
    }

    const colourObj = Colours[brightness].color[colour];

    return colourObj[mode] || colourObj.primary;
  }

  getTextColour(brightness?: Brightness, colour: Colour | 'label' = 'surface') {
    if (!brightness) {
      brightness = useColorScheme() as Brightness;
    }

    return Colours[brightness].text[colour];
  }

  getViewElevationStyle(elevation: Elevation, brightness?: Brightness): Style {
    if (!brightness) {
      brightness = useColorScheme() as Brightness;
    }

    return {
      ...shadowElevation[elevation], ...backgroundColor[brightness][elevation],
    }
  }
}