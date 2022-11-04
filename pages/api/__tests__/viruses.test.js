import { createMocks } from 'node-mocks-http';
import userKey from '../../../utils/userKey';
import viruses from '../viruses';

describe('[POST] viruses', () => {
  test('successfully create virus', async () => {
    const publicKey = await userKey.publicKey();
    const { req, res } = createMocks({
      method: 'POST',
      body: { publicKey },
    });
    await viruses(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: 'ok',
      result: expect.objectContaining({
        fingerprint: expect.stringMatching(/^[0-9a-f]+$/i),
        signature: expect.stringMatching(/^[0-9a-f]+$/i),
      }),
    });
  });
});
