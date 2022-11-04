import * as ed from '@noble/ed25519'
import localStorage from '../utils/localStorage'

const privateName = 'POSITIVE_COIN_PRIVATE_ED25519_KEY';
const publicName = 'POSITIVE_COIN_PUBLIC_ED25519_KEY';

export default {
  async generate() {
    const privateKey = ed.utils.randomPrivateKey();
    const publicKey = await ed.getPublicKey(privateKey);
    localStorage.setItem(privateName, ed.utils.bytesToHex(privateKey));
    localStorage.setItem(publicName, ed.utils.bytesToHex(publicKey));
  },
  async privateKey() {
    if (!localStorage.getItem(privateName)) await this.generate();
    return localStorage.getItem(privateName);
  },
  async publicKey() {
    if (!localStorage.getItem(publicName)) await this.generate();
    return localStorage.getItem(publicName);
  },
}