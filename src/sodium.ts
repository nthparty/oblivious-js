/**
 * Wrapper class for primitive operations.
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function Sodium_init(sodium: any): any { return class Sodium {

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
     * @param {Uint8Array} s Byte array representing a Ristretto255 scalar.
     * @returns {Uint8Array} Byte array representing a Ristretto255 scalar.
     */
    static scl(s: Uint8Array): Uint8Array {
        if (s === null) {
            return this.rnd();
        }
        if (s.length > 32) {
            s = sodium.crypto_core_ristretto255_scalar_reduce(s);
        }
        const zero: Uint8Array = (new Uint8Array(32)).fill(0);
        const sr: Uint8Array = sodium.crypto_core_ristretto255_scalar_add(s, zero);
        if (sodium.compare(s, sr) === 0 && sodium.compare(s, zero) === 1) {
            return s;
        }
        return null;
    }

    /**
     * Return inverse of scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     * @param {Uint8Array} s Byte array representing a Ristretto255 scalar.
     * @returns {Uint8Array} Byte array representing a Ristretto255 scalar.
     */
    static inv(s: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_invert(s);
    }

    /**
     * Return scalar multiplied by another scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     * @param {Uint8Array} s Input byte array representing a Ristretto255 scalar.
     * @param {Uint8Array} t Input byte array representing a Ristretto255 scalar.
     * @returns {Uint8Array} Byte array representing a Ristretto255 scalar.
     */
    static smu(s: Uint8Array, t: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_mul(s, t);
    }

    /**
     * Turn a 64-byte array into a valid point (without hashing it).
     * @param {Uint8Array} bytes Byte array of length 64.
     * @returns {Uint8Array} Byte array representing a Ristretto255 point.
     */
    static pnt(bytes: Uint8Array): Uint8Array {
        return bytes === null
            ? sodium.crypto_core_ristretto255_random()
            : sodium.crypto_core_ristretto255_from_hash(bytes);
    }

    /**
     * Return base point multiplied by supplied scalar.
     * @param {Uint8Array} e Byte array representing the desired scalar exponent.
     * @returns {Uint8Array} Byte array representing a Ristretto255 point.
     */
    static bas(e: Uint8Array): Uint8Array {
        return sodium.crypto_scalarmult_ristretto255_base(e);
    }

    /**
     * Return sum of the supplied scalars.
     * @param {Uint8Array} s1 Byte array representing a Ristretto255 scalar.
     * @param {Uint8Array} s2 Byte array representing a Ristretto255 scalar.
     * @returns {Uint8Array} Byte array representing the scalar sum.
     */
    static sad(s1: Uint8Array, s2: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_add(s1, s2);
    }

    /**
     * Return difference of the supplied scalars.
     * @param {Uint8Array} s1 Byte array representing a Ristretto255 scalar.
     * @param {Uint8Array} s2 Byte array representing a Ristretto255 scalar.
     * @returns {Uint8Array} Byte array representing the scalar difference.
     */
    static ssb(s1: Uint8Array, s2: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_scalar_sub(s1, s2);
    }

    /**
     * Return product of the supplied point and scalar.
     * @param {Uint8Array} s Byte array representing a Ristretto255 scalar.
     * @param {Uint8Array} p Byte array representing a Ristretto255 point.
     * @returns {Uint8Array} Byte array representing the product point.
     */
    static mul(s: Uint8Array, p: Uint8Array): Uint8Array {
        return sodium.crypto_scalarmult_ristretto255(s, p);
    }

    /**
     * Return sum of the supplied points.
     * @param {Uint8Array} x Byte array representing a Ristretto255 point.
     * @param {Uint8Array} y Byte array representing a Ristretto255 point.
     * @returns {Uint8Array} Byte array representing the point x+y.
     */
    static add(x: Uint8Array, y: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_add(x, y);
    }

    /**
     * Return result of subtracting second point from first point.
     * @param {Uint8Array} x Byte array representing a Ristretto255 point.
     * @param {Uint8Array} y Byte array representing a Ristretto255 point.
     * @returns {Uint8Array} Byte array representing the point x-y.
     */
    static sub(x: Uint8Array, y: Uint8Array): Uint8Array {
        return sodium.crypto_core_ristretto255_sub(x, y);
    }

    /**
     * Return the SHA-512 hash digest of a string or byte array.
     * @param {string} m UTF-8 string or byte array of any length.
     * @returns {Uint8Array} Byte array of 64-bytes-long SHA-512 hash digest.
     */
    static hash(m: string | Uint8Array): Uint8Array {
        return sodium.crypto_hash_sha512(m);
    }

    /**
     * Determine whether a given byte array constitutes a valid Ristretto255 point.
     * @param {Uint8Array} p Byte array representing a Ristretto255 point candidate.
     * @returns {boolean} Returns `true` if the point candidate is valid, otherwise `false`.
     */
    static vld(p: Uint8Array): boolean {
        return sodium.crypto_core_ristretto255_valid(p);
    }

    /**
     * Return the hexadecimal representation of a byte array.
     * @param {Uint8Array} bytes Byte array of any length.
     * @returns {string} Hexadecimal number formatted as a UTF-8 string.
     */
    static to_hex(bytes: Uint8Array): string {
        return sodium.to_hex(bytes);
    }

    /**
     * Return a new byte array from its representation in hexadecimal.
     * @param {string} hex UTF-8 string of even length to convert.
     * @returns {Uint8Array} Byte array corresponding to the hexadecimal number.
     */
    static from_hex(hex: string): Uint8Array {
        return sodium.from_hex(hex);
    }

    /**
     * Return the Base64 encoding of a byte array.
     * @param {Uint8Array} bytes Byte array of any length.
     * @returns {string} Base64 UTF-8 string representation of the bytes.
     */
    static to_base64(bytes: Uint8Array): string {
        return sodium.to_base64(bytes, 1);
    }

    /**
     * Return a new byte array from its representation in Base64.
     * @param {string} s Base64 UTF-8 string representation of the bytes.
     * @returns {Uint8Array} Byte array corresponding to the Base64 encoding.
     */
    static from_base64(s: string): Uint8Array {
        return sodium.from_base64(s, 1);
    }

    /**
     * Return the UTF-8 string encoding of a byte array.
     * @param {Uint8Array} bytes Byte array of any length.
     * @returns {string} UTF-8 string representation of the bytes.
     */
    static to_string(bytes: Uint8Array): string {
        return sodium.to_string(bytes);
    }

    /**
     * Return a new byte array from a UTF-8 string.
     * @param {string} s UTF-8 string representation of the bytes.
     * @returns {Uint8Array} Byte array corresponding to the UTF-8 standard.
     */
    static from_string(s: string): Uint8Array {
        return sodium.from_string(s);
    }

    /**
     * Return -1, 0 or -1 depending on whether the bytes1 is less than,
     * equal or greater than bytes2.
     * @param {Uint8Array} bytes1 Byte array of any length.
     * @param {Uint8Array} bytes2 Byte array of same(?) length.
     * @returns {number} Comparison symbol.  Either -1, 0 or -1.
     */
    static compare(bytes1: Uint8Array, bytes2: Uint8Array): number {
        return sodium.compare(bytes1, bytes2);
    }

    // Promise will be resolved when the sodium library is finished initializing.
    static ready: Promise<void> = sodium.ready;
}; }
