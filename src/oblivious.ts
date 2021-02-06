import sodium = require('libsodium-wrappers-sumo');

export class oblivious {

  /**
   * Turn a 64-byte array into a valid point (without hashing it).
   * @param {Uint8Array} bytes Input byte array.
   * @returns {Uint8Array} Byte array representing an Ed25519 point.
   */
  static pnt(bytes: Uint8Array): Uint8Array {
    return sodium.crypto_core_ristretto255_from_hash(bytes);
  }

  /**
   * Return random non-zero scalar.
   * @returns {Uint8Array} Byte array representing an Ed25519 scalar.
   */
  static rnd(): Uint8Array {
    return sodium.crypto_core_ristretto255_scalar_random();
  }

  /**
   * Return product of the supplied point and scalar.
   * @param {Uint8Array} s Byte array representing a scalar.
   * @param {Uint8Array} p Byte array representing a point.
   * @returns {Uint8Array} Byte array representing product point.
   */
  static mul(s: Uint8Array, p: Uint8Array): Uint8Array {
    return sodium.crypto_core_ristretto255_scalar_mul(s, p);
  }
}
