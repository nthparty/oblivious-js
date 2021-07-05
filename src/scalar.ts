declare const Buffer: any;
import { Sodium } from './sodium';
import { Point } from './point';

/**
 * Wrapper class for a bytes-like object that corresponds
 * to a scalar.
 */
export class Scalar extends Uint8Array {

    /**
     * Return scalar object corresponding to supplied bytes-like object.
     * No checking is performed to confirm that the bytes-like object
     * is a valid scalar.
     * @param {Uint8Array} bs Byte array representing a Ristretto255 scalar.
     * @returns {Scalar} New Ristretto255 scalar object.
     */
    constructor(bs: Uint8Array) {
        if (bs !== null) {
            const s = Sodium.scl(bs);
            if (s == null) {
                throw TypeError('Invalid scalar.');
            } else {
                super(s);
            }
        } else {
            super(bs !== null ? bs : Sodium.rnd());
        }
    }

    /**
     * Return random non-zero scalar object.
     * @returns {Scalar} Ristretto255 scalar object.
     */
    static random(): Scalar {
        return new Scalar(Sodium.rnd());
    }

    /**
     * Return scalar object obtained by transforming supplied bytes-like
     * object if it is possible to do; otherwise, return `null`.
     * @param {Uint8Array} bs Byte array representing a candidate Ristretto255 scalar.
     * @returns {Scalar} New Ristretto255 scalar object.
     */
    static bytes(bs: Uint8Array): Scalar {
        const s = Sodium.scl(bs);
        return new Scalar(s !== null ? s : null);
    }

    /**
     * Return scalar object by hashing supplied bytes-like object.
     * @param {Uint8Array} bs Byte array to hash to scalar.
     * @returns {Scalar} Ristretto255 scalar object.
     */
    static hash(bs: Uint8Array): Scalar {
        let h: Uint8Array = Sodium.hash(bs);
        let s: Uint8Array = Sodium.scl(h);
        while (s === null) {
            h = Sodium.hash(h);
            s = Sodium.scl(h);
        }
        return new Scalar(s);
    }

    /**
     * Convert Base64 UTF-8 string representation of a scalar to a scalar instance.
     * @param {string} s Base64 UTF-8 string representation of a scalar.
     * @returns {Scalar} Ristretto255 scalar object.
     */
    static from_base64(s: string): Scalar {
        return Buffer.from(s, 'base64');
    }

    /**
     * Return inverse of scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     * @returns {Scalar} Scalar inverse over L.
     */
    invert(this: Scalar): Scalar {
        return new Scalar(Sodium.inv(this));
    }

    /**
     * Return inverse of scalar modulo (alias of `.invert()`)
     * 2**252 + 27742317777372353535851937790883648493.
     * @returns {Scalar} Scalar inverse over L.
     */
    inverse(this: Scalar): Scalar {
        return this.invert();
    }

    /**
     * Add supplied scalar to this scalar.
     * @param {Scalar} other Ristretto255 scalar object.
     * @returns {Scalar} Scalar sum.
     */
    add(this: Scalar, other: Scalar): Scalar {
        return new Scalar(Sodium.sad(this, other));
    }

    /**
     * Subtract supplied scalar by this scalar.
     * @param {Scalar} other Ristretto255 scalar object.
     * @returns {Scalar} Scalar difference.
     */
    sub(this: Scalar, other: Scalar): Scalar {
        return new Scalar(Sodium.ssb(this, other));
    }

    /**
     * Multiply supplied point or scalar by this scalar.
     * @param {Scalar | Point} other Ristretto255 point object or scalar object.
     * @returns {Scalar | Point} Point scalar product or product of scalars.
     */
    mul(this: Scalar, other: Scalar | Point): Scalar | Point;

    /**
     * A scalar cannot be on the right-hand side of a non-scalar.
     * @param {Scalar} other Ristretto255 scalar object.
     * @returns {Scalar} (Method throws error.)
     */
    mul(this: Point, other: Scalar): Scalar

    mul(this: any, other: any): any {
        if (this instanceof Point) {
            throw TypeError('scalar must be on left-hand side of multiplication operator');
        }
        if (other instanceof Scalar) {
            return new Scalar(Sodium.smu(this, other));
        }
        if (other instanceof Point) {
            return new Point(Sodium.mul(this, other));
        }
    }

    /**
     * Convert to equivalent Base64 UTF-8 string representation.
     * @returns {string} Base64 UTF-8 string representation of the scalar.
     */
    to_base64(this: any): string {
        return Buffer.from(this).toString('base64');
    }
}
