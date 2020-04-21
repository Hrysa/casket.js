// eslint-disable-next-line
import { Driver } from './driver';
import Node from './driver/node';
import Browser from './driver/browser';
import { hash, fromHash } from './utils';

interface CasketOptions {}

const defaultCasketOptions = {};

class Casket {
  id: number;
  driver: Driver;

  opt: CasketOptions;

  constructor(id: number = 0, opt: CasketOptions = {}) {
    this.id = id;
    this.opt = { ...defaultCasketOptions, ...opt };
    this.driver =
      (globalThis as any).__proto__.constructor.name === 'Window'
        ? new Browser(id)
        : new Node(id);
    this.driver.setup();
  }

  set(key: string, value: any, expires: number = 0) {
    this.driver.set(hash(this.id, key), value, expires);
  }

  get(key: string | { [K: string]: string }, ...args: string[]) {
    if (typeof key === 'string') {
      if (args && args.length) {
        return [key, ...args].map((k) => this.driver.get(hash(this.id, k)));
      }
      return this.driver.get(hash(this.id, key));
    }

    const object: { [K in typeof key & string]: any } = {} as any;
    Object.keys(key).forEach((k) => {
      (object as any)[k] = this.driver.get(hash(this.id, key[k]));
    });
    return object;
  }

  del(key: string) {
    return this.driver.delete(hash(this.id, key));
  }

  exp(key: string, expires: number) {
    return this.driver.expires(hash(this.id, key), expires);
  }

  size() {
    return this.driver.size();
  }

  keys() {
    return this.driver.keys().map((hash) => fromHash(this.id, hash));
  }

  empty() {
    return this.driver.empty();
  }
}

export default Casket;
