import { Sodium } from './sodium';
import { Point } from './point';
import { Scalar } from './scalar';

/**
 * Wrapper class for primitive operations.
 */
export class Oblivious {
    public static Sodium = Sodium;
    public static Point = Point;
    public static Scalar = Scalar;
    public static ready: Promise<void> = Sodium.ready;
}
