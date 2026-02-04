let instance = null;
class APIResponseCache {
  #responseCache = new Map();
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created");
    }
    instance = this;
  }

  /**
   *
   * @param {string} cacheKey
   * @param {object} cachedValue
   * @returns {boolean}  result of the caching
   */
  cacheResponse(cacheKey, cachedValue) {
    if (typeof cacheKey !== "string") {
      throw new Error("Passed Key is not a string.");
    }
    if (!cacheKey?.trim()) {
      throw new Error("Passed Key is empty or null");
    }

    this.#responseCache.set(cacheKey, {
      value: cachedValue,
      cachedDate: new Date(),
    });
    return true;
  }

  /**
   *
   * @param {string} cacheKey
   * @returns {object | null}
   */
  getCachedResponse(cacheKey) {
    if (this.#responseCache.has(cacheKey)) {
      if (this.#checkIfCacheExpired(cacheKey)) {
        this.#responseCache.delete(cacheKey);
        return null;
      }
      return this.#responseCache.get(cacheKey).value;
    }
    return null;
  }

  /**
   * @param {string} cachekey
   * @returns {boolean}
   */
  #checkIfCacheExpired(cacheKey) {
    const cachedDate = this.#responseCache.get(cacheKey).cachedDate;
    const currentDate = new Date();
    const divisor = 1000 * 60;
    const diff = (currentDate - cachedDate) / divisor;
    return diff >= CACHE_THRESHOLD_IN_MINUTES;
  }
}
const CACHE_THRESHOLD_IN_MINUTES = 2;
const apiCache = Object.freeze(new APIResponseCache());
export default apiCache;
