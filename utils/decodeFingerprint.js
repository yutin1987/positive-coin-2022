import * as ed from '@noble/ed25519';

export default function decodeFingerprint(fingerprint) {
  const result = {
    dna: ed.utils.hexToBytes(fingerprint.substring(0, 64)),
    counter: ed.utils.hexToBytes(fingerprint.substring(64, 66))[0],
    timestamp: ed.utils.hexToBytes(fingerprint.substring(66, 76)),
    publicKey: ed.utils.hexToBytes(fingerprint.substring(76)),
  };

  return result;
}