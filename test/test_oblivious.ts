/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */

import { Oblivious } from "../src/oblivious";

function assertTrue(condition: boolean): asserts condition {
    if (condition !== true) {
        throw new Error('Assertion failed.');
    }
}

function assertEqual(bytes1: Uint8Array, bytes2: Uint8Array): asserts bytes1 {
    if (Oblivious.Sodium.compare(bytes1, bytes2) !== 0) {
        throw new Error('Assertion failed: the byte arrays are not equal.');
    }
}

const from_hex = Oblivious.Sodium.from_hex;

/**
 * API symbols that should be available to users upon module import.
 */
function api_methods() {
    return ['point', 'scalar', 'scl', 'rnd', 'inv', 'smu', 'pnt', 'bas', 'mul', 'add', 'sub'];
}

/**
 * Check that namespaces provide access to the expected
 * classes and functions.
 */
function Test_namespace() {
    if (Oblivious.Sodium !== null) {
        console.log(Object.keys(Oblivious.Sodium));
        console.log(api_methods());
    }
    if (Oblivious.Point !== null) {
        console.log(Object.keys(Oblivious.Point));
        // console.log(api_methods());
    }
    if (Oblivious.Scalar !== null) {
        console.log(Object.keys(Oblivious.Scalar));
        // console.log(api_methods());
    }
}

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
function Test_primitives() {
//     function test_rnd() {
//         for (let _:number = 0; _ < 256; _++) {
//             const s = Oblivious.Sodium.rnd ();
//             assertTrue(len (s) == 32 && Oblivious.Sodium.scl (s));
//         }
//     }
//
//     function test_scl_none() {
//         for (let _:number = 0; _ < 256; _++) {
//             const s = Oblivious.Sodium.scl ();
//             assertTrue(len (s) == 32 && Oblivious.Sodium.scl (s));
//         }
//     }
//
//     function test_scl(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9';
//         }
//         const fun = (function (bs) {
//             return bitlist ([(Oblivious.Sodium.scl (bs) !== null ? 1 : 0)]);
//         });
//         return check_or_generate_operation(fun, [32], bits);
//     }
//
//     function test_inv(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1';
//         }
//         function fun(bs) {
//             const s = Oblivious.Sodium.scl (bs);
//             return (s !== null ? Oblivious.Sodium.inv (s) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32], bits);
//     }
//
//     function test_smu(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '2ca120487000010295804000850254008018000000008000080100008400000c';
//         }
//         function fun(bs) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
//             const s1 = __left0__ [0];
//             const s2 = __left0__ [1];
//             return (s1 !== null && s2 !== null ? Oblivious.Sodium.smu (s1, s2) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32, 32], bits);
//     }
//
//     function test_pnt_none() {
//         for (let _:number = 0; _ < 256; _++) {
//             assertTrue(len (Oblivious.Sodium.pnt ()) == 32);
//         }
//     }
//
//     function test_pnt(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = 'baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b';
//         }
//         return check_or_generate_operation(Oblivious.Sodium.pnt, [64], bits);
//     }
//
//     function test_bas(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0';
//         }
//         function fun(bs) {
//             const s = Oblivious.Sodium.scl (bs);
//             return (s !== null ? Oblivious.Sodium.bas (s) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32], bits);
//     }
//
//     function test_mul(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '2c040004500080008180400080000008a1180020001080080211004000080040';
//         }
//         function fun(bs) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
//             const s1 = __left0__ [0];
//             const s2 = __left0__ [1];
//             return (s1 !== null && s2 !== null ? Oblivious.Sodium.mul (s2, Oblivious.Sodium.bas (s1)) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32, 32], bits);
//     }
//
//     function test_add(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '28400040500000008480000020024c00211800080000800002110040ac001044';
//         }
//         function fun(bs) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
//             const s1 = __left0__ [0];
//             const s2 = __left0__ [1];
//             return (s1 !== null && s2 !== null ? Oblivious.Sodium.add (Oblivious.Sodium.bas (s1), Oblivious.Sodium.bas (s2)) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32, 32], bits);
//     }
//
//     function test_sub(bits) {
//         if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
//             bits = '24210008500080028000000025020c08000001200000800002008002ac081040';
//         }
//         function fun(bs) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
//             const s1 = __left0__ [0];
//             const s2 = __left0__ [1];
//             return (s1 !== null && s2 !== null ? Oblivious.Sodium.sub (Oblivious.Sodium.bas (s1), Oblivious.Sodium.bas (s2)) : new Uint8Array([0]));
//         }
//         return check_or_generate_operation(fun, [32, 32], bits);
//     }
}

/**
 * Tests of point and scalar wrapper classes and their methods.
 */
function Test_classes() {
    function test_point_random() {
        for (let _: number = 0; _ < 256; _++) {
            assertTrue(Oblivious.Point.random().length === 32);
        }
    }

    function test_point_bytes(bits) {
        const bitsDefault = from_hex('baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b');
        return check_or_generate_operation(Oblivious.Point.bytes, [64], bits ?? bitsDefault);
    }

    function test_point_hash(bits) {
        const bitsDefault = from_hex('10cb044c737b034d5755f8ba0e29432745ed4fb1a78ea22a15b2d1113492841b');
        return check_or_generate_operation(Oblivious.Point.hash, [64], bits ?? bitsDefault);
    }

    function test_point_base(bits) {
        const bitsDefault = from_hex('00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0');
        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? Oblivious.Point.base(s) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits ?? bitsDefault);
    }

    function test_point_base64() {
        for (let _: number = 0; _ < 256; _++) {
            const p = new Oblivious.Point(null);
            const pBase64 = p.to_base64();
            assertEqual(Oblivious.Point.from_base64(pBase64), p);
        }
    }

    function test_point() {
        for (let _:number = 0; _ < 256; _++) {
            assertTrue((new Oblivious.Point(null)).length === 32);
        }
    }

    function test_point_rmul(bits) {
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
        return check_or_generate_operation(fun, [32, 32], bits ?? bitsDefault);
    }

    function test_point_scalar_mul_op(bits) {
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
        return check_or_generate_operation(fun, [32, 32], bits ?? bitsDefault);
    }

    function test_point_add(bits) {
        const bitsDefault = from_hex('28400040500000008480000020024c00211800080000800002110040ac001044' +
            '28400040500000008480000020024c00211800080000800002110040ac001044');
        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes (bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes (bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? Oblivious.Point.base(s1).add(Oblivious.Point.base(s2))
                    : new Uint8Array([0])
            );
        }
        return check_or_generate_operation(fun, [32, 32], bits ?? bitsDefault);
    }

    function test_point_sub(bits) {
        const bitsDefault = from_hex('24210008500080028000000025020c08000001200000800002008002ac081040' +
            '24210008500080028000000025020c08000001200000800002008002ac081040');
        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes (bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes (bs.slice(32));
            return (
                s1 !== null && s2 !== null
                    ? Oblivious.Point.base(s1).sub(Oblivious.Point.base(s2))
                    : new Uint8Array([0])
            );
        }
        return check_or_generate_operation(fun, [32, 32], bits ?? bitsDefault);
    }

    function test_scalar_random() {
        for (let _:number = 0; _ < 256; _++) {
            const s = Oblivious.Scalar.random();
            assertTrue(s.length === 32 && Oblivious.Scalar.bytes(s) !== null);
        }
    }

    function test_scalar_bytes(bits) {
        const bitsDefault = from_hex('4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9');
        function fun(bs) {
            return new Uint8Array([
                Oblivious.Scalar.bytes(bs) !== null ? 1 : 0
            ]);
        }
        return check_or_generate_operation(fun, [32], bits ?? bitsDefault);
    }

    function test_scalar_hash(bits) {
        const bitsDefault = from_hex('09991cc13ab3799d9c05e0c75968859298977fb7b78efa2dcb6e1689e927ac0e');
        return check_or_generate_operation(Oblivious.Scalar.hash, [32], bits ?? bitsDefault);
    }

    function test_scalar_base64() {
        for (let _:number = 0; _ < 256; _++) {
            const s = new Oblivious.Scalar(null);
            const sBase64 = s.to_base64();
            assertEqual(Oblivious.Scalar.from_base64(sBase64), s);
        }
    }

    function test_scalar() {
        for (let _:number = 0; _ < 256; _++) {
            const s = new Oblivious.Scalar(null);
            assertTrue(s.length === 32 && Oblivious.Scalar.bytes(s) !== null);
        }
    }

    function test_scalar_inverse(bits) {
        const bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');
        function fun(bs) {
            const s = Oblivious.Scalar.bytes (bs);
            return (s !== null ? s.inverse () : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits ?? bitsDefault);
    }

    function test_scalar_invert_op(bits) {
        const bitsDefault = from_hex('41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1');
        function fun(bs) {
            const s = Oblivious.Scalar.bytes(bs);
            return (s !== null ? s.invert() : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32], bits ?? bitsDefault);
    }

    function test_scalar_mul(bits) {
        const bitsDefault = from_hex('2ca120487000010295804000850254008018000000008000080100008400000c' +
            '2ca120487000010295804000850254008018000000008000080100008400000c');
        function fun(bs) {
            const s1 = Oblivious.Scalar.bytes(bs.slice(0, 32));
            const s2 = Oblivious.Scalar.bytes(bs.slice(32));
            return (s1 !== null && s2 !== null ? s1.mul(s2) : new Uint8Array([0]));
        }
        return check_or_generate_operation(fun, [32, 32], bits ?? bitsDefault);
    }

    return {
        test_point_random, test_point_bytes, test_point_hash, test_point_base, test_point_base64, test_point,
        test_point_rmul, test_point_scalar_mul_op, test_point_add, test_point_sub, test_scalar_random, test_scalar_bytes,
        test_scalar_hash, test_scalar_base64, test_scalar, test_scalar_inverse, test_scalar_invert_op, test_scalar_mul
    }
}

/**
 * Tests verifying that methods return objects of the appropriate type.
 */
function Test_types() {
//     function test_types_point_random() {
//         const p = Oblivious.Point.random ();
//         assertTrue(isinstance (p, Oblivious.Point));
//     }
//
//     function test_types_point_bytes() {
//         const __left0__ = fountains (64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const p = Oblivious.Point.bytes (bs);
//         assertTrue(isinstance (p, Oblivious.Point));
//     }
//
//     function test_types_point_hash() {
//         const __left0__ = fountains (64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const p = Oblivious.Point.hash (bs);
//         assertTrue(isinstance (p, Oblivious.Point));
//     }
//
//     function test_types_point_base() {
//         const p = Oblivious.Point.base (Oblivious.Scalar.random ());
//         assertTrue(isinstance (p, Oblivious.Point));
//     }
//
//     function test_types_point_mul() {
//         const __left0__ = fountains (32 + 64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const __left0__ = tuple ([Oblivious.Scalar.hash (bs.__getslice__ (0, 32, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
//         const s = __left0__ [0];
//         const p = __left0__ [1];
//         assertTrue(isinstance (s * p, Oblivious.Point));
//     }
//
//     function test_types_point_add() {
//         const __left0__ = fountains (64 + 64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const __left0__ = tuple ([Oblivious.Point.hash (bs.__getslice__ (0, 64, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
//         const p0 = __left0__ [0];
//         const p1 = __left0__ [1];
//         assertTrue(isinstance (p0 + p1, Oblivious.Point));
//     }
//
//     function test_types_point_sub() {
//         const __left0__ = fountains (64 + 64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const __left0__ = tuple ([Oblivious.Point.hash (bs.__getslice__ (0, 64, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
//         const p0 = __left0__ [0];
//         const p1 = __left0__ [1];
//         assertTrue(isinstance (p0 - p1, Oblivious.Point));
//     }
//
//     function test_types_scalar_random() {
//         assertTrue(isinstance (Oblivious.Scalar.random (), Oblivious.Scalar));
//     }
//
//     function test_types_scalar_bytes() {
//         const bs = bytes (Oblivious.Scalar.random ());
//         assertTrue(isinstance (Oblivious.Scalar.bytes (bs), Oblivious.Scalar));
//     }
//
//     function test_types_scalar_hash() {
//         const __left0__ = fountains (32, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         assertTrue(isinstance (Oblivious.Scalar.hash (bs), Oblivious.Scalar));
//     }
//
//     function test_types_scalar_invert() {
//         assertTrue(isinstance (~(Oblivious.Scalar.random ()), Oblivious.Scalar));
//     }
//
//     function test_types_scalar_inverse() {
//         assertTrue(isinstance (Oblivious.Scalar.random ().inverse (), Oblivious.Scalar));
//     }
//
//     function test_types_scalar_mul_scalar() {
//         const __left0__ = tuple ([Oblivious.Scalar.random (), Oblivious.Scalar.random ()]);
//         const s0 = __left0__ [0];
//         const s1 = __left0__ [1];
//         assertTrue(isinstance (s0 * s1, Oblivious.Scalar));
//     }
//
//     function test_types_scalar_mul_point() {
//         const __left0__ = fountains (32 + 64, __kwargtrans__ ({limit: 1}));
//         const bs = __left0__ [0];
//         const __left0__ = tuple ([Oblivious.Scalar.hash (bs.__getslice__ (0, 32, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
//         const s = __left0__ [0];
//         const p = __left0__ [1];
//         assertTrue(isinstance (s * p, Oblivious.Point));
//     }
}

/**
 * Tests of algebraic properties of primitive operators.
 */
function Test_algebra() {
//     function test_algebra_scalar_inverse_identity() {
//         for (const bs of fountains (32, __kwargtrans__ ({limit: 256}))) {
//             const s = Oblivious.Sodium.scl (bs);
//             if (s !== null) {
//                 assertEqual(Oblivious.Sodium.inv (Oblivious.Sodium.inv (s)), s);
//             }
//         }
//     }
//
//     function test_algebra_scalar_inverse_mul_cancel() {
//         for (const bs of fountains (32 + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (32, null, 1))]);
//             const s0 = __left0__ [0];
//             const p0 = __left0__ [1];
//             if (s0 !== null) {
//                 assertEqual(Oblivious.Sodium.mul (Oblivious.Sodium.inv (s0), Oblivious.Sodium.mul (s0, p0)), p0);
//             }
//         }
//     }
//
//     function test_algebra_scalar_mul_commute() {
//         for (const bs of fountains ((32 + 32) + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
//             const s0 = __left0__ [0];
//             const s1 = __left0__ [1];
//             const p0 = __left0__ [2];
//             if (s0 !== null && s1 !== null) {
//                 assertEqual(Oblivious.Sodium.mul (s0, Oblivious.Sodium.mul (s1, p0)), Oblivious.Sodium.mul (s1, Oblivious.Sodium.mul (s0, p0)));
//             }
//         }
//     }
//
//     function test_algebra_point_add_commute() {
//         for (const bs of fountains (64 + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.pnt (bs.__getslice__ (0, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
//             const p0 = __left0__ [0];
//             const p1 = __left0__ [1];
//             assertEqual(Oblivious.Sodium.add (p0, p1), Oblivious.Sodium.add (p1, p0));
//         }
//     }
//
//     function test_algebra_point_add_sub_cancel() {
//         for (const bs of fountains (64 + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.pnt (bs.__getslice__ (0, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
//             const p0 = __left0__ [0];
//             const p1 = __left0__ [1];
//             assertEqual(Oblivious.Sodium.add (Oblivious.Sodium.sub (p0, p1), p1), p0);
//         }
//     }
//
//     function test_algebra_scalar_mul_point_mul_associate() {
//         for (const bs of fountains ((32 + 32) + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
//             const s0 = __left0__ [0];
//             const s1 = __left0__ [1];
//             const p0 = __left0__ [2];
//             if (s0 !== null && s1 !== null) {
//                 assertEqual(Oblivious.Sodium.mul (s0, Oblivious.Sodium.mul (s1, p0)), Oblivious.Sodium.mul (Oblivious.Sodium.smu (s0, s1), p0));
//             }
//         }
//     }
//
//     function test_algebra_scalar_mul_point_add_distribute() {
//         for (const bs of fountains ((32 + 64) + 64, __kwargtrans__ ({limit: 256}))) {
//             const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (32, 96, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (96, null, 1))]);
//             const s0 = __left0__ [0];
//             const p0 = __left0__ [1];
//             const p1 = __left0__ [2];
//             if (s0 !== null) {
//                 assertEqual(Oblivious.Sodium.add (Oblivious.Sodium.mul (s0, p0), Oblivious.Sodium.mul (s0, p1)), Oblivious.Sodium.mul (s0, Oblivious.Sodium.add (p0, p1)));
//             }
//         }
//     }
//
//     function test_algebra_scalar_mul_scalar_on_right_hand_side_of_non_scalar() {
//         const s = Oblivious.Scalar.random ();
//         self.assertRaises (py_TypeError, (function () {
//             return new Uint8Array([0]) * s;
//         }));
//     }
//
//     function test_algebra_scalar_mul_point_on_left_hand_side() {
//         const s = Oblivious.Scalar.random ();
//         const p = Oblivious.Point.hash (bytes ([0] * 32));
//         self.assertRaises (py_TypeError, (function () {
//             return p * s;
//         }));
//     }
}

function all_tests() {
    const test_suites = {
        Test_classes
    };
    for (const [name, init] of Object.entries(test_suites)) {
        console.log('\nUnit test reference bit vectors for ' + name + ' methods...');
        const tests = init();
        for (const m of Object.keys(tests)) {
            const method = tests[m];
            console.log('* ' + m + ': ' + (r => r === undefined ? true : r)(method()));
        }
    }
}

Oblivious.ready.then(all_tests);
