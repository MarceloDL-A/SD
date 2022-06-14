function Url() {
  this.options = {
    path: "deals",
    page: 1,
    show: 5,
    with: [],
    filters: {},
  };
}

Url.prototype.BASE_URL = "https://api.pipe.run/v1/";

Url.prototype.MAX_SHOW = 200;

Url.prototype.VALID_PATHS = ["deals"];

Url.prototype.page = function(page) {
  var p = parseInt(page);
  if (!p || p <= 0) {
    throw new InvalidArgumentException(
      "Page must be an integer greater than 0."
    );
  }
  this.options.page = p;
  return this;
};

Url.prototype.show = function(show) {
  var s = parseInt(show);
  if (!s || s <= 0) {
    throw new InvalidArgumentException(
      "Show must be an integer greater than 0."
    );
  }

  if (s > this.MAX_SHOW) {
    throw new InvalidArgumentException(
      "Show is limited to a max of 200 data entries"
    );
  }

  this.options.show = s;
  return this;
};

Url.prototype.path = function(path) {
  var found = false;
  for (var i = 0; i < this.VALID_PATHS.length; i++) {
    if (path === this.VALID_PATHS[i]) {
      found = true;
      break;
    }
  }

  if (!found) {
    throw new InvalidArgumentException(
      "This path does not exists or is not allowed access"
    );
  }

  this.options.path = path;
  return this;
};

Url.prototype.filter = function(filters) {
  this.options.filters = Object.assign({}, this.options.filters, filters);
  return this;
};

Url.prototype.with = function(aggreagations) {
  this.options.with = this.options.with.concat(aggreagations);
  return this;
};

Url.prototype.build = function() {
  var filters = this.options.filters;
  var aggregations = this.options.with;
  var path = this.options.path;
  var page = this.options.page;
  var show = this.options.show;
  var params = [];

  var filtersKeys = Object.keys(filters);
  for (var i = 0; i < filtersKeys.length; i++) {
    var key = filtersKeys[i];
    var value = this.options.filters[key];
    params.push(key + "=" + value);
  }

  if (aggregations.length > 0) {
    params.push("with=" + aggregations.join(","));
  }

  params.push("page=" + page);
  params.push("show=" + show);

  var url = this.BASE_URL + path + "?" + params.join("&");
  return url;
};
