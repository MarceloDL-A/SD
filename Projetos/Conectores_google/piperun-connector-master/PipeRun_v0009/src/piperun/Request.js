function Request(rateLimit) {
  this.rateLimit = Object.assign(
    {},
    {
      apiCalls: 120,
      per: 15500,
    },
    rateLimit || {}
  );

  this.userProperties = PropertiesService.getUserProperties();
  this.userProperties.setProperty(
    "piperun.requestsLeft",
    JSON.stringify(this.rateLimit.apiCalls)
  );
  this.userProperties.setProperty(
    "piperun.rateLimitCountDownStart",
    JSON.stringify(null)
  );
}

Request.prototype.checkForRequestsLimit = function() {
  var rateLimitCountDownStarted = JSON.parse(
    this.userProperties.getProperty("piperun.rateLimitCountDownStart")
  );
  var requestsLeft = JSON.parse(
    this.userProperties.getProperty("piperun.requestsLeft")
  );

  if (requestsLeft > 0) {
    return requestsLeft;
  }

  var now = Date.now();
  var ellapsedTime = now - rateLimitCountDownStarted;
  var countDown = this.rateLimit.per - ellapsedTime;
  if (countDown > 0) {
    Utilities.sleep(countDown);
  }

  this.userProperties.setProperty(
    "piperun.rateLimitCountDownStart",
    JSON.stringify(null)
  );
  this.userProperties.setProperty(
    "piperun.requestsLeft",
    JSON.stringify(this.rateLimit.apiCalls)
  );

  return this.rateLimit.apiCalls;
};

Request.prototype.updateRateLimit = function(numOfRequests) {
  var rateLimitCountDownStarted = JSON.parse(
    this.userProperties.getProperty("piperun.rateLimitCountDownStart")
  );
  var requestsLeft = JSON.parse(
    this.userProperties.getProperty("piperun.requestsLeft")
  );

  if (rateLimitCountDownStarted === null) {
    this.userProperties.setProperty(
      "piperun.rateLimitCountDownStart",
      JSON.stringify(Date.now())
    );
  }

  this.userProperties.setProperty(
    "piperun.requestsLeft",
    JSON.stringify(requestsLeft - numOfRequests)
  );
};

Request.prototype.get = function(url, options) {
  this.checkForRequestsLimit();
  var res = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(res.getContentText()); // JSON.parse?
  this.updateRateLimit(1);
  return data;
};

Request.prototype.batch = function(queue) {
  var numOfRequests = this.checkForRequestsLimit();
  var nextBatch = queue.splice(0, numOfRequests);
  var response = UrlFetchApp.fetchAll(nextBatch);
  this.updateRateLimit(numOfRequests);

  var failedRequests = [];
  var data = response.reduce(function(acc, res, i) {
    var content = JSON.parse(res.getContentText());
    if (content && content.success) {
      return acc.concat(content.data);
    } else {
      failedRequests.push(nextBatch[i]);
      return acc;
    }
  }, []);
  return { data: data, queue: failedRequests.concat(queue) };
};
