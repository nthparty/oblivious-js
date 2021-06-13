declare const Buffer;
declare const crypto;
import { Sodium } from "./Sodium";
import { Scalar } from "./scalar";

/**
 * Wrapper class for a bytes-like object that corresponds
 * to a point.
 */
export class Point extends Uint8Array {

    /* Return random point object. */
    static random(): Point {
        return Sodium.pnt(null);
    };

    /* Return point object obtained by transforming supplied bytes-like object. */
    static bytes(bs: Uint8Array): Point {
        return Sodium.pnt(bs);
    };

    /* Return point object by hashing supplied bytes-like object. */
    static hash(bs: Uint8Array): Point {
        return Sodium.pnt(
            crypto.createHash('sha512').digest('sha512', bs)
        );
    };

    /**
     * Return base point multiplied by supplied scalar
     * if the scalar is valid; otherwise, return `null`.
     */
    static base(s: Point): Point {
        const p: Point = Sodium.bas(s);
        return (p !== null ? p : null);
    };

    /* Convert Base64 UTF-8 string representation of a point to a point instance. */
    static from_base64(s: string): Point {
        return Buffer.from(s, 'base64');
    };

    /**
     * Return point object corresponding to supplied bytes-like object.
     * No checking is performed to confirm that the bytes-like object
     * is a valid point.
     */
    static new(bs): Point {
        return (bs !== null ? bs : this.random());
    };

    /* A point cannot be a left-hand argument. */
    static mul(this: Point, other: Scalar): Point {
        throw TypeError('point must be on right-hand side of multiplication operator');
    };

    /* Return point multiplied by supplied scalar. */
    static rmul(this: Point, other: Scalar): Point {
        return Point.new(Sodium.mul(other, this));
    };

    /* Return sum of the supplied points. */
    static add(this: Point, other: Point): Point {
        return Point.new(Sodium.add(this, other));
    };

    /* Return result of subtracting second point from first point. */
    static sub(this: Point, other: Point): Point {
        return Point.new(Sodium.sub(this, other));
    };

    /* Convert to equivalent Base64 UTF-8 string representation. */
    static to_base64(this: Point): string {
        return Buffer.from(this).toString('base64');
    };
};
