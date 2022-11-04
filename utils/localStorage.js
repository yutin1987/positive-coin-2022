const storage = new Map();

export default {
  setItem(key, value) {
    return typeof window !== 'undefined' ? window.localStorage.setItem(key, value) : storage.set(key, value);
  },
  getItem(key) {
    return typeof window !== 'undefined' ? window.localStorage.getItem(key) : storage.get(key);
  },
}