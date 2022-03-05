import Realm from 'realm';
import UUID = Realm.BSON.UUID;
import {PenModel} from './PenModel';
import {FileModel} from './FileModel';

export class InkModel extends Realm.Object {

  public _id!: UUID;

  public name!: string;

  public colour!: string;

  public manufacturer!: string;

  public volume!: number;

  public pens: PenModel[];

  public image: FileModel;

  static generate(ink: Partial<InkModel>): InkModel {
    return {
      _id: ink._id || new Realm.BSON.UUID(),
      name: ink.name,
      colour: ink.colour,
      manufacturer: ink.manufacturer,
      volume: ink.volume,
      image: ink.image,
    } as InkModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Ink',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
      colour: 'string',
      manufacturer: 'string',
      volume: 'int',
      pens: {
        type: 'linkingObjects',
        objectType: 'Pen',
        property: 'ink'
      },
      image: 'File?',
    },
  };
}
