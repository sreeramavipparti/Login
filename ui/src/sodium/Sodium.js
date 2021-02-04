import { SodiumPlus, CryptographyKey } from 'sodium-plus';
async function enc(message, nonce, key) {
  let sodium = await SodiumPlus.auto();
  let k = await sodium.sodium_hex2bin(key);
  let ky = CryptographyKey.from(k);
  let n = await sodium.sodium_hex2bin(nonce);
  let cphr = await sodium.crypto_secretbox(message, n, ky);
  let cipher = await sodium.sodium_bin2hex(cphr);
  return cipher;
} // async function enc
