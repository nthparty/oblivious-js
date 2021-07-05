declare const Buffer: any;
import { Sodium } from './sodium';
import { Scalar } from './scalar';

/**
 * Wrapper class for a bytes-like object that corresponds
 * to a point.
 */
export class Point extends Uint8Array {

    /**
     * Return point object corresponding to supplied bytes-like object.
     * No checking is performed to confirm that the bytes-like object
     * is a valid point.
     * @param {Uint8Array} bs Byte array representing a Ristretto255 point.
     * @returns {Point} New Ristretto255 point object.
     */
    constructor(bs: Uint8Array) {
        super(bs !== null ? bs : Sodium.pnt(null));
    }

    /**
     * Return random point object.
     * @returns {Point} Ristretto255 point object.
     */
    static random(): Point {
        return new Point(null);
    }

    /**
     * Return point object obtained by transforming supplied bytes-like object.
     * @param {Uint8Array} bs Byte array representing a Ristretto255 point.
     * @returns {Point} Ristretto255 point object.
     */
    static bytes(bs: Uint8Array): Point {
        return new Point(Sodium.pnt(bs));
    }

    /**
     * Return point object by hashing supplied bytes-like object.
     * @param {Uint8Array} bs Byte array to hash to point.
     * @returns {Point} Ristretto255 point object.
     */
    static hash(bs: Uint8Array): Point {
        return new Point(Sodium.pnt(Sodium.hash(bs)));
    }

    /**
     * Return base point multiplied by supplied scalar
     * if the scalar is valid; otherwise, return `null`.
     * @param {Scalar} s Scalar multiplicand.
     * @returns {Point} Ristretto255 point object.
     */
    static base(s: Scalar): Point {
        const p: Point = new Point(Sodium.bas(s));
        return (p !== null ? p : null);
    }

    /**
     * Convert Base64 UTF-8 string representation of a point to a point instance.
     * @param {string} s Base64 UTF-8 string representation of a point.
     * @returns {Point} Ristretto255 point object.
     */
    static from_base64(s: string): Point {
        return Buffer.from(s, 'base64');
    }

    /**
     * A point cannot be a left-hand argument.
     * @param {Point} _this Ristretto255 point object.
     * @param {Scalar} _other Ristretto255 scalar object.
     * @returns {Point} Ristretto255 point object placeholder (method throws error).
     */
    static mul(_this: Point, _other: Scalar): Point {
        throw TypeError('point must be on right-hand side of multiplication operator');
    }

    /**
     * Return point multiplied by supplied scalar.
     * @param {Scalar} other Ristretto255 scalar object.
     * @returns {Point} Product point.
     */
    mul(this: Point, other: Scalar): Point {
        return new Point(Sodium.mul(other, this));
    }

    /**
     * Return sum of the supplied points.
     * @param {Point} other Ristretto255 point object.
     * @returns {Point} Point sum.
     */
    add(this: Point, other: Point): Point {
        return new Point(Sodium.add(this, other));
    }

    /**
     * Return result of subtracting second point from first point.
     * @param {Point} other Ristretto255 point object.
     * @returns {Point} Point difference.
     */
    sub(this: Point, other: Point): Point {
        return new Point(Sodium.sub(this, other));
    }

    /**
     * Convert to equivalent Base64 UTF-8 string representation.
     * @returns {string} Base64 UTF-8 string representation of the point.
     */
    to_base64(this: Point): string {
        return Buffer.from(this).toString('base64');
    }
}
