import _ from 'lodash';
import { z } from 'zod';
import * as ed from '@noble/ed25519';
import ed25519 from '../../../utils/serverKey';
import withErrorsHandler from '../../../utils/withErrorsHandler';

const DNA_SAMPLE = [0x11, 0x22, 0x44, 0x88];

const intputSchema = z.object({
  publicKey: z.string().regex(/^[0-9a-f]+$/i),
});

export default withErrorsHandler({
  async POST(req) {
    const body = intputSchema.parse(req.body)

    const now = new Date()
    const dna = Array(32).fill(_.sample(DNA_SAMPLE));
    const counter = [0];
    const timestamp = [now.getUTCFullYear() - 2000, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getMinutes()];

    const fingerprint = Uint8Array.from([...dna, ...counter,...timestamp, ...ed.utils.hexToBytes(body.publicKey)])

    const signature = await ed.sign(fingerprint, ed25519.privateKey);

    return {
      fingerprint: ed.utils.bytesToHex(fingerprint),
      signature: ed.utils.bytesToHex(signature),
    }
  },
});