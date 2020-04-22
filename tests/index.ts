import Casket from '../src';

describe('casket test', () => {
  it('init', () => {
    localStorage.clear();
    expect(localStorage.length).toEqual(0);
  });

  const k = 'K',
    v = 'V',
    k2 = 'K2',
    v2 = 'V2';

  it('create instance', () => {
    const casket = new Casket();
    expect(casket instanceof Casket);
  });

  it('set with 2s expires', () => {
    const casket = new Casket();
    expect(casket.set(k, v, 1)).toEqual(void 0);
    expect(casket.get(k)).toEqual(v);
  });

  it('get after 1s', () => {
    const casket = new Casket();
    setTimeout(() => {
      expect(casket.get(k)).toEqual(v);
    }, 1000);
  });

  it('get after 2.5s', () => {
    setTimeout(() => {
      expect(new Casket().get('a')).toEqual(null);
    }, 2500);
  });

  it('delete', () => {
    const casket = new Casket();
    casket.set(k, v);
    casket.del(k);
    expect(casket.get(k)).toEqual(null);
  });

  it('set expires time after create', () => {
    const casket = new Casket();
    casket.set(k, v);
    casket.exp(k, 1);

    setTimeout(() => {
      expect(casket.get(k)).toEqual(null);
    }, 1500);
  });

  it('use prefix', () => {
    const casket = new Casket(1);
    casket.set(k2, v2);
    casket.set(k, v);
    expect(casket.get(k2)).toEqual(v2);

    expect(new Casket().get(k)).toEqual(v);

    expect(casket.keys()).toEqual([k2, k]);
  });

  it('complicate get', () => {
    const casket = new Casket(1);
    expect(casket.get({ k2 })).toEqual({ k2: v2 });
    expect(casket.get(k2, k)).toEqual([v2, v]);
  });
});
