import uniqid from '../uniqid';

describe('[utils] uniqid', () => {
  test('generate new uniqid', async () => {
    const id = uniqid();
    expect(id.length).toBe(11);
  });
});