declare const Buffer;
import { Sodium } from "./sodium";
import { Scalar } from "./scalar";

/**
 * Wrapper class for a bytes-like object that corresponds
 * to a point.
 */
export class Point extends Uint8Array {

    /**
     * Return point object corresponding to supplied bytes-like object.
     * No checking is performed to confirm that the bytes-like object
     * is a valid point.
     */
    constructor(bs: Uint8Array) {
        super(bs !== null ? bs : Point.random());
    }

    /* Return random point object. */
    static random(): Point {
        return Sodium.pnt(null) as Point;
    }

    /* Return point object obtained by transforming supplied bytes-like object. */
    static bytes(bs: Uint8Array): Point {
        return Sodium.pnt(bs) as Point;
    }

    /* Return point object by hashing supplied bytes-like object. */
    static hash(bs: Uint8Array): Point {
        return Sodium.pnt(Sodium.hash(bs)) as Point;
    }

    /**
     * Return base point multiplied by supplied scalar
     * if the scalar is valid; otherwise, return `null`.
     */
    static base(s: Scalar): Point {
        const p: Point = new Point(Sodium.bas(s));
        return (p !== null ? p : null);
    }

    /* Convert Base64 UTF-8 string representation of a point to a point instance. */
    static from_base64(s: string): Point {
        return Buffer.from(s, 'base64');
    }

    /* A point cannot be a left-hand argument. */
    static mul(_self: Point, _other: Scalar): Point {
        throw TypeError('point must be on right-hand side of multiplication operator');
    }

    /* Return point multiplied by supplied scalar. */
    mul(this: Point, other: Scalar): Point {
        return new Point(Sodium.mul(other, this));
    }

    /* Return sum of the supplied points. */
    add(this: Point, other: Point): Point {
        return new Point(Sodium.add(this, other));
    }

    /* Return result of subtracting second point from first point. */
    sub(this: Point, other: Point): Point {
        return new Point(Sodium.sub(this, other));
    }

    /* Convert to equivalent Base64 UTF-8 string representation. */
    to_base64(this: Point): string {
        return Buffer.from(this).toString('base64');
    }
}
