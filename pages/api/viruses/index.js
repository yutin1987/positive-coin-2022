import { z } from 'zod';
import * as ed from '@noble/ed25519';
import ed25519 from '../../../utils/serverKey';
import withErrorsHandler from '../../../utils/withErrorsHandler';

const DNA_SAMPLE = [0x11, 0x22, 0x33, 0x44];

const intputSchema = z.object({
  publicKey: z.string().regex(/^[0-9a-f]+$/i),
});

export default withErrorsHandler({
  async POST(req) {
    const body = intputSchema.parse(req.body)

    const now = new Date()
    const dna = Uint8Array.from(Array(32).fill(_.sample(DNA_SAMPLE)));
    const timestamp = [now.getUTCFullYear() - 2000, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getMinutes()];

    const signature = await ed.sign(
      Uint8Array.from(...dna, ...timestamp, ...ed.utils.hexToBytes(publicKey)),
      ed25519.privateKey,
    );
    
    return {
      dna: ed.utils.bytesToHex(dna),
      timestamp: ed.utils.bytesToHex(timestamp),
      signature: ed.utils.bytesToHex(signature),
    }
  },
});