# casket.js

[![npm version](https://badgen.net/npm/v/casket.js)](https://www.npmjs.com/package/casket.js) [![travis build status](https://api.travis-ci.com/Hrysa/casket.js.svg?branch=master)](https://travis-ci.com/github/Hrysa/casket.js) [![codecov](https://codecov.io/gh/Hrysa/casket.js/branch/master/graph/badge.svg)](https://codecov.io/gh/Hrysa/casket.js)

a lightweight key-value store written in js

## installation

using yarn

```shell
yarn add casket.js
```

using npm

```
npm i casket.js
```

## usage

```typescript
const casket = new Casket();

// with no expires
casket.set('k', 'v');
casket.set('k2', 'v2');

// expires in 10 seconds
casket.exp(10);

// same as
casket.set('k', 'v', 10);

// no expires
casket.exp(0);

// get key
casket.get('k'); // result: v

// you can also get multi-key object or array like blow
casket.get({ foo: 'k', bar: 'k2' }); // result: { foo: 'v', bar: 'v2' }

casket.get('k', 'k2'); // result: ['v', 'v2']

// delete a key
casket.del('k');

// get casket size
casket.size();

// get all keys
casket.keys();

// truncate casket
casket.empty();

// create a casket with scope
new Casket(); // default: 0
new Casket(1);
new Casket(2);
```
