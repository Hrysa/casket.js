export function get(key: string) {
  const str = localStorage.getItem(key);
  if (!str) return str;
  return JSON.parse(str);
}

export function set(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key: string): void {
  localStorage.removeItem(key);
}
