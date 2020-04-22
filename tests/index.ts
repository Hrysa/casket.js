import Casket from '../src';

describe('casket test', () => {
  it('init', () => {
    if (typeof localStorage === 'object') {
      localStorage.clear();
      expect(localStorage.length).toEqual(0);
    }
  });

  const k = 'K',
    v = 'V',
    k2 = 'K2',
    v2 = 'V2',
    casket = new Casket();

  it('create instance', () => {
    expect(casket instanceof Casket);
  });

  it('set get', () => {
    expect(casket.set(k, v)).toEqual(void 0);
    expect(casket.get(k)).toEqual(v);
  });

  it('set with 2s expires', () => {
    expect(casket.set(k, v, 2)).toEqual(void 0);
    expect(casket.get(k)).toEqual(v);
  });

  it('get after 1s', (done) => {
    setTimeout(() => {
      expect(casket.get(k)).toEqual(v);
      done();
    }, 1000);
  });

  it('get after 2.5s', (done) => {
    setTimeout(() => {
      expect(casket.get(k)).toEqual(null);
      done();
    }, 2500);
  });

  it('delete', () => {
    const casket = new Casket();
    casket.set(k, v);
    casket.del(k);
    expect(casket.get(k)).toEqual(null);

    casket.set(k, v);
    casket.set(k2, v2);
    casket.del(k, k2);
    expect(casket.get(k, k2)).toEqual([null, null]);
  });

  it('set expires time after create', () => {
    const casket = new Casket();
    casket.set(k, v);
    casket.exp(k, 1);

    setTimeout(() => {
      expect(casket.get(k)).toEqual(null);
    }, 1500);
  });

  it('use scope name', () => {
    const casket = new Casket(),
      casket2 = new Casket(1),
      casket3 = new Casket('M J');

    casket.set(k, v);
    casket2.set(k, v2);

    expect(casket.get(k)).toEqual(v);
    expect(casket2.get(k)).toEqual(v2);
    casket.empty();

    casket3.set(k, v);
    expect(casket3.get(k)).toEqual(v);
  });

  it('complicate get', () => {
    const casket = new Casket(1);
    casket.set(k, v);
    casket.set(k2, v2);

    expect(casket.get({ k2 })).toEqual({ k2: v2 });
    expect(casket.get(k2, k)).toEqual([v2, v]);
  });

  it('casket size', () => {
    expect(new Casket(1).size()).toEqual(2);
  });

  it('truncate casket', () => {
    const casket = new Casket(1);
    casket.set(k, v);
    casket.set(k2, v2);

    casket.empty();
    expect(casket.size()).toEqual(0);
  });
});
