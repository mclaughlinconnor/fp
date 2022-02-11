export type NibSize = 'extra fine' | 'fine' | 'medium' | 'broad' | '1.1mm stub';

export type Nib = {
  color: string;
  id: number;
  manufacturer: string;
  size: NibSize;
}
