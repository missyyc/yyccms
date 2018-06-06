import jsSHA from "jssha";
// const sha256 = new jsSHA("SHA-256", "TEXT");

export default function jsSHA256(str) {
    let jssha256 = new jsSHA("SHA-256", "TEXT");
    jssha256.update(str);
  return jssha256.getHash('HEX');
};