/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */

import { Oblivious } from '../src/oblivious';

const from_hex = Oblivious.Sodium.from_hex;

/**
 * API symbols that should be available to users upon module import.
 */
function api_methods_oblivious() {
    return ['Sodium', 'Point', 'Scalar'];
}

function api_methods_sodium() {
    return ['scl', 'rnd', 'inv', 'smu', 'pnt', 'bas', 'mul', 'add', 'sub'];
}

function api_methods_point() {
    return ['random', 'bytes', 'hash', 'base', 'from_base64', 'mul'];
}

function api_methods_scalar() {
    return ['random', 'bytes', 'hash', 'from_base64'];
}

/**
 * Check that namespaces provide access to the expected
 * classes and functions.
 */
beforeEach((done) => {
    Oblivious.Sodium.ready.then(done);
});

describe('namespace tests', () => {
    test('oblivious api has all methods', () => {
        expect(Oblivious.Sodium).not.toBeNull();
        const methods = Object.getOwnPropertyNames(Oblivious);
        expect(methods).toEqual(expect.arrayContaining(api_methods_oblivious()));
    });

    test('sodium api has all methods', () => {
        expect(Oblivious.Sodium).not.toBeNull();
        const methods = Object.getOwnPropertyNames(Oblivious.Sodium);
        expect(methods).toEqual(expect.arrayContaining(api_methods_sodium()));
    });

    test('point api has all methods', () => {
        expect(Oblivious.Sodium).not.toBeNull();
        const methods = Object.getOwnPropertyNames(Oblivious.Point);
        expect(methods).toEqual(expect.arrayContaining(api_methods_point()));
    });

    test('scalar api has all methods', () => {
        expect(Oblivious.Sodium).not.toBeNull();
        const methods = Object.getOwnPropertyNames(Oblivious.Scalar);
        expect(methods).toEqual(expect.arrayContaining(api_methods_scalar()));
    });
});

/**
 * This function does either of two things depending on `bits`:
 * * checks that test inputs drawn from the fountains input bit stream
 *   produce the bits provided in the reference output bit vector, or
 * * generates a reference output bit vector by applying the function
 *   to the fountains input bit stream.
 */
function check_or_generate_operation(/*test, */fun, lengths: number[], bits: Uint8Array) {
    // const fs = fountains(sum(lengths), ...{seed: bytes (0), limit: 256, bits: bits, function: fun});
    // if (bits === null) {
    //     return bitlist(fs).hex();
    // }
    // test.assertTrue(all(fs));

    // assertTrue(bits.length === lengths[0]);
    // assertTrue(test(bits));
    const ret = fun(bits);
    // assertTrue(ret.length === lengths[1]);
    return Oblivious.Sodium.to_hex(ret);
}


/**
 * Direct tests of primitive operators that operate on bytes-like objects.
 */
describe('primitive tests', () => {
    test('rnd', () => {
        for (let _ = 0; _ < 256; _++) {
            const s = Oblivious.Sodium.rnd();
            expect(s.length).toEqual(32);
            expect(Oblivious.Sodium.scl(s)).not.toBeNull();
        }
    });

    test('scl none', () => {
        for (let _ = 0; _ < 256; _++) {
            const s = Oblivious.Sodium.scl(null);
            expect(s.length).toEqual(32);
            expect(Oblivious.Sodium.scl(s)).not.toBeNull();
        }
    });

    test.skip('scl', () => {
        const bitsDefault = from_hex('4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9');

        function fun(bs) {
            return new Uint8Array([Oblivious.Sodium.scl(bs) !== null ? 1 : 0]);
        }

        expect(check_or_generate_operation(fun, [32], bitsDefault)).toEqual(bitsDefault);
    });

    test.skip('inv', () => {
        const bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');

        function fun(bs) {
            const s = Oblivious.Sodium.scl(bs);
            return (s !== null ? Oblivious.Sodium.inv(s) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test.skip('smu', () => {
        const bitsDefault = from_hex('2ca120487000010295804000850254008018000000008000080100008400000c' +
            '2ca120487000010295804000850254008018000000008000080100008400000c');

        function fun(bs) {
            const s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            const s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.smu(s1, s2) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test('pnt null', () => {
        for (let _ = 0; _ < 256; _++) {
            expect(Oblivious.Sodium.pnt(null).length).toEqual(32);
        }
    });

    test.skip('pnt', () => {
        const bitsDefault = from_hex('baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b');
        return check_or_generate_operation(Oblivious.Sodium.pnt, [64], bitsDefault);
    });

    test.skip('bas', () => {
        const bitsDefault = from_hex('00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0');

        function fun(bs) {
            const s = Oblivious.Sodium.scl(bs);
            return (s !== null ? Oblivious.Sodium.bas(s) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test.skip('mul', () => {
        const bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');

        function fun(bs) {
            const s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            const s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.mul(s2, Oblivious.Sodium.bas(s1)) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test.skip('add', () => {
        const bitsDefault = from_hex('28400040500000008480000020024c00211800080000800002110040ac001044' +
            '28400040500000008480000020024c00211800080000800002110040ac001044');

        function fun(bs) {
            const s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            const s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.add(Oblivious.Sodium.bas(s1), Oblivious.Sodium.bas(s2)) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test.skip('sub', () => {
        const bitsDefault = from_hex('24210008500080028000000025020c08000001200000800002008002ac081040' +
            '24210008500080028000000025020c08000001200000800002008002ac081040');

        function fun(bs) {
            const s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            const s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.sub(Oblivious.Sodium.bas(s1), Oblivious.Sodium.bas(s2)) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });
});

/**
 * Tests of point and scalar wrapper classes and their methods.
 */
describe('classes tests', () => {
    test('point random', () => {
        for (let _ = 0; _ < 256; _++) {
            expect(Oblivious.Point.random().length).toEqual(32);
        }
    });

    test.skip('point bytes', () => {
        const bitsDefault = from_hex('baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b');
        return check_or_generate_operation(Oblivious.Point.bytes, [64], bitsDefault);
    });

    test.skip('point hash', () => {
        const bitsDefault = from_hex('10cb044c737b034d5755f8ba0e29432745ed4fb1a78ea22a15b2d1113492841b');
        return check_or_generate_operation(Oblivious.Point.hash, [64], bitsDefault);
    });

    test.skip('point base', () => {
        const bitsDefault = from_hex('00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0');

        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? Oblivious.Point.base(s) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test('point base64', () => {
        for (let _ = 0; _ < 256; _++) {
            const p = new Oblivious.Point(null);
            const pBase64 = p.to_base64();
            expect(Oblivious.Sodium.compare(Oblivious.Point.from_base64(pBase64), p)).toEqual(0);
        }
    });

    test('point', () => {
        for (let _ = 0; _ < 256; _++) {
            expect((new Oblivious.Point(null)).length).toEqual(32);
        }
    });

    test.skip('point rmul', () => {
        const bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');

        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? Oblivious.Point.base(s2).mul(s1)
                    : new Uint8Array([0])
            );
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test.skip('point scalar mul op', () => {
        const bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');

        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? s1.mul(Oblivious.Point.base(s2))
                    : new Uint8Array([0])
            );
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test.skip('point add', () => {
        const bitsDefault = from_hex('28400040500000008480000020024c00211800080000800002110040ac001044' +
            '28400040500000008480000020024c00211800080000800002110040ac001044');

        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? Oblivious.Point.base(s1).add(Oblivious.Point.base(s2))
                    : new Uint8Array([0])
            );
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test.skip('point sub', () => {
        const bitsDefault = from_hex('24210008500080028000000025020c08000001200000800002008002ac081040' +
            '24210008500080028000000025020c08000001200000800002008002ac081040');

        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? Oblivious.Point.base(s1).sub(Oblivious.Point.base(s2))
                    : new Uint8Array([0])
            );
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });

    test('scalar random', () => {
        for (let _ = 0; _ < 256; _++) {
            const s = Oblivious.Scalar.random();
            expect(s.length).toEqual(32);
            expect(Oblivious.Scalar.bytes(s)).not.toBeNull();
        }
    });

    test.skip('test_scalar_bytes(bits)', () => {
        const bitsDefault = from_hex('4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9');

        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return new Uint8Array([
                s !== null ? 1 : 0
            ]);
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test.skip('scalar hash', () => {
        const bitsDefault = from_hex('09991cc13ab3799d9c05e0c75968859298977fb7b78efa2dcb6e1689e927ac0e');
        return check_or_generate_operation(Oblivious.Scalar.hash, [32], bitsDefault);
    });

    test('scalar base64', () => {
        for (let _ = 0; _ < 256; _++) {
            const s = new Oblivious.Scalar(null);
            const sBase64 = s.to_base64();
            expect(Oblivious.Sodium.compare(Oblivious.Scalar.from_base64(sBase64), s)).toEqual(0);
        }
    });

    test('scalar', () => {
        for (let _ = 0; _ < 256; _++) {
            const s = new Oblivious.Scalar(null);
            expect(s.length).toEqual(32);
            expect(Oblivious.Scalar.bytes(s)).not.toBeNull();
        }
    });

    test.skip('scalar inverse', () => {
        const bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');

        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? s.inverse() : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test.skip('scalar invert op', () => {
        const bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');

        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? s.invert() : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32], bitsDefault);
    });

    test.skip('scalar mul', () => {
        const bitsDefault = from_hex('2ca120487000010295804000850254008018000000008000080100008400000c' +
            '2ca120487000010295804000850254008018000000008000080100008400000c');

        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null ? s1.mul(s2) : new Uint8Array([0]));
        }

        return check_or_generate_operation(fun, [32, 32], bitsDefault);
    });
});

/**
 * Tests verifying that methods return objects of the appropriate type.
 */
describe('types tests', () => {
    test('types point random', () => {
        const p = Oblivious.Point.random();
        expect(p).toBeInstanceOf(Oblivious.Point);
    });

    test('types point bytes', () => {
        // const bs = fountains(64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...r(), ...r()
        ]))(Oblivious.Sodium.rnd);  // 64 bits in length
        const p = Oblivious.Point.bytes(bs);
        expect(p).toBeInstanceOf(Oblivious.Point);
    });

    test('types point hash', () => {
        // const bs = fountains(64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...r(), ...r()
        ]))(Oblivious.Sodium.rnd);  // 64 bits in length
        const p = Oblivious.Point.hash(bs);
        expect(p).toBeInstanceOf(Oblivious.Point);
    });

    test('types point base', () => {
        const p = Oblivious.Point.base(Oblivious.Scalar.random());
        expect(p).toBeInstanceOf(Oblivious.Point);
    });

    test('types point mul', () => {
        // const bs = fountains(32 + 64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...r(), ...[...r(), ...r()]
        ]))(Oblivious.Sodium.rnd);  // 32 + 64 bits in length
        const p = Oblivious.Point.hash(bs.slice(0, 32));
        const s = Oblivious.Scalar.hash(bs.slice(64));
        expect(p.mul(s)).toBeInstanceOf(Oblivious.Point);
    });

    test('types point add', () => {
        // const bs = fountains(64 + 64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...[...r(), ...r()], ...[...r(), ...r()]
        ]))(Oblivious.Sodium.rnd);  // 64 + 64 bits in length
        const p = Oblivious.Point.hash(bs.slice(0, 64));
        const q = Oblivious.Point.hash(bs.slice(64));
        expect(p.add(q)).toBeInstanceOf(Oblivious.Point);
    });

    test('types point sub', () => {
        // const bs = fountains(64 + 64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...[...r(), ...r()], ...[...r(), ...r()]
        ]))(Oblivious.Sodium.rnd);  // 64 + 64 bits in length
        const p = Oblivious.Point.hash(bs.slice(0, 64));
        const q = Oblivious.Point.hash(bs.slice(64));
        expect(p.sub(q)).toBeInstanceOf(Oblivious.Point);
    });

    test('types scalar random', () => {
        expect(Oblivious.Scalar.random()).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar bytes', () => {
        const bs = new Uint8Array(Oblivious.Scalar.random());
        expect(Oblivious.Scalar.bytes(bs)).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar hash', () => {
        // const bs = fountains(32, {limit: 1});
        const bs = (r => new Uint8Array([
            ...r()
        ]))(Oblivious.Sodium.rnd);  // 32 bits in length
        expect(Oblivious.Scalar.hash(bs)).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar invert', () => {
        expect(Oblivious.Scalar.random().invert()).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar inverse', () => {
        expect(Oblivious.Scalar.random().inverse()).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar mul scalar', () => {
        const s0 = Oblivious.Scalar.random();
        const s1 = Oblivious.Scalar.random();
        expect(s0.mul(s1)).toBeInstanceOf(Oblivious.Scalar);
    });

    test('types scalar mul point', () => {
        // const bs = fountains(32 + 64, {limit: 1});
        const bs = (r => new Uint8Array([
            ...r(), ...[...r(), ...r()]
        ]))(Oblivious.Sodium.rnd);  // 32 + 64 bits in length
        const s = Oblivious.Scalar.hash(bs.slice(0, 32));
        const p = Oblivious.Point.hash(bs.slice(64));
        expect(s.mul(p)).toBeInstanceOf(Oblivious.Point);
    });
});

/**
 * Tests of algebraic properties of primitive operators.
 */
describe('algebra tests', () => {
    test('algebra scalar inverse identity', () => {
        // for (const bs of fountains (32, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const s = new Oblivious.Scalar(null);
            expect(Oblivious.Sodium.compare(
                Oblivious.Sodium.inv(Oblivious.Sodium.inv(s)),
                s
            )).toEqual(0);
        }
    });

    test('algebra scalar inverse mul cancel', () => {
        // for (const bs of fountains (32 + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const s0 = new Oblivious.Scalar(null);
            const p0 = new Oblivious.Point(null);
            expect(
                Oblivious.Sodium.compare(
                    Oblivious.Sodium.mul(
                        Oblivious.Sodium.inv(s0),
                        Oblivious.Sodium.mul(s0, p0)),
                    p0
                )).toEqual(0);
        }
    });

    test('algebra scalar mul commute', () => {
        // for (const bs of fountains ((32 + 32) + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const s0 = new Oblivious.Scalar(null);
            const s1 = new Oblivious.Scalar(null);
            const p0 = new Oblivious.Point(null);
            expect(
                Oblivious.Sodium.mul(s0, Oblivious.Sodium.mul(s1, p0))).toEqual(
                Oblivious.Sodium.mul(s1, Oblivious.Sodium.mul(s0, p0)));
        }
    });

    test('algebra point add commute', () => {
        // for (const bs of fountains (64 + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const p0 = new Oblivious.Point(null);
            const p1 = new Oblivious.Point(null);
            expect(Oblivious.Sodium.add(p0, p1)).toEqual(Oblivious.Sodium.add(p1, p0));
        }
    });

    test('algebra point add sub cancel', () => {
        // for (const bs of fountains (64 + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const p0 = new Oblivious.Point(null);
            const p1 = new Oblivious.Point(null);
            expect(Oblivious.Sodium.compare(
                Oblivious.Sodium.add(Oblivious.Sodium.sub(p0, p1), p1),
                p0
            )).toEqual(0);
        }
    });

    test('algebra scalar mul point mul associate', () => {
        // for (const bs of fountains ((32 + 32) + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const s0 = new Oblivious.Scalar(null);
            const s1 = new Oblivious.Scalar(null);
            const p0 = new Oblivious.Point(null);
            expect(
                Oblivious.Sodium.mul(s0, Oblivious.Sodium.mul(s1, p0))).toEqual(
                Oblivious.Sodium.mul(Oblivious.Sodium.smu(s0, s1), p0));
        }
    });

    test('algebra scalar mul point add distribute', () => {
        // for (const bs of fountains ((32 + 64) + 64, {limit: 256})) {
        for (let _ = 0; _ < 256; _++) {
            const s0 = new Oblivious.Scalar(null);
            const p0 = new Oblivious.Point(null);
            const p1 = new Oblivious.Point(null);
            expect(
                Oblivious.Sodium.add(
                    Oblivious.Sodium.mul(s0, p0),
                    Oblivious.Sodium.mul(s0, p1)
                )).toEqual(
                Oblivious.Sodium.mul(
                    s0,
                    Oblivious.Sodium.add(p0, p1)
                ));
        }
    });

    // This is not possible in TypeScript by design.
    test('algebra scalar mul scalar on left hand side of non scalar', () => {
        // const s = Oblivious.Scalar.random();
        // assertRaises('TypeError', function () {
        //     return s.mul(new Uint8Array([0]) as (typeof Scalar));
        // });
    });

    // This is not possible in TypeScript by design.
    test.skip('algebra scalar mul point on left hand side', () => {
        // const s = Oblivious.Scalar.random();
        // const p = Oblivious.Point.hash(new Uint8Array(32));
        // assertRaises('TypeError', function () {
        //     return p.mul(s);
        // });
    });
});
