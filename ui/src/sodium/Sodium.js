import { SodiumPlus, CryptographyKey } from 'sodium-plus';
const key = "93ef662b41f24974dc21648969914087e1d4dd6390a68a1425ece159ef082c3b";
async function enc1(message, nonce) {
  let sodium = await SodiumPlus.auto();
  let k = await sodium.sodium_hex2bin(key);
  let ky = CryptographyKey.from(k);
  let n = await sodium.sodium_hex2bin(nonce);
  let cphr = await sodium.crypto_secretbox(message, n, ky);
  let cipher = await sodium.sodium_bin2hex(cphr);
  return cipher;
} // async function enc

async function enc2(msg1, msg2, nonce) {
  let sodium = await SodiumPlus.auto();
  let k = await sodium.sodium_hex2bin(key);
  let ky = CryptographyKey.from(k);
  let n = await sodium.sodium_hex2bin(nonce);
  let cphr = await sodium.crypto_secretbox(msg1, n, ky);
  let cipher1 = await sodium.sodium_bin2hex(cphr);
  cphr = await sodium.crypto_secretbox(msg2, n, ky);
  let cipher2 = await sodium.sodium_bin2hex(cphr);
  return [cipher1, cipher2];
} // async function enc

var Sodium = {enc1, enc2}
export default (Sodium);