import os from 'os';

const B58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

let serial = 0;

export const TYPES = {
  EVENT: 5,
  MEMBER: 10,
  INVITATION: 16,
  COIN: 20,
  REGISTRATION: 30,
  REGISTRATION_HISTORY: 31,
  RATING: 40,
};

export default function uniqid(typeId = 0) {
  let key = '';

  key += B58_ALPHABET.charAt(typeId % 58);

  // process.pid
  key += B58_ALPHABET.charAt(process.pid % 58);
  key += B58_ALPHABET.charAt(Math.floor(process.pid / 58) % 58);

  // mac address
  const networkInterfaces = os.networkInterfaces();
  for (let name in networkInterfaces) {
    const networkInterface = networkInterfaces[name];
    if (networkInterface[0].mac === '00:00:00:00:00:00') continue;
    key += B58_ALPHABET.charAt(networkInterface[0].mac.substring(15, 17) % 58);
    key += B58_ALPHABET.charAt(networkInterface[0].mac.substring(12, 14) % 58);
    break;
  }
  
  // serial
  serial += 1;
  if (serial > 3363) serial = 0;
  key += B58_ALPHABET.charAt(serial % 58);
  key += B58_ALPHABET.charAt(Math.floor(serial / 58) % 58);

  key += B58_ALPHABET.charAt(Math.floor(Math.random() * 58));
  key += B58_ALPHABET.charAt(Math.floor(Math.random() * 58));
  key += B58_ALPHABET.charAt(Math.floor(Math.random() * 58));
  key += B58_ALPHABET.charAt(Math.floor(Math.random() * 58));

  return key;
}
