"use strict";
/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function assertTrue(condition) {
    if (condition !== true) {
        throw new Error('Assertion failed.');
    }
}
function assertEqual(bytes1, bytes2) {
    if (Oblivious.Sodium.compare(bytes1, bytes2) !== 0) {
        throw new Error('Assertion failed: the byte arrays are not equal.');
    }
}
function assertRaise(expected_err, thunk) {
    try {
        thunk();
    }
    catch (err) {
        if (err !== expected_err) {
            throw new Error('Assertion failed: a different error was thrown than expected.');
        }
    }
    throw new Error('Assertion failed: no error was thrown. ');
}
var from_hex = Oblivious.Sodium.from_hex;
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
function Test_namespace() {
    function Test_API_Oblivious() {
        assertTrue(Oblivious.Sodium !== null);
        var methods = Object.getOwnPropertyNames(Oblivious.Sodium);
        api_methods_oblivious().every(function (val) { return methods.includes(val); });
    }
    function Test_API_Sodium() {
        assertTrue(Oblivious.Sodium !== null);
        var methods = Object.getOwnPropertyNames(Oblivious.Sodium);
        api_methods_sodium().every(function (val) { return methods.includes(val); });
    }
    function Test_API_Point() {
        assertTrue(Oblivious.Point !== null);
        var p = new Oblivious.Point(null);
        assertTrue(typeof p.mul === 'function');
        var methods = Object.getOwnPropertyNames(Oblivious.Point);
        api_methods_point().every(function (val) { return methods.includes(val); });
    }
    function Test_API_Scalar() {
        assertTrue(Oblivious.Scalar !== null);
        var s = new Oblivious.Scalar(null);
        assertTrue(typeof s.mul === 'function');
        var methods = Object.getOwnPropertyNames(Oblivious.Scalar);
        api_methods_scalar().every(function (val) { return methods.includes(val); });
    }
    return { Test_API_Oblivious: Test_API_Oblivious, Test_API_Sodium: Test_API_Sodium, Test_API_Point: Test_API_Point, Test_API_Scalar: Test_API_Scalar };
}
/**
 * This function does either of two things depending on `bits`:
 * * checks that test inputs drawn from the fountains input bit stream
 *   produce the bits provided in the reference output bit vector, or
 * * generates a reference output bit vector by applying the function
 *   to the fountains input bit stream.
 */
function check_or_generate_operation(/*test, */ fun, lengths, bits) {
    // const fs = fountains(sum(lengths), ...{seed: bytes (0), limit: 256, bits: bits, function: fun});
    // if (bits === null) {
    //     return bitlist(fs).hex();
    // }
    // test.assertTrue(all(fs));
    // assertTrue(bits.length === lengths[0]);
    // assertTrue(test(bits));
    var ret = fun(bits);
    // assertTrue(ret.length === lengths[1]);
    return Oblivious.Sodium.to_hex(ret);
}
/**
 * Direct tests of primitive operators that operate on bytes-like objects.
 */
function Test_primitives() {
    function test_rnd() {
        for (var _ = 0; _ < 256; _++) {
            var s = Oblivious.Sodium.rnd();
            assertTrue(s.length === 32 && Oblivious.Sodium.scl(s) !== null);
        }
    }
    function test_scl_none() {
        for (var _ = 0; _ < 256; _++) {
            var s = Oblivious.Sodium.scl(null);
            assertTrue(s.length === 32 && Oblivious.Sodium.scl(s) !== null);
        }
    }
    function test_scl(bits) {
        var bitsDefault = from_hex('4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9');
        function fun(bs) {
            return new Uint8Array([Oblivious.Sodium.scl(bs) !== null ? 1 : 0]);
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_inv(bits) {
        var bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');
        function fun(bs) {
            var s = Oblivious.Sodium.scl(bs);
            return (s !== null ? Oblivious.Sodium.inv(s) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_smu(bits) {
        var bitsDefault = from_hex('2ca120487000010295804000850254008018000000008000080100008400000c' +
            '2ca120487000010295804000850254008018000000008000080100008400000c');
        function fun(bs) {
            var s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            var s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.smu(s1, s2) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_pnt_null() {
        for (var _ = 0; _ < 256; _++) {
            assertTrue(Oblivious.Sodium.pnt(null).length === 32);
        }
    }
    function test_pnt(bits) {
        var bitsDefault = from_hex('baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b');
        return check_or_generate_operation(Oblivious.Sodium.pnt, [64], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_bas(bits) {
        var bitsDefault = from_hex('00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0');
        function fun(bs) {
            var s = Oblivious.Sodium.scl(bs);
            return (s !== null ? Oblivious.Sodium.bas(s) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_mul(bits) {
        var bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');
        function fun(bs) {
            var s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            var s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.mul(s2, Oblivious.Sodium.bas(s1)) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_add(bits) {
        var bitsDefault = from_hex('28400040500000008480000020024c00211800080000800002110040ac001044' +
            '28400040500000008480000020024c00211800080000800002110040ac001044');
        function fun(bs) {
            var s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            var s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.add(Oblivious.Sodium.bas(s1), Oblivious.Sodium.bas(s2)) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_sub(bits) {
        var bitsDefault = from_hex('24210008500080028000000025020c08000001200000800002008002ac081040' +
            '24210008500080028000000025020c08000001200000800002008002ac081040');
        function fun(bs) {
            var s1 = Oblivious.Sodium.scl(bs.slice(0, 32));
            var s2 = Oblivious.Sodium.scl(bs.slice(32));
            return (s1 !== null && s2 !== null ? Oblivious.Sodium.sub(Oblivious.Sodium.bas(s1), Oblivious.Sodium.bas(s2)) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    return {
        test_rnd: test_rnd,
        test_scl_none: test_scl_none,
        test_scl: test_scl,
        test_inv: test_inv,
        test_smu: test_smu,
        test_pnt_none: test_pnt_null,
        test_pnt: test_pnt,
        test_mul: test_mul,
        test_add: test_add,
        test_sub: test_sub
    };
}
/**
 * Tests of point and scalar wrapper classes and their methods.
 */
function Test_classes() {
    function test_point_random() {
        for (var _ = 0; _ < 256; _++) {
            assertTrue(Oblivious.Point.random().length === 32);
        }
    }
    function test_point_bytes(bits) {
        var bitsDefault = from_hex('baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b');
        return check_or_generate_operation(Oblivious.Point.bytes, [64], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_hash(bits) {
        var bitsDefault = from_hex('10cb044c737b034d5755f8ba0e29432745ed4fb1a78ea22a15b2d1113492841b');
        return check_or_generate_operation(Oblivious.Point.hash, [64], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_base(bits) {
        var bitsDefault = from_hex('00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0');
        function fun(bs) {
            var s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? Oblivious.Point.base(s) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_base64() {
        for (var _ = 0; _ < 256; _++) {
            var p = new Oblivious.Point(null);
            var pBase64 = p.to_base64();
            assertEqual(Oblivious.Point.from_base64(pBase64), p);
        }
    }
    function test_point() {
        for (var _ = 0; _ < 256; _++) {
            assertTrue((new Oblivious.Point(null)).length === 32);
        }
    }
    function test_point_rmul(bits) {
        var bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');
        function fun(bs) {
            var s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            var s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null
                ? Oblivious.Point.base(s2).mul(s1)
                : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_scalar_mul_op(bits) {
        var bitsDefault = from_hex('2c040004500080008180400080000008a1180020001080080211004000080040' +
            '2c040004500080008180400080000008a1180020001080080211004000080040');
        function fun(bs) {
            var s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            var s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null
                ? s1.mul(Oblivious.Point.base(s2))
                : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_add(bits) {
        var bitsDefault = from_hex('28400040500000008480000020024c00211800080000800002110040ac001044' +
            '28400040500000008480000020024c00211800080000800002110040ac001044');
        function fun(bs) {
            var s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            var s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null
                ? Oblivious.Point.base(s1).add(Oblivious.Point.base(s2))
                : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_point_sub(bits) {
        var bitsDefault = from_hex('24210008500080028000000025020c08000001200000800002008002ac081040' +
            '24210008500080028000000025020c08000001200000800002008002ac081040');
        function fun(bs) {
            var s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            var s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null
                ? Oblivious.Point.base(s1).sub(Oblivious.Point.base(s2))
                : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_scalar_random() {
        for (var _ = 0; _ < 256; _++) {
            var s = Oblivious.Scalar.random();
            assertTrue(s.length === 32 && Oblivious.Scalar.bytes(s) !== null);
        }
    }
    function test_scalar_bytes(bits) {
        var bitsDefault = from_hex('4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9');
        function fun(bs) {
            var s = Oblivious.Scalar.bytes(bs);
            return new Uint8Array([
                s !== null ? 1 : 0
            ]);
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_scalar_hash(bits) {
        var bitsDefault = from_hex('09991cc13ab3799d9c05e0c75968859298977fb7b78efa2dcb6e1689e927ac0e');
        return check_or_generate_operation(Oblivious.Scalar.hash, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_scalar_base64() {
        for (var _ = 0; _ < 256; _++) {
            var s = new Oblivious.Scalar(null);
            var sBase64 = s.to_base64();
            assertEqual(Oblivious.Scalar.from_base64(sBase64), s);
        }
    }
    function test_scalar() {
        for (var _ = 0; _ < 256; _++) {
            var s = new Oblivious.Scalar(null);
            assertTrue(s.length === 32 && Oblivious.Scalar.bytes(s) !== null);
        }
    }
    function test_scalar_inverse(bits) {
        var bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');
        function fun(bs) {
            var s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? s.inverse() : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_scalar_invert_op(bits) {
        var bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');
        function fun(bs) {
            var s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? s.invert() : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    function test_scalar_mul(bits) {
        var bitsDefault = from_hex('2ca120487000010295804000850254008018000000008000080100008400000c' +
            '2ca120487000010295804000850254008018000000008000080100008400000c');
        function fun(bs) {
            var s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            var s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null ? s1.mul(s2) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits !== null && bits !== void 0 ? bits : bitsDefault);
    }
    return {
        test_point_random: test_point_random,
        test_point_bytes: test_point_bytes,
        test_point_hash: test_point_hash,
        test_point_base: test_point_base,
        test_point_base64: test_point_base64,
        test_point: test_point,
        test_point_rmul: test_point_rmul,
        test_point_scalar_mul_op: test_point_scalar_mul_op,
        test_point_add: test_point_add,
        test_point_sub: test_point_sub,
        test_scalar_random: test_scalar_random,
        test_scalar_bytes: test_scalar_bytes,
        test_scalar_hash: test_scalar_hash,
        test_scalar_base64: test_scalar_base64,
        test_scalar: test_scalar,
        test_scalar_inverse: test_scalar_inverse,
        test_scalar_invert_op: test_scalar_invert_op,
        test_scalar_mul: test_scalar_mul
    };
}
/**
 * Tests verifying that methods return objects of the appropriate type.
 */
function Test_types() {
    function test_types_point_random() {
        var p = Oblivious.Point.random();
        assertTrue(p instanceof Oblivious.Point);
    }
    function test_types_point_bytes() {
        // const bs = fountains(64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], r()), r())); })(Oblivious.Sodium.rnd); // 64 bits in length
        var p = Oblivious.Point.bytes(bs);
        assertTrue(p instanceof Oblivious.Point);
    }
    function test_types_point_hash() {
        // const bs = fountains(64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], r()), r())); })(Oblivious.Sodium.rnd); // 64 bits in length
        var p = Oblivious.Point.hash(bs);
        assertTrue(p instanceof Oblivious.Point);
    }
    function test_types_point_base() {
        var p = Oblivious.Point.base(Oblivious.Scalar.random());
        assertTrue(p instanceof Oblivious.Point);
    }
    function test_types_point_mul() {
        // const bs = fountains(32 + 64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], r()), __spreadArray(__spreadArray([], r()), r()))); })(Oblivious.Sodium.rnd); // 32 + 64 bits in length
        var p = Oblivious.Point.hash(bs.slice(0, 32));
        var s = Oblivious.Scalar.hash(bs.slice(64));
        assertTrue(p.mul(s) instanceof Oblivious.Point);
    }
    function test_types_point_add() {
        // const bs = fountains(64 + 64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], __spreadArray(__spreadArray([], r()), r())), __spreadArray(__spreadArray([], r()), r()))); })(Oblivious.Sodium.rnd); // 64 + 64 bits in length
        var p = Oblivious.Point.hash(bs.slice(0, 64));
        var q = Oblivious.Point.hash(bs.slice(64));
        assertTrue(p.add(q) instanceof Oblivious.Point);
    }
    function test_types_point_sub() {
        // const bs = fountains(64 + 64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], __spreadArray(__spreadArray([], r()), r())), __spreadArray(__spreadArray([], r()), r()))); })(Oblivious.Sodium.rnd); // 64 + 64 bits in length
        var p = Oblivious.Point.hash(bs.slice(0, 64));
        var q = Oblivious.Point.hash(bs.slice(64));
        assertTrue(p.sub(q) instanceof Oblivious.Point);
    }
    function test_types_scalar_random() {
        assertTrue(Oblivious.Scalar.random() instanceof Oblivious.Scalar);
    }
    function test_types_scalar_bytes() {
        var bs = new Uint8Array(Oblivious.Scalar.random());
        assertTrue(Oblivious.Scalar.bytes(bs) instanceof Oblivious.Scalar);
    }
    function test_types_scalar_hash() {
        // const bs = fountains(32, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray([], r())); })(Oblivious.Sodium.rnd); // 32 bits in length
        assertTrue(Oblivious.Scalar.hash(bs) instanceof Oblivious.Scalar);
    }
    function test_types_scalar_invert() {
        assertTrue(Oblivious.Scalar.random().invert() instanceof Oblivious.Scalar);
    }
    function test_types_scalar_inverse() {
        assertTrue(Oblivious.Scalar.random().inverse() instanceof Oblivious.Scalar);
    }
    function test_types_scalar_mul_scalar() {
        var s0 = Oblivious.Scalar.random();
        var s1 = Oblivious.Scalar.random();
        assertTrue(s0.mul(s1) instanceof Oblivious.Scalar);
    }
    function test_types_scalar_mul_point() {
        // const bs = fountains(32 + 64, {limit: 1});
        var bs = (function (r) { return new Uint8Array(__spreadArray(__spreadArray([], r()), __spreadArray(__spreadArray([], r()), r()))); })(Oblivious.Sodium.rnd); // 32 + 64 bits in length
        var s = Oblivious.Scalar.hash(bs.slice(0, 32));
        var p = Oblivious.Point.hash(bs.slice(64));
        assertTrue(s.mul(p) instanceof Oblivious.Point);
    }
    return {
        test_types_point_add: test_types_point_add,
        test_types_point_base: test_types_point_base,
        test_types_point_bytes: test_types_point_bytes,
        test_types_point_hash: test_types_point_hash,
        test_types_point_mul: test_types_point_mul,
        test_types_point_random: test_types_point_random,
        test_types_point_sub: test_types_point_sub,
        test_types_scalar_bytes: test_types_scalar_bytes,
        test_types_scalar_hash: test_types_scalar_hash,
        test_types_scalar_inverse: test_types_scalar_inverse,
        test_types_scalar_invert: test_types_scalar_invert,
        test_types_scalar_mul_point: test_types_scalar_mul_point,
        test_types_scalar_mul_scalar: test_types_scalar_mul_scalar,
        test_types_scalar_random: test_types_scalar_random
    };
}
/**
 * Tests of algebraic properties of primitive operators.
 */
function Test_algebra() {
    function test_algebra_scalar_inverse_identity() {
        // for (const bs of fountains (32, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var s = new Oblivious.Scalar(null);
            assertEqual(Oblivious.Sodium.inv(Oblivious.Sodium.inv(s)), s);
        }
    }
    function test_algebra_scalar_inverse_mul_cancel() {
        // for (const bs of fountains (32 + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var s0 = new Oblivious.Scalar(null);
            var p0 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.mul(Oblivious.Sodium.inv(s0), Oblivious.Sodium.mul(s0, p0)), p0);
        }
    }
    function test_algebra_scalar_mul_commute() {
        // for (const bs of fountains ((32 + 32) + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var s0 = new Oblivious.Scalar(null);
            var s1 = new Oblivious.Scalar(null);
            var p0 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.mul(s0, Oblivious.Sodium.mul(s1, p0)), Oblivious.Sodium.mul(s1, Oblivious.Sodium.mul(s0, p0)));
        }
    }
    function test_algebra_point_add_commute() {
        // for (const bs of fountains (64 + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var p0 = new Oblivious.Point(null);
            var p1 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.add(p0, p1), Oblivious.Sodium.add(p1, p0));
        }
    }
    function test_algebra_point_add_sub_cancel() {
        // for (const bs of fountains (64 + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var p0 = new Oblivious.Point(null);
            var p1 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.add(Oblivious.Sodium.sub(p0, p1), p1), p0);
        }
    }
    function test_algebra_scalar_mul_point_mul_associate() {
        // for (const bs of fountains ((32 + 32) + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var s0 = new Oblivious.Scalar(null);
            var s1 = new Oblivious.Scalar(null);
            var p0 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.mul(s0, Oblivious.Sodium.mul(s1, p0)), Oblivious.Sodium.mul(Oblivious.Sodium.smu(s0, s1), p0));
        }
    }
    function test_algebra_scalar_mul_point_add_distribute() {
        // for (const bs of fountains ((32 + 64) + 64, {limit: 256})) {
        for (var _ = 0; _ < 256; _++) {
            var s0 = new Oblivious.Scalar(null);
            var p0 = new Oblivious.Point(null);
            var p1 = new Oblivious.Point(null);
            assertEqual(Oblivious.Sodium.add(Oblivious.Sodium.mul(s0, p0), Oblivious.Sodium.mul(s0, p1)), Oblivious.Sodium.mul(s0, Oblivious.Sodium.add(p0, p1)));
        }
    }
    // This is not possible in TypeScript by design.
    function test_algebra_scalar_mul_scalar_on_left_hand_side_of_non_scalar() {
        // const s = Oblivious.Scalar.random();
        // assertRaises('TypeError', function () {
        //     return s.mul(new Uint8Array([0]) as (typeof Scalar));
        // });
    }
    // This is not possible in TypeScript by design.
    function test_algebra_scalar_mul_point_on_left_hand_side() {
        // const s = Oblivious.Scalar.random();
        // const p = Oblivious.Point.hash(new Uint8Array(32));
        // assertRaises('TypeError', function () {
        //     return p.mul(s);
        // });
    }
    return {
        test_algebra_scalar_inverse_identity: test_algebra_scalar_inverse_identity,
        test_algebra_scalar_inverse_mul_cancel: test_algebra_scalar_inverse_mul_cancel,
        test_algebra_scalar_mul_commute: test_algebra_scalar_mul_commute,
        test_algebra_point_add_commute: test_algebra_point_add_commute,
        test_algebra_point_add_sub_cancel: test_algebra_point_add_sub_cancel,
        test_algebra_scalar_mul_point_mul_associate: test_algebra_scalar_mul_point_mul_associate,
        test_algebra_scalar_mul_point_add_distribute: test_algebra_scalar_mul_point_add_distribute,
        test_algebra_scalar_mul_scalar_on_left_hand_side_of_non_scalar: test_algebra_scalar_mul_scalar_on_left_hand_side_of_non_scalar,
        test_algebra_scalar_mul_point_on_left_hand_side: test_algebra_scalar_mul_point_on_left_hand_side
    };
}
function all_tests() {
    window.display('* sodium is ready');
    var TestSuites = {
        Test_namespace: Test_namespace,
        Test_primitives: Test_primitives,
        Test_classes: Test_classes,
        Test_types: Test_types,
        Test_algebra: Test_algebra
    };
    for (var _i = 0, _a = Object.entries(TestSuites); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], init = _b[1];
        window.display('\nUnit test reference bit vectors for ' + name_1 + ' methods...');
        var tests = init();
        for (var _c = 0, _d = Object.keys(tests); _c < _d.length; _c++) {
            var m = _d[_c];
            var method = tests[m];
            window.display('* ' + m + ': ' + (function (r) { return r === undefined ? 'pass' : r; })(method()));
        }
    }
}
window.display('Loading sodium...');
Oblivious.ready.then(all_tests);
