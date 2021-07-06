var Oblivious;(()=>{"use strict";var t={228:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Elements_init=void 0,r.Elements_init=function(t){class r extends Uint8Array{constructor(r){super(null!==r?r:t.pnt(null))}static random(){return new r(null)}static bytes(e){return new r(t.pnt(e))}static hash(e){return new r(t.pnt(t.hash(e)))}static base(e){const s=new r(t.bas(e));return null!==s?s:null}static from_base64(t){return Buffer.from(t,"base64")}static mul(t,r){throw TypeError("point must be on right-hand side of multiplication operator")}mul(e){return new r(t.mul(e,this))}add(e){return new r(t.add(this,e))}sub(e){return new r(t.sub(this,e))}to_base64(){return Buffer.from(this).toString("base64")}}class e extends Uint8Array{constructor(r){if(null!==r){const e=t.scl(r);if(null==e)throw TypeError("Invalid scalar.");super(e)}else super(t.rnd())}static random(){return new e(t.rnd())}static bytes(r){const s=t.scl(r);return new e(null!==s?s:null)}static hash(r){let s=t.hash(r),n=t.scl(s);for(;null===n;)s=t.hash(s),n=t.scl(s);return new e(n)}static from_base64(t){return Buffer.from(t,"base64")}invert(){return new e(t.inv(this))}inverse(){return this.invert()}add(r){return new e(t.sad(this,r))}sub(r){return new e(t.ssb(this,r))}mul(s){if(this instanceof r)throw TypeError("scalar must be on left-hand side of multiplication operator");return s instanceof e?new e(t.smu(this,s)):s instanceof r?new r(t.mul(this,s)):void 0}to_base64(){return Buffer.from(this).toString("base64")}}return{Point:r,Scalar:e}}},634:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Sodium_init=void 0,r.Sodium_init=function(t){var r;return(r=class r extends Uint8Array{constructor(t){super(t)}static rnd(){return t.crypto_core_ristretto255_scalar_random()}static scl(r){if(null===r)return this.rnd();r.length>32&&(r=t.crypto_core_ristretto255_scalar_reduce(r));const e=new Uint8Array(32).fill(0),s=t.crypto_core_ristretto255_scalar_add(r,e);return 0===t.compare(r,s)&&1===t.compare(r,e)?r:null}static inv(r){return t.crypto_core_ristretto255_scalar_invert(r)}static smu(r,e){return t.crypto_core_ristretto255_scalar_mul(r,e)}static pnt(e){return t.crypto_core_ristretto255_from_hash(r.hash(null===e?r.rnd():e))}static bas(r){return t.crypto_scalarmult_ristretto255_base(r)}static sad(r,e){return t.crypto_core_ristretto255_scalar_add(r,e)}static ssb(r,e){return t.crypto_core_ristretto255_scalar_sub(r,e)}static mul(r,e){return t.crypto_scalarmult_ristretto255(r,e)}static add(r,e){return t.crypto_core_ristretto255_add(r,e)}static sub(r,e){return t.crypto_core_ristretto255_sub(r,e)}static hash(r){return t.crypto_hash_sha512(r)}static to_hex(r){return t.to_hex(r)}static from_hex(r){return t.from_hex(r)}static compare(r,e){return t.compare(r,e)}}).ready=t.ready,r}}},r={};function e(s){var n=r[s];if(void 0!==n)return n.exports;var i=r[s]={exports:{}};return t[s](i,i.exports,e),i.exports}var s={};(()=>{var t=s;t.ObliviousSlim=void 0;const r=e(634),n=e(228);t.ObliviousSlim=function(t){var e;const s=r.Sodium_init(t),{Point:i,Scalar:a}=n.Elements_init(s);return(e=class{}).Sodium=s,e.Point=i,e.Scalar=a,e.ready=s.ready,e}})(),Oblivious=s.ObliviousSlim})();