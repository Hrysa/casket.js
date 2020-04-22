// eslint-disable-next-line
import { Driver } from './driver';
import { now, hash } from './utils';

export class Meta {
  casketId: string | number;
  drv: Driver;

  expires: { [K: string]: number } = {};

  constructor(casketId: string | number, drv: Driver) {
    this.casketId = casketId;
    this.drv = drv;

    const metaData = this.drv.get(hash(this.casketId, 'META')) || {};
    this.expires = metaData.expires || {};
  }

  update(key: string, val: { expires: number }) {
    this.expires[key] = val.expires;
    this.sync();
  }

  isExists(key: string) {
    return key in this.expires;
  }

  isValid(key: string) {
    const time = this.expires[key];
    return time === 0 || time > now();
  }

  remove(key: string) {
    delete this.expires[key];
    this.sync();
  }

  keys() {
    return Object.keys(this.expires);
  }

  empty() {
    this.expires = {};
    this.sync();
  }

  sync() {
    this.drv.set(hash(this.casketId, 'META'), this);
  }
}
