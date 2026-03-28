const PREFIX = 'the-work::';

const storage = {
  async get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) throw new Error('Key not found');
      return { key, value: raw, shared: false };
    } catch (e) {
      throw e;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    } catch (e) {
      throw e;
    }
  },
  async delete(key) {
    localStorage.removeItem(PREFIX + key);
    return { key, deleted: true, shared: false };
  },
  async list(prefix = '') {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith(PREFIX + prefix)) {
        keys.push(k.slice(PREFIX.length));
      }
    }
    return { keys, prefix, shared: false };
  }
};

// Make it available globally like Claude's runtime does
window.storage = storage;

export default storage;
