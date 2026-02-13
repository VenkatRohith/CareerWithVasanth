let apiCacheMap = new Map();
let instance = null;

class APICache {
  constructor() {
    if (instance !== null) {
      throw Error(
        "Can't create a new instance of the service as it is a singleton",
      );
    }
    instance = this;
  }

  /**
   *
   * @param {string} key
   * @returns {boolean}
   */
  isDataCached(key) {
    if (typeof key !== "string" || key.trim() === "") {
      throw Error("Invalid key");
    }
    return apiCacheMap.has(key);
  }

  /**
   *
   * @param {string} key
   * @param {object} data
   * @returns {boolean}
   */
  cacheData(key, data) {
    apiCacheMap.set(key, data);
    return true;
  }

  /**
   *
   * @param {string} key
   * @returns {object | null}
   */
  getCachedData(key) {
    if (typeof key !== "string" || key.trim() === "") {
      throw Error("Invalid key");
    }
    if (!this.isDataCached(key)) {
      return null;
    }
    return apiCacheMap.get(key);
  }

  /**
   *
   * @param {string} key
   * @returns {boolean}
   */
  clearSpecificCache(key) {
    if (typeof key !== "string" || key.trim() === "") {
      throw Error("Invalid key");
    }

    if (!apiCacheMap.has(key)) {
      return false;
    }

    apiCacheMap.delete(key);
    return true;
  }

  /**
   * @returns {boolean}
   */
  clearEntireCache() {
    apiCacheMap.clear();
    return true;
  }
}

const apiCacheService = new APICache();

export default apiCacheService;
