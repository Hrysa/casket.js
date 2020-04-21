import { Driver, MetaExpiresType } from './';
import { genExpiresTime } from '../utils';

function get(key: string) {
  const str = localStorage.getItem(key);
  if (!str) return str;
  return JSON.parse(str);
}

function set(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
  localStorage.removeItem(key);
}

export default class Browser extends Driver {
  private get meta_key() {
    return '$C_META$' + this.id;
  }

  set(key: string, value: any, expires: number = 0) {
    set(key, value);
    this.expires(key, expires);
  }

  get(key: string) {
    switch (this.checkMeta(key)) {
      case MetaExpiresType.EXISTS:
        return get(key);

      case MetaExpiresType.EXPIRED:
        this.cleanupMeta();
    }
    return null;
  }

  delete(key: string) {
    this.deleteMeta(key);
    localStorage.removeItem(key);
  }

  expires(key: string, expires: number) {
    let time = 0;
    if (expires) {
      time = genExpiresTime(expires);
    }
    this.updateMeta(key, time);
  }

  empty() {
    const keys = this.emptyMeta();
    keys.map(remove);
  }

  syncMeta() {
    set(this.meta_key, this.meta);
  }

  setup() {
    this.meta = get(this.meta_key) || this.meta;
    const res = this.cleanupMeta();

    // only delete expires keys exists in meta data.
    res.deletedKeys.forEach(remove);
  }

  getAllKeysFromStorage() {
    const keys = [];
    let length = localStorage.length;
    while (length--) {
      keys.push(localStorage.key(length) as string);
    }
    return keys.reverse();
  }
}
