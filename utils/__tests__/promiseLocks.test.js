import promiseLocks from '../promiseLocks';

describe('[utils] promiseLocks', () => {
  test('when all promises is resolve', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback = await promiseLocks([
      Promise.resolve(callback1),
      Promise.resolve(callback2),
    ]);

    expect(callback1).not.toBeCalled();
    expect(callback2).not.toBeCalled();

    await callback();

    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
  });
  test('when has a promise is reject', async () => {
    expect.assertions(3);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    try {
      await promiseLocks([
        Promise.resolve(callback1),
        Promise.reject(new Error('promise error')),
      ]);
    } catch (error) {
      expect(error).toEqual(new Error('promise error'));
    }

    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(0);
  });
});