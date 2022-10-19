import * as ed from '@noble/ed25519'
import localStorage from '../utils/localStorage'

const privateKey = 'POSITIVE_COIN_PRIVATE_ED25519_KEY';
const publicKey = 'POSITIVE_COIN_PUBLIC_ED25519_KEY';

export default {
  async generate() {
    const privateKey = ed.utils.randomPrivateKey();
    const publicKey = await ed.getPublicKey(privateKey);
    localStorage.setItem(privateKey, ed.utils.bytesToHex(privateKey));
    localStorage.setItem(publicKey, ed.utils.bytesToHex(publicKey));
  },
  async privateKey() {
    if (!localStorage.getItem(privateKey)) await this.generate();
    return localStorage.getItem(privateKey);
  },
  async publicKey() {
    if (!localStorage.getItem(publicKey)) await this.generate();
    return localStorage.getItem(publicKey);
  },
}