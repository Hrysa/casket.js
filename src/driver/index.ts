export interface Driver {
  set(key: string, value: any, exp?: number): void;

  get(key: string): any;

  remove(key: string): void;
}
