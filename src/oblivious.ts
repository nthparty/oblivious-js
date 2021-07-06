import { Sodium_init } from './sodium';
import { Elements_init } from './elements';

const sodium = require('libsodium-wrappers-sumo');  // tslint:disable-line:no-var-requires

const Sodium = Sodium_init(sodium);
const { Point, Scalar } = Elements_init(Sodium);

/**
 * Wrapper class for primitive operations.
 */
export class Oblivious {
    public static Sodium: typeof Sodium = Sodium;
    public static Point: typeof Point = Point;
    public static Scalar: typeof Scalar = Scalar;
    public static ready: Promise<void> = Sodium.ready;
}
