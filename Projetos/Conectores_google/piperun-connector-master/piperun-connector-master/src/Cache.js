/**
 * Constructor for DataCache.
 * More info on caching: https://developers.google.com/apps-script/reference/cache/cache
 *
 * @param {object} service - GDS caching service
 * @param {string} token - user token provided in the auth
 *
 * @return {object} DataCache.
 */
function DataCache(service) {
  this.service = service;
}

/** @const - 6 hours, Google's max */
DataCache.REQUEST_CACHING_TIME = 21600;

/** @const - 100 KB */
DataCache.MAX_CACHE_SIZE = 100 * 1024;

/**
 * Builds a cache key for given GDS request
 *
 * @return {String} cache key
 */
DataCache.prototype.buildChunkKey = function(prefix, chunkIndex) {
  return prefix + "_" + chunkIndex;
};

/**
 * Gets stored value
 *
 * @return {String}
 */
DataCache.prototype.get = function(prefix) {
  var value = "";
  var chunk = "";
  var chunkIndex = 0;

  do {
    var chunkKey = this.buildChunkKey(prefix, chunkIndex);
    chunk = this.service.get(chunkKey);
    append = chunk || "";
    value += append;
    chunkIndex++;
  } while (chunk && chunk.length == DataCache.MAX_CACHE_SIZE);

  return value;
};

DataCache.prototype.getByChunkKey = function(chunkKey) {
  return this.service.get(chunkKey);
};

/**
 * Stores value in cache.
 *
 * @param {String} key - cache key
 * @param {String} value
 */
DataCache.prototype.set = function(prefix, value) {
  var chunks = this.splitInChunks(value);

  for (var i = 0; i < chunks.length; i++) {
    var chunkKey = this.buildChunkKey(prefix, i);
    this.service.put(chunkKey, chunks[i], DataCache.REQUEST_CACHING_TIME);
  }
};

DataCache.prototype.splitInChunks = function(str) {
  var size = DataCache.MAX_CACHE_SIZE;
  var numChunks = Math.ceil(str.length / size);
  var chunks = new Array(numChunks);

  for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
};
