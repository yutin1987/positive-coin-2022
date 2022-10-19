import * as ed from '@noble/ed25519';

export default {
  privateKey: ed.utils.hexToBytes(process.env.PRIVATE_ED25519_KEY),
  publicKey: ed.utils.hexToBytes(process.env.NEXT_PUBLIC_ED25519_KEY),
}