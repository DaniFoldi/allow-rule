import { getRandomValues } from 'crypto'

// Based on https://gist.github.com/helloimalastair/9143e9d43f4a641b23ebddfa11cefeff

// TODO workers compatible random number generator
/*// Compressed Version, to be used with a bundler, or in module mode. Use this for everything except debugging. Size: 617 Bytes
export default async t=>{const n=new Int32Array(20),r=(await(await fetch("https://drand.cloudflare.com/public/latest")).json()).signature;crypto.getRandomValues(n);const a=function(t){for(var n=0,r=1779033703^t.length;n<t.length;n++)r=(r=Math.imul(r^t.charCodeAt(n),3432918353))<<13|r>>>19;return function(){return r=Math.imul(r^r>>>16,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^=r>>>16)>>>0}}((void 0===t?null:t.toString())+crypto.toString()+r+Date.now());return o=a(),e=a(),u=a(),c=a(),function(){var t=e<<9,n=5*o;return c^=e,e^=u^=o,o^=c,u^=t,c=c<<11|c>>>21,((n=9*(n<<7|n>>>25))>>>0)/4294967296};var o,e,u,c};
// Compressed Version, inline edition. To be used if you are using the browser editor, or you aren't using a bundler. Size: 621 Bytes
const BetterRand = async t=>{const n=new Int32Array(20),r=(await(await fetch("https://drand.cloudflare.com/public/latest")).json()).signature;crypto.getRandomValues(n);const a=function(t){for(var n=0,r=1779033703^t.length;n<t.length;n++)r=(r=Math.imul(r^t.charCodeAt(n),3432918353))<<13|r>>>19;return function(){return r=Math.imul(r^r>>>16,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^=r>>>16)>>>0}}((void 0===t?null:t.toString())+crypto.toString()+r+Date.now());return o=a(),e=a(),u=a(),c=a(),function(){var t=e<<9,n=5*o;return c^=e,e^=u^=o,o^=c,u^=t,c=c<<11|c>>>21,((n=9*(n<<7|n>>>25))>>>0)/4294967296};var o,e,u,c};
// Expanded Version, to be used for debugging.
function xmur3(str) {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 3432918353), h = h << 13 | h >>> 19;
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
}

function xoshiro128(a: Number, b: Number, c: Number, d: Number) {
  return function() {
    var t = b << 9, r = a * 5; r = (r << 7 | r >>> 25) * 9;
    c ^= a; d ^= b;
    b ^= c; a ^= d; c ^= t;
    d = d << 11 | d >>> 21;
    return (r >>> 0) / 4294967296;
  }
}

const out = async s => {
   const drand=(await(await fetch("https://drand.cloudflare.com/public/latest")).json()).signature;
   const seed=xmur3((s===undefined?null:s.toString())+crypto.getRandomValues(new Uint8Array(10)).toString()+drand+Date.now());
   return xoshiro128(seed(),seed(),seed(),seed());
};

export default out; // Only use this line when in ESM mode.

*/