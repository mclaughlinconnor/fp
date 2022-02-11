import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Nib } from '../Nib/Nib';

export type Pen = {
  color: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  id: number;
  name: string;
  nib: Nib;
}