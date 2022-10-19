import { serialize } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const maxAge = 60 * 60 * 24 * 14;
  res.setHeader('Set-Cookie', serialize(name, String(value), {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge * 1000),
    maxAge,
  }));
}
