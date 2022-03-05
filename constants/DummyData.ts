import {NibModel, NibSize} from '../db/models/NibModel';
import {PenModel} from '../db/models/PenModel';
import {FileModel} from '../db/models/FileModel';

const file = {
  _id: new Realm.BSON.UUID('15c95d13-27cb-420f-88a7-464f23106058'),
  createdAt: new Date(),
  url: 'https://firebasestorage.googleapis.com/v0/b/cm-fp-1b689.appspot.com/o/vKcJPbGREshgUE5QapNS4aJivT62%2Fimages%2Fpens%2F545b8f21-c2ee-430d-8f2d-753c03ce9c6b?alt=media&token=479cd5d8-b82e-4add-b750-d4ffee98b5b4'
} as FileModel;

const jEF = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('23cedeac-dede-4ac7-82c9-e9dc7f994498'),
  size: 'extra fine' as unknown as NibSize,
  manufacturer: 'Jinhao',
  image: file
} as NibModel;
const lM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('014b5c46-44d8-402f-bbb9-30a80c763436'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Lamy',
} as NibModel;
const tB = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('cae95d64-5743-44ea-b6f3-1c487af4a1cf'),
  size: 'broad' as unknown as NibSize,
  manufacturer: 'TWISBI',
  image: file
} as NibModel;
const pM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('c87eeabd-82f3-4eac-80b3-be482d9bc6b8'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Parker',
} as NibModel;
const cM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('790e8830-ef79-459d-be9d-7d6a3732c36a'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Cross',
  image: file
} as NibModel;
const lS = {
  colour: 'Black',
  _id: new Realm.BSON.UUID('201ffea3-1228-46fd-a263-91788ec16eec'),
  size: '1.1mm stub' as unknown as NibSize,
  manufacturer: 'Lamy',
} as NibModel;
const jM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('50a3b23c-b82c-4eb1-b463-fb0c77067aae'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Jinhao',
  image: file
} as NibModel;
const kM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('7dbdcc67-3e3a-4596-9869-f330f902047d'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Kaweko',
} as NibModel;
const pF = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('c4b4be7c-cccb-4405-bdd6-60608e098f8a'),
  size: 'fine' as unknown as NibSize,
  manufacturer: 'Platinum',
  image: file
} as NibModel;

export const Pens: Partial<PenModel>[] = [
  {
    colour: 'white',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('4c2032bd-a3c7-4311-a4c5-e919596a8533'),
    name: 'Safari',
    manufacturer: 'LAMY',
    nib: lM,
    image: file
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('186b7588-f128-4af4-87a7-f7cd5a856a42'),
    name: 'Safari',
    manufacturer: 'LAMY',
    nib: lS,
    image: file
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('18249270-3e35-4669-861a-4d3e694cde20'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file
  }, {
    colour: 'red',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('ff209d8f-818a-45fc-a049-e4463da2275c'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file
  }, {
    colour: 'blue',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('2fea7cb0-e047-41d9-89fb-59aa8948bdcb'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file
  }, {
    colour: 'white',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('e4abbd1f-960b-483e-8314-e49dc7e82b9c'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('19c7f1d1-5276-4521-aa8a-7955bed84e25'),
    name: 'x750',
    manufacturer: 'Jinhao',
    nib: jM,
    image: file
  }, {
    colour: 'gold/silver',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('0c3919bb-8a86-420c-8b12-7f2f9900f976'),
    name: 'Sonnet',
    manufacturer: 'Parker',
    nib: pM,
    image: file
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('d3a89e8a-c6e5-473c-b641-d2ae21da7366'),
    name: 'Calais',
    manufacturer: 'Cross',
    nib: cM,
    image: file
  }, {
    colour: 'white/blue',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('b8f90d94-7980-49eb-a09b-b3987e258de7'),
    name: 'Perkeo',
    manufacturer: 'Kaweko',
    nib: kM,
    image: file
  }, {
    colour: 'transparent',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('36b6c516-685c-48a3-b4d3-38209a192465'),
    name: 'Preppy',
    manufacturer: 'Platinum',
    nib: pF,
    image: file
  }, {
    colour: 'transparent',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('3070dc1d-79ae-4ede-9aca-4800640ca4ad'),
    name: 'Go',
    manufacturer: 'TWISBI',
    nib: tB,
    image: file
  },
]
