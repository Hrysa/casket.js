// eslint-disable-next-line
import { Driver } from './driver';
import * as Browser from './driver/browser';

import { hash, now } from './utils';

import { Meta } from './meta';

export class Casket {
  private id: number;

  private drv: Driver;

  private meta: Meta;

  constructor(id: number = 0) {
    this.id = id;
    this.drv = Browser;
    this.meta = new Meta(this.id, this.drv);
  }

  set(key: string, value: any, expires: number = 0) {
    this.drv.set(hash(this.id, key), value);
    this.exp(key, expires);
  }

  get(key: string | { [K: string]: string }, ...args: string[]) {
    if (typeof key === 'string') {
      if (args && args.length) {
        return [key, ...args].map((k) => this.$get(k));
      }
      return this.$get(key);
    }

    const object: { [K in typeof key & string]: any } = {} as any;
    Object.keys(key).forEach((k) => {
      (object as any)[k] = this.$get(key[k]);
    });
    return object;
  }

  private $get(key: string) {
    if (this.meta.isValid(key)) return this.drv.get(hash(this.id, key));

    if (this.meta.isExists(key)) {
      this.del(key);
    }

    return null;
  }

  del(...keys: string[]) {
    keys.map(this.$del.bind(this));
  }

  private $del(key: string) {
    this.meta.remove(key);
    this.drv.remove(key);
  }

  exp(key: string, offset: number) {
    const expires = offset === 0 ? 0 : offset + now();
    this.meta.update(key, { expires });
  }

  size() {
    return this.keys().length;
  }

  keys() {
    return this.meta.keys();
  }

  empty() {
    this.del(...this.keys());
    this.meta.empty();
  }
}

export default Casket;
