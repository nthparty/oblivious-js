import sodium = require('libsodium-wrappers-sumo');
declare const crypto;

/**
 * Wrapper class for primitive operations.
 */
export class Sodium {

    /**
     * Return random non-zero scalar.
     * @returns {Uint8Array} Byte array representing a Ristretto255 scalar.
     */
    public static rnd(): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_random();
    }

    /**
     * Return supplied byte vector if it is a valid scalar; otherwise, return
     * `null`. If no byte vector is supplied, return a random scalar.
     */
    static scl(s: Uint8Array): Uint8Array {
        if (s === null) {
            return this.rnd();
        }
        const zero: Uint8Array = (new Uint8Array(32)).fill(0);
        const sr: Uint8Array = sodium.crypto_core_ristretto255_scalar_add(s, zero);
        if (sodium.compare(s, sr)) {
            return s;
        }
        return null;
    };

    /**
     * Return inverse of scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     */
    static inv(s: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_invert(s);
    };

    /**
     * Return scalar multiplied by another scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     */
    static smu(s: Uint8Array, t: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_mul(s, t);
    };

    /**
     * Turn a 64-byte array into a valid point (without hashing it).
     * @param {Uint8Array} bytes Input byte array.
     * @returns {Uint8Array} Byte array representing an Ristretto255 point.
     */
    static pnt(bytes: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_from_hash(
            crypto.createHash('sha512').digest('sha512',
                bytes === null ? sodium.rnd() : bytes
            )
        );
    }

    /* Return base point multiplied by supplied scalar. */
    static bas(e: Uint8Array): Uint8Array {
        return sodium.crypto_scalarmult_ristretto255_base(e);
    };

    /**
     * Return product of the supplied point and scalar.
     * @param {Uint8Array} s Byte array representing a scalar.
     * @param {Uint8Array} p Byte array representing a point.
     * @returns {Uint8Array} Byte array representing product point.
     */
    static mul(s: Uint8Array, p: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_mul(s, p);
    }

    /* Return sum of the supplied points. */
    static add(x: Uint8Array, y: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_add(x, y);
    };

    /* Return result of subtracting second point from first point. */
    static sub(x: Uint8Array, y: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_sub(x, y);
    };
}
