import {Component} from "react";
import {Nib} from "./Nib";

const NIBS: Nib[] = [
  {
    color: 'Silver',
    id: 0,
    size: 'extra fine',
    manufacturer: 'Jinhao',
  }, {
    color: 'Silver',
    id: 1,
    size: 'medium',
    manufacturer: 'Lamy',
  }, {
    color: 'Silver',
    id: 2,
    size: 'broad',
    manufacturer: 'TWISBI',
  }, {
    color: 'Silver',
    id: 3,
    size: 'medium',
    manufacturer: 'Parker',
  }, {
    color: 'Silver',
    id: 4,
    size: 'medium',
    manufacturer: 'Cross',
  }, {
    color: 'Black',
    id: 5,
    size: '1.1mm stub',
    manufacturer: 'Lamy',
  }, {
    color: 'Silver',
    id: 6,
    size: 'medium',
    manufacturer: 'Jinhao',
  }, {
    color: 'Silver',
    id: 7,
    size: 'medium',
    manufacturer: 'Kaweko',
  }, {
    color: 'Silver',
    id: 8,
    size: 'fine',
    manufacturer: 'Platinum',
  },
]

export default class NibService extends Component {
  nibs: Nib[];

  constructor(props: {}) {
    super(props);
    this.nibs = NIBS;
  }

  allNibs(): Nib[] {
    return this.nibs;
  }

  findOne(id: number): Nib {
    return this.nibs.find(nib => nib.id === id)!;
  }
}
