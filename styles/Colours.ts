import {Brightness, Colour, Elevation, Style} from './Styles';

type ColorDefinition = { [key in Colour]: {primary: string, light?: string, dark?: string} };

type TextDefinition = { [key in Colour]: string } & { label: string };

export const Colours: { [key in Brightness]: {text: TextDefinition, color: ColorDefinition} } = {
  dark: {
    color: {
      primary: {
        primary: '#311a91',
        light: '#6745c2',
        dark: '#000062',
      },
      secondary: {
        primary: '#d84315',
        light: '#ff7543',
        dark: '#9f0000',
      },
      error: {
        primary: '#cf6679',
      },
      background: {
        primary: '#121212',
      },
      surface: {
        primary: '#121212',
      },
    },
    text: {
      primary: '#ffffff',
      background: '#ffffff',
      secondary: '#000000',
      error: '#ffffff',
      surface: '#ffffff',
      label: '#999999',
    },
  },
  light: {
    color: {
      primary: {
        primary: '#311a91',
        light: '#6745c2',
        dark: '#000062',
      },
      secondary: {
        primary: '#d84315',
        light: '#ff7543',
        dark: '#9f0000',
      },
      error: {
        primary: '#b00020',
      },
      background: {
        primary: '#ffffff',
      },
      surface: {
        dark: '#e0e0e0',
        primary: '#ffffff',
      },
    },
    text: {
      primary: '#ffffff',
      background: '#000000',
      secondary: '#ffffff',
      error: '#ffffff',
      surface: '#000000',
      label: '#626262'
    },
  },
};

export const backgroundColor: { [key in Brightness]: { [key in Elevation]: Pick<Style, 'backgroundColor'> } } = {
  dark: {
    0: {backgroundColor: '#121212'},
    1: {backgroundColor: '#1d1d1d'},
    2: {backgroundColor: '#212121'},
    3: {backgroundColor: '#242424'},
    4: {backgroundColor: '#262626'},
    6: {backgroundColor: '#2c2c2c'},
    8: {backgroundColor: '#2d2d2d'},
    12: {backgroundColor: '#333333'},
    16: {backgroundColor: '#373737'},
    24: {backgroundColor: '#353535'},
  },
  light: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    6: {},
    8: {},
    12: {},
    16: {},
    24: {},
  },
}
