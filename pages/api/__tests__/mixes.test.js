import { createMocks } from 'node-mocks-http';
import mixes from '../mixes';

describe('[POST] mixes', () => {
  test('successfully mix', async () => {
    const xFingerprint = '444444444444444444444444444444444444444444444444444444444444444400160a040e30a7c02cc4dcc8be571d91a924b07849feb8995eda5cbbf93ca5cd368eaa0c3cea';
    const xSignature = '62a02198c704d5981a9d165781ba86b940dafbf9efd077704d21b840dfc35e711c4d898c0bba24d5b18037daca1b2ca84a2a714fc1f4710f05bb8d040bbd8a05';
    const yFingerprint = '333333333333333333333333333333333333333333333333333333333333333300160a040e31adb193acfbe59ef22790ef7c736134018510908702906179fdc9d5b06a080b2f';
    const ySignature = '687b6a735c8636e0b3608719c58be8fcd19395f6ef05db16a9b0b8e9eff35ab9bdb3c222ec2efcf4062377d8910b137c031d0b7e03befad7bbd223a4d890e201';

    const { req, res } = createMocks({
      method: 'POST',
      body: { xFingerprint, xSignature, yFingerprint, ySignature },
    });
    await mixes(req, res)
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: 'ok',
      result: expect.objectContaining({
        xFingerprint: expect.stringMatching(/^[0-9a-f]+$/i),
        xSignature: expect.stringMatching(/^[0-9a-f]+$/i),
        yFingerprint: expect.stringMatching(/^[0-9a-f]+$/i),
        ySignature: expect.stringMatching(/^[0-9a-f]+$/i),
      }),
    });
  });
});