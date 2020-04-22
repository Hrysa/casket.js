import { now } from '../utils';

export abstract class Driver {
  readonly id: number;

  protected meta: DriverMeta = { expires: {} };

  abstract set(key: string, value: any, exp: number): void;

  abstract get(key: string): any;

  abstract delete(key: string): void;

  abstract expires(key: string, expires: number): void;

  abstract setup(): void;

  abstract empty(): void;

  abstract syncMeta(): void;

  constructor(id: number) {
    this.id = id;
  }

  protected cleanupMeta() {
    const deletedKeys = Object.keys(this.meta.expires)
      .map((key) => {
        const time = this.meta.expires[key];
        if (time < now() && time > 0) {
          delete this.meta.expires[key];
          return key;
        }
      })
      .filter(Boolean) as string[];

    this.syncMeta();

    return { deletedKeys };
  }

  protected updateMeta(key: string, timestamp: number) {
    this.meta.expires[key] = timestamp;
    this.syncMeta();
  }

  protected checkMeta(key: string) {
    if (!(key in this.meta.expires)) return MetaExpiresType.NOT_EXISTS;

    const expires = this.meta.expires[key];
    if (expires <= now() && expires > 0) {
      return MetaExpiresType.EXPIRED;
    }

    return MetaExpiresType.EXISTS;
  }

  protected deleteMeta(key: string) {
    delete this.meta.expires[key];
    this.syncMeta();
  }

  /** return all keys */
  protected emptyMeta() {
    const keys = Object.keys(this.meta.expires);
    this.meta.expires = {};
    this.syncMeta();
    return keys;
  }

  public size() {
    return this.keys().length;
  }

  public keys() {
    return Object.keys(this.meta.expires);
  }
}

export interface DriverMeta {
  expires: { [K: string]: number };
}

export enum MetaExpiresType {
  // eslint-disable-next-line no-unused-vars
  NOT_EXISTS,
  // eslint-disable-next-line no-unused-vars
  EXPIRED,
  // eslint-disable-next-line no-unused-vars
  EXISTS,
}
