export function genExpiresTime(offset: number) {
  return now() + offset;
}

export function now() {
  return Math.floor(+new Date() / 1000);
}

export function hash(prefix: any, val: string) {
  return `$C_${prefix}$${val}`;
}

export function fromHash(prefix: any, hash: string) {
  return hash.slice(prefix.toString().length + 4);
}
