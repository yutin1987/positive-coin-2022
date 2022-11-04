import { z } from 'zod';
import * as ed from '@noble/ed25519';
import ed25519 from '../../../utils/serverKey';
import mixDNA from '../../../utils/mixDNA';
import ResponseError from '../../../utils/ResponseError';
import decodeFingerprint from '../../../utils/decodeFingerprint';
import withErrorsHandler from '../../../utils/withErrorsHandler';

const intputSchema = z.object({
  xFingerprint: z.string().regex(/^[0-9a-f]+$/i),
  xSignature: z.string().regex(/^[0-9a-f]+$/i),
  yFingerprint: z.string().regex(/^[0-9a-f]+$/i),
  ySignature: z.string().regex(/^[0-9a-f]+$/i),
});

export default withErrorsHandler({
  async POST(req) {
    const body = intputSchema.parse(req.body)

    if (
      await ed.verify(body.xSignature, body.xFingerprint, ed25519.publicKey) === false
      || await ed.verify(body.ySignature, body.yFingerprint, ed25519.publicKey) === false
    ) throw new ResponseError('invalid fingerprint', 400);

    const { dna: xDNA, counter: xCounter, publicKey: xPublicKey } = decodeFingerprint(body.xFingerprint);
    const { dna: yDNA, counter: yCounter, publicKey: yPublicKey } = decodeFingerprint(body.yFingerprint);

    if (xDNA === yDNA) throw new ResponseError('invalid fingerprint', 400);

    const xNewDNA = mixDNA(xDNA, yDNA);
    const yNewDNA = mixDNA(xDNA, yDNA);

    const now = new Date()
    const timestamp = [now.getUTCFullYear() - 2000, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getMinutes()];

    const xNewFingerprint = Uint8Array.from([...xNewDNA, xCounter +1 % 256, ...timestamp, ...xPublicKey])
    const yNewFingerprint = Uint8Array.from([...yNewDNA, yCounter +1 % 256, ...timestamp, ...yPublicKey])

    const xNewSignature = await ed.sign(xNewFingerprint, ed25519.privateKey);
    const yNewSignature = await ed.sign(yNewFingerprint, ed25519.privateKey);
    
    return {
      xFingerprint: ed.utils.bytesToHex(xNewFingerprint),
      xSignature: ed.utils.bytesToHex(xNewSignature),
      yFingerprint: ed.utils.bytesToHex(yNewFingerprint),
      ySignature: ed.utils.bytesToHex(yNewSignature),
    }
  },
});