// tslint:disable:max-classes-per-file

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function Elements_init(Sodium: any): {'Point': any, 'Scalar': any } {
    /**
     * Wrapper class for a bytes-like object that corresponds
     * to a point.
     */
    class Point extends Uint8Array {

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
         * @property
         */
        static base(s: Scalar): Point {
            const p: Point = new Point(Sodium.bas(s));
            return (p !== null ? p : null);
        }

        /**
         * Convert Base64 UTF-8 string representation of a point to a `Point` instance.
         * @param {string} s Base64 UTF-8 string representation of a point.
         * @returns {Point} Ristretto255 point object.
         */
        static from_base64(s: string): Point {
            return new Point(Sodium.from_base64(s));
        }

        /**
         * Convert hexadecimal representation of a point to a `Point` instance.
         * @param {string} hex Hexadecimal representation of a point.
         * @returns {Point} Ristretto255 point object.
         */
        static from_hex(hex: string): Point {
            return new Point(Sodium.from_hex(hex));
        }

        /**
         * Convert Base64 UTF-8 string representation of a point to a `Point` instance.
         * @param {string} s Base64 UTF-8 string representation of a point.
         * @returns {Point} Ristretto255 point object.
         */
        static from_string(s: string): Point {
            return new Point(Sodium.from_string(s));
        }

        /**
         * A point cannot be a left-hand argument.
         * @param {Point} _this Ristretto255 point object.
         * @param {Scalar} _other Ristretto255 scalar object.
         * @returns {Point} Ristretto255 point object placeholder (method throws error).
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            return Sodium.to_base64(this);
        }

        /**
         * Convert to equivalent hexadecimal UTF-8 string representation.
         * @returns {string} Hexadecimal UTF-8 string representation of the point.
         */
        to_hex(this: Point): string {
            return Sodium.to_hex(this);
        }

        /**
         * Convert to equivalent UTF-8 string representation.
         * @returns {string} UTF-8 string representation of the point.
         */
        to_string(this: Point): string {
            return Sodium.to_string(this);
        }
    }

    /**
     * Wrapper class for a bytes-like object that corresponds
     * to a scalar.
     */
    class Scalar extends Uint8Array {

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
                super(Sodium.rnd());
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
         * Convert Base64 UTF-8 string representation of a scalar to a `Scalar` instance.
         * @param {string} s Base64 UTF-8 string representation of a scalar.
         * @returns {Scalar} Ristretto255 scalar object.
         */
        static from_base64(s: string): Scalar {
            return new Scalar(Sodium.from_base64(s));
        }

        /**
         * Convert hexadecimal representation of a scalar to a `Scalar` instance.
         * @param {string} hex Hexadecimal representation of a scalar.
         * @returns {Point} Ristretto255 scalar object.
         */
        static from_hex(hex: string): Scalar {
            return new Scalar(Sodium.from_hex(hex));
        }

        /**
         * Convert Base64 UTF-8 string representation of a scalar to a `Scalar` instance.
         * @param {string} s Base64 UTF-8 string representation of a scalar.
         * @returns {Point} Ristretto255 scalar object.
         */
        static from_string(s: string): Scalar {
            return new Scalar(Sodium.from_string(s));
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
        mul(this: Point, other: Scalar): Scalar;

        mul(this: Point | Scalar, other: Point | Scalar): Point | Scalar {
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
        to_base64(this: Scalar): string {
            return Sodium.to_base64(this);
        }

        /**
         * Convert to equivalent hexadecimal UTF-8 string representation.
         * @returns {string} Hexadecimal UTF-8 string representation of the scalar.
         */
        to_hex(this: Scalar): string {
            return Sodium.to_hex(this);
        }

        /**
         * Convert to equivalent UTF-8 string representation.
         * @returns {string} UTF-8 string representation of the scalar.
         */
        to_string(this: Scalar): string {
            return Sodium.to_string(this);
        }
    }

    return { Point, Scalar };
}
