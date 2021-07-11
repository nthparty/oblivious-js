# oblivious-js
[![npm version](https://badge.fury.io/js/%40nthparty%2Foblivious.svg)](https://www.npmjs.com/package/@nthparty/oblivious)
[![GitHub Actions Status](https://github.com/nthparty/oblivious-js/workflows/Test%20Coveralls/badge.svg)](https://github.com/nthparty/oblivious-js/actions)
[![Coverage Status](https://coveralls.io/repos/github/nthparty/oblivious-js/badge.svg?branch=main)](https://coveralls.io/github/nthparty/oblivious-js?branch=main)

JavaScript library that serves as an API for common primitives used to implement OPRF and OT protocols.

Purpose
-------

This library provides TypeScript
[libsodium](https://github.com/jedisct1/libsodium) wrappers for
cryptographic primitives that are often used to implement [oblivious
pseudorandom function
(OPRF)](https://en.wikipedia.org/wiki/Pseudorandom_function_family) and
[oblivious transfer
(OT)](https://en.wikipedia.org/wiki/Oblivious_transfer) protocols.

For more information on the underlying mathematical structures and
primitives, consult materials about the
[Ed25519](https://ed25519.cr.yp.to/) system and the
[Ristretto](https://ristretto.group/) group.

Package Installation and Usage
------------------------------

The package is available on npm:

```shell
npm install @nthparty/oblivious
```

The library can be imported in the usual ways:

```JavaScript
const Oblivious = require('path/to/dist/oblivious.js');  // Standalone
const Oblivious = require('path/to/dist/oblivious.js')(sodium);  // Slim
const { Oblivious } = require('@nthparty/oblivious');  // Node.js

Oblivious.ready.then(function () {
    const p = Oblivious.Point.random();
    console.log(p);  // Point(32) [Uint8Array] [ ... ]
});
```

The latest browser-optimized distributions can be found [here](https://unpkg.com/browse/@nthparty/oblivious/dist/).

Testing and Conventions
-----------------------

All unit tests are executed and their coverage measured when using
[Jest](https://jestjs.io/) (see `jest.config.js` for configuration
details):
<!--
    mocha

Concise unit tests are implemented with the help of
[fountains](https://pypi.org/project/fountains/) and new reference bit
lists for these tests can be generated in the following way:-->

    npm test

Style conventions are enforced using [ESLint](https://eslint.org/):

```shell
eslint src test/oblivious.test.ts
# -OR-
npm run-script lint
```

Contributions
-------------

In order to contribute to the source code, open an issue or submit a
pull request on the GitHub page for this library.  Remember to run 
`npm run-script lint` on any proposed code changes.

Versioning
----------

Beginning with version 0.1.0, the version number format for this library
and the changes to the library associated with version number increments
conform with [Semantic Versioning 2.0.0](https://semver.org/#semantic-versioning-200).
