export type Style = {
  shadowColor?: string,
  shadowOffset?: {
    width?: number,
    height?: number,
  },
  shadowOpacity?: number,
  shadowRadius?: number,
  elevation?: number,
  backgroundColor?: string,
  color?: string
}

export type Colour = 'primary' | 'secondary' | 'error' | 'surface' | 'background';

export type Brightness = 'light' | 'dark';

export type Elevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export type ColourMode = 'light' | 'dark' | 'primary';
