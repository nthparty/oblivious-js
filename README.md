# oblivious-js
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

<!--
Package Installation and Usage
------------------------------

The package is available on PyPI:

    npm install oblivious

The library can be imported in the usual ways:

    import oblivious
    from oblivious import *
-->

Testing<!-- and Conventions-->
-----------------------

<!--All unit tests are executed and their coverage is measured when using
[mocha](https://mochajs.org/) (see `setup.cfg` for configution
details):

    mocha

Concise unit tests are implemented with the help of
[fountains](https://pypi.org/project/fountains/) and new reference bit
lists for these tests can be generated in the following way:-->

    ts-node test/test_oblivious.ts

<!--Style conventions are enforced using [Pylint](https://www.pylint.org/):

    pylint oblivious test/test_oblivious
-->

Contributions
-------------

In order to contribute to the source code, open an issue or submit a
pull request on the GitHub page for this library.

Versioning
----------

Beginning with version 0.1.0, the version number format for this library
and the changes to the library associated with version number increments
conform with [Semantic Versioning
2.0.0](https://semver.org/#semantic-versioning-200).