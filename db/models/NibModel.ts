import Realm from 'realm';
import UUID = Realm.BSON.UUID;
import {PenModel} from './PenModel';
import {FileModel} from './FileModel';

const _NibSizes = [
  '0.7mm stub',
  '0.9mm stub',
  '1.1mm stub',
  '1.5mm stub',
  '1.9mm stub',
  '2.5mm stub',
  '2.9mm stub',
  'broad',
  'extra fine',
  'fine',
  'flex',
  'fude',
  'medium',
  'mini fude',
] as const;
export type NibSize = typeof _NibSizes;
export const NibSizes = _NibSizes as unknown as NibSize[];

export class NibModel extends Realm.Object {

  public _id!: UUID;

  public colour!: string;

  public manufacturer!: string;

  public size!: NibSize;

  public pens: PenModel[];

  public image: FileModel;

  static generate(nib: Partial<NibModel>): NibModel {
    return {
      _id: nib._id || new Realm.BSON.UUID(),
      colour: nib.colour,
      manufacturer: nib.manufacturer,
      size: nib.size,
      image: nib.image,
    } as NibModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Nib',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      colour: 'string',
      manufacturer: 'string',
      size: 'string',
      pens: {
        type: 'linkingObjects',
        objectType: 'Pen',
        property: 'nib'
      },
      image: 'File?',
    },
  };
}
