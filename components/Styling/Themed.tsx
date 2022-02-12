import { Text as DefaultText, View as DefaultView } from 'react-native';

import useColorScheme from '../../hooks/useColorScheme';
import { Elevation } from '../../styles/Styles';
import { ColourService } from '../../styles/ColourService';

type ThemeProps = {
  colour?: 'primary' | 'secondary' | 'error' | 'surface' | 'background';
  brightness?: 'light' | 'dark';
  elevation?: Elevation;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

const colourSvc = new ColourService({});

export function Text(props: TextProps) {
  const { style, colour, brightness, ...otherProps } = props;

  const colourStyle = colourSvc.getTextColourStyle(brightness, colour)

  return <DefaultText style={[colourStyle, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, colour, brightness, elevation, ...otherProps } = props;

  let elevationStyle = {};
  if (elevation) {
    elevationStyle = colourSvc.getViewElevationStyle(elevation || 0, brightness || useColorScheme());
  }

  let colourStyle = {};
  if (colour) {
    colourStyle = colourSvc.getColourStyle(brightness, colour)
  }

  return <DefaultView style={[elevationStyle, colourStyle, style]} {...otherProps} />;
}
