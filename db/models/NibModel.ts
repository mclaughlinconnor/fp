import Realm from 'realm';
import UUID = Realm.BSON.UUID;
import {PenModel} from './PenModel';

export type NibSize = 'extra fine' | 'fine' | 'medium' | 'broad' | '1.1mm stub';

export class NibModel extends Realm.Object {

  public _id!: UUID;

  public colour!: string;

  public manufacturer!: string;

  public size!: NibSize;

  public pens: PenModel[];

  static generate(nib: Partial<NibModel>): NibModel {
    return {
      _id: nib._id || new Realm.BSON.UUID(),
      colour: nib.colour,
      manufacturer: nib.manufacturer,
      size: nib.size,
    } as NibModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'NibModel',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      colour: 'string',
      manufacturer: 'string',
      size: 'string',
      pens: 'PenModel[]'
    }
  };
}
