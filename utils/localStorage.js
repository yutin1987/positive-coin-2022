export default {
  setItem(key, value) {
    return window.localStorage.setItem(key, value);
  },
  getItem(key) {
    return window.localStorage.getItem(key);
  },
}