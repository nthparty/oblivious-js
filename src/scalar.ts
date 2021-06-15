declare const Buffer;
import { Sodium } from "./sodium";
import { Point } from "./point";

/**
 * Wrapper class for a bytes-like object that corresponds
 * to a scalar.
 */
export class Scalar extends Uint8Array {

    /**
     * Return scalar object corresponding to supplied bytes-like object.
     * No checking is performed to confirm that the bytes-like object
     * is a valid scalar.
     */
    constructor(bs: Uint8Array) {
        super(bs !== null ? bs as Scalar : Scalar.random());
    }

    /* Return random non-zero scalar object. */
    static random(): Scalar {
        return Sodium.rnd() as Scalar;
    }

    /**
     * Return scalar object obtained by transforming supplied bytes-like
     * object if it is possible to do; otherwise, return `null`.
     */
    static bytes(bs: Uint8Array): Scalar {
        const s = Sodium.scl(bs);
        return new Scalar(s !== null ? s : null);
    }

    /* Return scalar object by hashing supplied bytes-like object. */
    static hash(bs: Uint8Array): Scalar {
        let h: Uint8Array = Sodium.hash(bs);
        let s: Uint8Array = Sodium.scl(h);
        while (s === null) {
            h = Sodium.hash(h);
            s = Sodium.scl(h);
        }
        return new Scalar(s);
    }

    /* Convert Base64 UTF-8 string representation of a scalar to a scalar instance. */
    static from_base64(s: string): Scalar {
        return Buffer.from(s, 'base64');
    }

    /**
     * Return inverse of scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     */
    invert(this: Scalar): Scalar {
        return new Scalar(Sodium.inv(this));
    }

    /**
     * Return inverse of scalar modulo
     * 2**252 + 27742317777372353535851937790883648493.
     */
    inverse(this: Scalar): Scalar {
        return new Scalar(Sodium.inv(this));
    }

    /* Multiply supplied point or scalar by this scalar. */
    mul(this: Scalar, other: Scalar | Point): Scalar;

    /* A scalar cannot be on the right-hand side of a non-scalar. */
    mul(this: Point, other: Scalar): Scalar

    mul(this: any, other: any): any {
        if (this instanceof Point) {
            throw TypeError('scalar must be on left-hand side of multiplication operator');
        }
        if (other instanceof  Scalar) {
            return new Scalar(Sodium.smu(this, other));
        }
        if (other instanceof  Point) {
            return new Point(Sodium.mul(this, other));
        }
    }

    /* Convert to equivalent Base64 UTF-8 string representation. */
    to_base64(this): string {
        return Buffer.from(this).toString('base64');
    }
}
