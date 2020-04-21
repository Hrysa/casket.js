import { Driver } from './';

export default class Node extends Driver {
  constructor(id: number) {
    super(id);
    throw new Error('not implemented');
  }

  set(key: any, value: any) {
    console.log(key, value);
  }

  get(key: string) {
    return key;
  }

  delete(key: string) {
    console.log(key);
  }

  expires(key: string) {
    console.log(key);
  }

  empty() {}

  syncMeta() {}

  setup() {}
}
