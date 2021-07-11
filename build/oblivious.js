"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oblivious = void 0;
const sodium_1 = require("./sodium");
const elements_1 = require("./elements");
const sodium = require('libsodium-wrappers-sumo'); // tslint:disable-line:no-var-requires
const Sodium = sodium_1.Sodium_init(sodium);
const { Point, Scalar } = elements_1.Elements_init(Sodium);
/**
 * Wrapper class for primitive operations.
 */
class Oblivious {
}
exports.Oblivious = Oblivious;
Oblivious.Sodium = Sodium;
Oblivious.Point = Point;
Oblivious.Scalar = Scalar;
Oblivious.ready = Sodium.ready;
