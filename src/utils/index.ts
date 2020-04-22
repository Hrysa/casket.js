export function now() {
  return Math.floor(+new Date() / 1000);
}

export function hash(prefix: any, val: string) {
  return `$C_${prefix}$${val}`;
}
