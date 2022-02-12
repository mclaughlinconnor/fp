import {Brightness, Colour, Elevation, Style} from './Styles';
import useColorScheme from '../hooks/useColorScheme';
import {Component} from 'react';
import {backgroundColor, Colours} from './Colours';
import {shadowElevation} from './Elevations';

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

  getViewElevationStyle(elevation: Elevation, brightness: Brightness): Style {
    return {
      ...shadowElevation[elevation], ...backgroundColor[brightness][elevation],
    }
  }
}