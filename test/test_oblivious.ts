/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */

declare const assert;
import { Oblivious } from "../src/oblivious";

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
function check_or_generate_operation(test, fun, lengths, bits) {
    const fs = fountains (sum (lengths), __kwargtrans__ ({seed: bytes (0), limit: 256, bits: bits, function: fun}));
    if (bits === null) {
        return bitlist (list (fs)).hex ();
    }
    test.assertTrue (all (fs));
}

/**
 * Define and return four classes of unit tests given a wrapper
 * class (`native` or `sodium`) for primitive operations.
 */
function define_classes() {

    /**
     * Direct tests of primitive operators that operate on bytes-like objects.
     */
    function Test_primitives() {
        function test_rnd() {
            for (const _ = 0; _ < 256; _++) {
                const s = Oblivious.Sodium.rnd ();
                assert(len (s) == 32 && Oblivious.Sodium.scl (s));
            }
        }

        function test_scl_none() {
            for (const _ = 0; _ < 256; _++) {
                const s = Oblivious.Sodium.scl ();
                assert(len (s) == 32 && Oblivious.Sodium.scl (s));
            }
        }

        function test_scl(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9';
            }
            const fun = (function __lambda__ (bs) {
                return bitlist ([(Oblivious.Sodium.scl (bs) !== null ? 1 : 0)]);
            });
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_inv(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1';
            }
            function fun(bs) {
                const s = Oblivious.Sodium.scl (bs);
                return (s !== null ? Oblivious.Sodium.inv (s) : bytes ([0]));
            }
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_smu(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '2ca120487000010295804000850254008018000000008000080100008400000c';
            }
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Sodium.smu (s1, s2) : bytes ([0]));
            }
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_pnt_none() {
            for (const _ = 0; _ < 256; _++) {
                assert(len (Oblivious.Sodium.pnt ()) == 32);
            }
        }

        function test_pnt(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = 'baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b';
            };
            return check_or_generate_operation (Oblivious.Sodium.pnt, [64], bits);
        }

        function test_bas(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0';
            };
            function fun(bs) {
                const s = Oblivious.Sodium.scl (bs);
                return (s !== null ? Oblivious.Sodium.bas (s) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_mul(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '2c040004500080008180400080000008a1180020001080080211004000080040';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Sodium.mul (s2, Oblivious.Sodium.bas (s1)) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_add(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '28400040500000008480000020024c00211800080000800002110040ac001044';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Sodium.add (Oblivious.Sodium.bas (s1), Oblivious.Sodium.bas (s2)) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_sub(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '24210008500080028000000025020c08000001200000800002008002ac081040';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Sodium.sub (Oblivious.Sodium.bas (s1), Oblivious.Sodium.bas (s2)) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        };
    };

    /**
     * Tests of point and scalar wrapper classes and their methods.
     */
    function Test_classes() {
        function test_point_random() {
            for (const _ = 0; _ < 256; _++) {
                assert(Oblivious.Point.random().length == 32);
            }
        }

        function test_point_bytes(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = 'baf12de24e54deae0aa116816bf5eee23b1168c78e892372e08a9884de9d4c1b';
            };
            return check_or_generate_operation (Oblivious.Point.bytes, [64], bits);
        }

        function test_point_hash(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '10cb044c737b034d5755f8ba0e29432745ed4fb1a78ea22a15b2d1113492841b';
            };
            return check_or_generate_operation (Oblivious.Point.hash, [64], bits);
        }

        function test_point_base(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '00386671840148d05620421002a2110aa800e289010040404cb2101c20e165a0';
            };
            function fun(bs) {
                const s = Oblivious.Scalar.bytes (bs);
                return (s !== null ? Oblivious.Point.base (s) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_point_base64() {
            for (const _ = 0; _ < 256; _++) {
                const p = Oblivious.Point ();
                const p_b64 = base64.standard_b64encode (p).decode ('utf-8');
                self.assertEqual (p.to_base64 (), p_b64);
                self.assertEqual (Oblivious.Point.from_base64 (p_b64), p);
            }
        }

        function test_point() {
            for (const _ = 0; _ < 256; _++) {
                assert(len (Oblivious.Point ()) == 32);
            }
        }

        function test_point_rmul(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '2c040004500080008180400080000008a1180020001080080211004000080040';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Scalar.bytes (bs.__getslice__ (0, 32, 1)), Oblivious.Scalar.bytes (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Point.base (s2).__rmul__ (s1) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_point_scalar_mul_op(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '2c040004500080008180400080000008a1180020001080080211004000080040';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Scalar.bytes (bs.__getslice__ (0, 32, 1)), Oblivious.Scalar.bytes (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? s1 * Oblivious.Point.base (s2) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_point_add(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '28400040500000008480000020024c00211800080000800002110040ac001044';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Scalar.bytes (bs.__getslice__ (0, 32, 1)), Oblivious.Scalar.bytes (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Point.base (s1) + Oblivious.Point.base (s2) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_point_sub(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '24210008500080028000000025020c08000001200000800002008002ac081040';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Scalar.bytes (bs.__getslice__ (0, 32, 1)), Oblivious.Scalar.bytes (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? Oblivious.Point.base (s1) - Oblivious.Point.base (s2) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        function test_scalar_random() {
            for (const _ = 0; _ < 256; _++) {
                const s = Oblivious.Scalar.random ();
                assert(len (s) == 32 && Oblivious.Scalar.bytes (s) !== null);
            }
        }

        function test_scalar_bytes(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '4df8fe738c097afa7f255b10c3ab118eeb73e38935605042ccb7581c73f1e5e9';
            };
            const fun = (function __lambda__ (bs) {
                return bitlist ([(Oblivious.Scalar.bytes (bs) !== null ? 1 : 0)]);
            });
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_scalar_hash(bits) {
            if (typeof bits === 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '09991cc13ab3799d9c05e0c75968859298977fb7b78efa2dcb6e1689e927ac0e';
            };
            return check_or_generate_operation (Oblivious.Scalar.hash, [32], bits);
        }

        function test_scalar_base64() {
            for (const _ = 0; _ < 256; _++) {
                const s = Oblivious.Scalar ();
                const s_b64 = base64.standard_b64encode (s).decode ('utf-8');
                self.assertEqual (s.to_base64 (), s_b64);
                self.assertEqual (Oblivious.Scalar.from_base64 (s_b64), s);
            }
        }

        function test_scalar() {
            for (const _ = 0; _ < 256; _++) {
                const s = Oblivious.Scalar ();
                assert(len (s) == 32 && Oblivious.Scalar.bytes (s) !== null);
            }
        }

        function test_scalar_inverse(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1';
            };
            function fun(bs) {
                const s = Oblivious.Scalar.bytes (bs);
                return (s !== null ? s.inverse () : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_scalar_invert_op(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '41c07230000960b274044a0080a8018aa0114380150000028c2700006081e1e1';
            };
            function fun(bs) {
                const s = Oblivious.Scalar.bytes (bs);
                return (s !== null ? ~(s) : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32], bits);
        }

        function test_scalar_mul(bits) {
            if (typeof bits == 'undefined' || (bits != null && bits.hasOwnProperty ("__kwargtrans__"))) {;
                bits = '2ca120487000010295804000850254008018000000008000080100008400000c';
            };
            function fun(bs) {
                const __left0__ = tuple ([Oblivious.Scalar.bytes (bs.__getslice__ (0, 32, 1)), Oblivious.Scalar.bytes (bs.__getslice__ (32, null, 1))]);
                const s1 = __left0__ [0];
                const s2 = __left0__ [1];
                return (s1 !== null && s2 !== null ? s1 * s2 : bytes ([0]));
            };
            return check_or_generate_operation (fun, [32, 32], bits);
        }

        return {
            test_point_random, test_point_bytes, test_point_hash, test_point_base, test_point_base64, test_point,
            test_point_rmul, test_point_scalar_mul_op, test_point_add, test_point_sub, test_scalar_random, test_scalar_bytes,
            test_scalar_hash, test_scalar_base64, test_scalar, test_scalar_inverse, test_scalar_invert_op, test_scalar_mul
        };
    };

    /**
     * Tests verifying that methods return objects of the appropriate type.
     */
    function Test_types() {
        function test_types_point_random() {
            const p = Oblivious.Point.random ();
            assert(isinstance (p, Oblivious.Point));
        }

        function test_types_point_bytes() {
            const __left0__ = fountains (64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const p = Oblivious.Point.bytes (bs);
            assert(isinstance (p, Oblivious.Point));
        }

        function test_types_point_hash() {
            const __left0__ = fountains (64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const p = Oblivious.Point.hash (bs);
            assert(isinstance (p, Oblivious.Point));
        }

        function test_types_point_base() {
            const p = Oblivious.Point.base (Oblivious.Scalar.random ());
            assert(isinstance (p, Oblivious.Point));
        }

        function test_types_point_mul() {
            const __left0__ = fountains (32 + 64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const __left0__ = tuple ([Oblivious.Scalar.hash (bs.__getslice__ (0, 32, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
            const s = __left0__ [0];
            const p = __left0__ [1];
            assert(isinstance (s * p, Oblivious.Point));
        }

        function test_types_point_add() {
            const __left0__ = fountains (64 + 64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const __left0__ = tuple ([Oblivious.Point.hash (bs.__getslice__ (0, 64, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
            const p0 = __left0__ [0];
            const p1 = __left0__ [1];
            assert(isinstance (p0 + p1, Oblivious.Point));
        }

        function test_types_point_sub() {
            const __left0__ = fountains (64 + 64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const __left0__ = tuple ([Oblivious.Point.hash (bs.__getslice__ (0, 64, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
            const p0 = __left0__ [0];
            const p1 = __left0__ [1];
            assert(isinstance (p0 - p1, Oblivious.Point));
        }

        function test_types_scalar_random() {
            assert(isinstance (Oblivious.Scalar.random (), Oblivious.Scalar));
        }

        function test_types_scalar_bytes() {
            const bs = bytes (Oblivious.Scalar.random ());
            assert(isinstance (Oblivious.Scalar.bytes (bs), Oblivious.Scalar));
        }

        function test_types_scalar_hash() {
            const __left0__ = fountains (32, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            assert(isinstance (Oblivious.Scalar.hash (bs), Oblivious.Scalar));
        }

        function test_types_scalar_invert() {
            assert(isinstance (~(Oblivious.Scalar.random ()), Oblivious.Scalar));
        }

        function test_types_scalar_inverse() {
            assert(isinstance (Oblivious.Scalar.random ().inverse (), Oblivious.Scalar));
        }

        function test_types_scalar_mul_scalar() {
            const __left0__ = tuple ([Oblivious.Scalar.random (), Oblivious.Scalar.random ()]);
            const s0 = __left0__ [0];
            const s1 = __left0__ [1];
            assert(isinstance (s0 * s1, Oblivious.Scalar));
        }

        function test_types_scalar_mul_point() {
            const __left0__ = fountains (32 + 64, __kwargtrans__ ({limit: 1}));
            const bs = __left0__ [0];
            const __left0__ = tuple ([Oblivious.Scalar.hash (bs.__getslice__ (0, 32, 1)), Oblivious.Point.hash (bs.__getslice__ (64, null, 1))]);
            const s = __left0__ [0];
            const p = __left0__ [1];
            assert(isinstance (s * p, Oblivious.Point));
        };
    };

    /**
     * Tests of algebraic properties of primitive operators.
     */
    function Test_algebra() {
        function test_algebra_scalar_inverse_identity() {
            for (const bs of fountains (32, __kwargtrans__ ({limit: 256}))) {
                const s = Oblivious.Sodium.scl (bs);
                if (s !== null) {
                    self.assertEqual (Oblivious.Sodium.inv (Oblivious.Sodium.inv (s)), s);
                }
            }
        }

        function test_algebra_scalar_inverse_mul_cancel() {
            for (const bs of fountains (32 + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (32, null, 1))]);
                const s0 = __left0__ [0];
                const p0 = __left0__ [1];
                if (s0 !== null) {
                    self.assertEqual (Oblivious.Sodium.mul (Oblivious.Sodium.inv (s0), Oblivious.Sodium.mul (s0, p0)), p0);
                }
            }
        }

        function test_algebra_scalar_mul_commute() {
            for (const bs of fountains ((32 + 32) + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
                const s0 = __left0__ [0];
                const s1 = __left0__ [1];
                const p0 = __left0__ [2];
                if (s0 !== null && s1 !== null) {
                    self.assertEqual (Oblivious.Sodium.mul (s0, Oblivious.Sodium.mul (s1, p0)), Oblivious.Sodium.mul (s1, Oblivious.Sodium.mul (s0, p0)));
                }
            }
        }

        function test_algebra_point_add_commute() {
            for (const bs of fountains (64 + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.pnt (bs.__getslice__ (0, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
                const p0 = __left0__ [0];
                const p1 = __left0__ [1];
                self.assertEqual (Oblivious.Sodium.add (p0, p1), Oblivious.Sodium.add (p1, p0));
            }
        }

        function test_algebra_point_add_sub_cancel() {
            for (const bs of fountains (64 + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.pnt (bs.__getslice__ (0, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
                const p0 = __left0__ [0];
                const p1 = __left0__ [1];
                self.assertEqual (Oblivious.Sodium.add (Oblivious.Sodium.sub (p0, p1), p1), p0);
            }
        }

        function test_algebra_scalar_mul_point_mul_associate() {
            for (const bs of fountains ((32 + 32) + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.scl (bs.__getslice__ (32, 64, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (64, null, 1))]);
                const s0 = __left0__ [0];
                const s1 = __left0__ [1];
                const p0 = __left0__ [2];
                if (s0 !== null && s1 !== null) {
                    self.assertEqual (Oblivious.Sodium.mul (s0, Oblivious.Sodium.mul (s1, p0)), Oblivious.Sodium.mul (Oblivious.Sodium.smu (s0, s1), p0));
                }
            }
        }

        function test_algebra_scalar_mul_point_add_distribute() {
            for (const bs of fountains ((32 + 64) + 64, __kwargtrans__ ({limit: 256}))) {
                const __left0__ = tuple ([Oblivious.Sodium.scl (bs.__getslice__ (0, 32, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (32, 96, 1)), Oblivious.Sodium.pnt (bs.__getslice__ (96, null, 1))]);
                const s0 = __left0__ [0];
                const p0 = __left0__ [1];
                const p1 = __left0__ [2];
                if (s0 !== null) {
                    self.assertEqual (Oblivious.Sodium.add (Oblivious.Sodium.mul (s0, p0), Oblivious.Sodium.mul (s0, p1)), Oblivious.Sodium.mul (s0, Oblivious.Sodium.add (p0, p1)));
                }
            }
        }

        function test_algebra_scalar_mul_scalar_on_right_hand_side_of_non_scalar() {
            const s = Oblivious.Scalar.random ();
            self.assertRaises (py_TypeError, (function __lambda__ () {
                return bytes ([0]) * s;
            }));
        }

        function test_algebra_scalar_mul_point_on_left_hand_side() {
            const s = Oblivious.Scalar.random ();
            const p = Oblivious.Point.hash (bytes ([0] * 32));
            self.assertRaises (py_TypeError, (function __lambda__ () {
                return p * s;
            }));
        };
    };

    return [Test_primitives, Test_classes, Test_types, Test_algebra];
}

const cls = define_classes();
const Test_primitives = cls[0];
const Test_classes = cls[1];
const Test_types = cls[2];
const Test_algebra = cls[3];

for (const tests of [Test_classes()]) {
    console.log('\nUnit test reference bit vectors for ' + 'tests' + ' methods...');
    for (const m of Object.keys(tests)) {
        const method = tests[m];
        console.log('* ' + m + ': ' + method());
    }
}
