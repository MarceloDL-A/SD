var initial = {
  deals: {
    deal_id: [],
    title: [],
    order: [],
    status: [],
    probability: [],
    lost_reason_name: [],
    reason_close: [],
    temperature: [],
    deleted: [],
    freezed: [],
    frozen_at: [],
    created_at: [],
    closed_at: [],
    last_contact_at: [],
    last_stage_updated_at: [],
    value: [],
    value_mrr: [],
    city_uf: [],
    city_name: [],
    company_name: [],
    origin_name: [],
    funnel_type: [],
    pipeline_name: [],
    pipeline_order: [],
    stage_name: [],
    stage_order: [],
    owner_name: [],
  },
  stageHistory: {
    id: [],
    status: [],
    account_id: [],
    deal_id: [],
    in_stage_id: [],
    out_stage_id: [],
    in_user_id: [],
    out_user_id: [],
    in_date: [],
    out_date: [],
    in_stage_name: [],
    out_stage_name: [],
    in_pipeline_name: [],
    lead_time: [],
    in_user_name: [],
    out_user_name: [],
    created_at: [],
    freezed: [],
    closed_at: [],
    value_mrr: [],
    value: [],
    origin_name: [],
  },
};

function Piperun(token, cache) {
  this.cache = cache;
  this.url = new Url();
  this.request = new Request({});
  this.buffer = initial;

  if (this.isTokenValid(token)) {
    this.token = token;
  } else {
    throw new InvalidTokenException(token);
  }
}

Piperun.prototype.buildRequestOptions = function(token) {
  return {
    url: this.url.build(),
    method: "get",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
};

Piperun.prototype.isTokenValid = function(token) {
  // var options = this.buildRequestOptions(token);
  if (!token) {
    return false;
  }

  var options = {
    method: "get",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var res = this.request.get(this.url.build(), options);
  return !!res.success;
};

Piperun.prototype.updatedAt = function(range) {
  this.url.filter({
    updated_at_start: range.start || DateUtils.getDateString(1),
    updated_at_end: range.end || DateUtils.getDateString(),
  });

  return this;
};

Piperun.prototype.deleted = function(deleted) {
  this.url.filter({
    deleted: deleted ? 1 : 0,
  });

  return this;
};

Piperun.prototype.for = function(path) {
  this.url.path(path);
  return this;
};

Piperun.prototype.show = function(dataSize) {
  this.url.show(dataSize || 100);
  return this;
};

Piperun.prototype.with = function(aggreagations) {
  this.url.with(aggreagations);
  return this;
};

Piperun.prototype.generateRequestQueue = function() {
  var options = {
    method: "get",
    headers: {
      token: this.token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var url = this.url.build();
  var data = this.request.get(url, options);
  var pages = data.meta.total_pages;
  var requestQueue = [];
  for (var i = 1; i <= pages; i++) {
    this.url.page(i);
    requestQueue.push(this.buildRequestOptions(this.token));
  }

  return requestQueue;
};

Piperun.prototype.getAll = function(table, schema) {
  var queue = this.generateRequestQueue();
  var res = { data: null, queue: queue };
  var columns = this.getColumnsFromCache(table, schema);
  if (!columns) {
    columns = [];
    do {
      res = this.request.batch(res.queue);
      console.log("Response data length: ", res.data.length);
      for (var i = 0; i < res.data.length; i++) {
        this.fillDataBuffer(table, res.data[i]);
      }
    } while (res.queue.length > 0);

    for (var i = 0; i < schema.length; i++) {
      columns.push(this.buffer[table][schema[i]]);
    }
    this.setColumnsInCache(table);
  }

  return this.zipColumns(schema, columns);
};

Piperun.prototype.get = function() {
  var options = {
    method: "get",
    headers: {
      token: this.token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var res = this.request.get(this.url.build(), options);
  return res;
};

Piperun.prototype.fillDataBuffer = function(table, record) {
  if (table === "deals") {
    var deals = this.buffer[table];
    deals.deal_id.push(record.id);
    deals.title.push(record.title);
    deals.order.push(record.order);
    deals.status.push(DataBuilder.parseStatus(record.status));
    deals.probability.push(DataBuilder.parsePercent(record.probability));
    deals.reason_close.push(record.reason_close);
    deals.lost_reason_name.push(
      record.lostReason ? record.lostReason.name : null
    );
    deals.temperature.push(record.temperature);
    deals.deleted.push(!!record.deleted);
    deals.freezed.push(!!record.freezed);
    deals.frozen_at.push(DateUtils.formatDateResponse(record.frozen_at));
    deals.created_at.push(DateUtils.formatDateResponse(record.created_at));
    deals.closed_at.push(DateUtils.formatDateResponse(record.closed_at));
    deals.last_contact_at.push(
      DateUtils.formatDateResponse(record.last_contact_at)
    );
    deals.last_stage_updated_at.push(
      DateUtils.formatDateResponse(record.last_stage_updated_at)
    );
    deals.value.push(record.value);
    deals.value_mrr.push(record.value_mrr);
    deals.city_uf.push(record.city ? record.city.uf : null);
    deals.city_name.push(record.city ? record.city.name : null);
    deals.company_name.push(record.company ? record.company.name : null);
    deals.origin_name.push(record.origin ? record.origin.name : null);
    deals.funnel_type.push(
      record.pipeline ? record.pipeline.funnel_type_name : null
    );
    deals.pipeline_name.push(record.pipeline ? record.pipeline.name : null);
    deals.pipeline_order.push(record.pipeline ? record.pipeline.order : null);
    deals.stage_name.push(record.stage ? record.stage.name : null);
    deals.stage_order.push(record.stage ? record.stage.order : null);
    deals.owner_name.push(record.owner ? record.owner.name : null);
  } else {
    var stageHistory = this.buffer[table];
    var s;
    for (var i = 0; i < record.stageHistories.length; i++) {
      var s = record.stageHistories[i];
      stageHistory.id.push(s.id);
      stageHistory.status.push(DataBuilder.parseStatus(record.status));
      stageHistory.account_id.push(s.account_id);
      stageHistory.deal_id.push(s.deal_id);
      stageHistory.in_stage_id.push(s.in_stage_id);
      stageHistory.out_stage_id.push(s.out_stage_id);
      stageHistory.in_user_id.push(s.in_user_id);
      stageHistory.out_user_id.push(s.out_user_id);
      stageHistory.in_date.push(DateUtils.formatDateResponse(s.in_date));
      stageHistory.out_date.push(DateUtils.formatDateResponse(s.out_date));
      stageHistory.in_stage_name.push(s.inStageName || null);
      stageHistory.out_stage_name.push(s.outStageName || null);
      stageHistory.in_pipeline_name.push(s.inPipelineName || null);
      stageHistory.lead_time.push(s.lead_time || null);
      stageHistory.in_user_name.push(record.owner ? record.owner.name : null);
      stageHistory.out_user_name.push(record.owner ? record.owner.name : null);
      stageHistory.created_at.push(
        DateUtils.formatDateResponse(record.created_at)
      );
      stageHistory.freezed.push(!!record.freezed);
      stageHistory.closed_at.push(
        DateUtils.formatDateResponse(record.closed_at)
      );
      stageHistory.value_mrr.push(record.value_mrr);
      stageHistory.value.push(record.value);
      stageHistory.origin_name.push(record.origin ? record.origin.name : null);
    }
  }
};

Piperun.prototype.setColumnsInCache = function(table) {
  var t = this.buffer[table];
  var columns = Object.keys(t);
  for (var i = 0; i < columns.length; i++) {
    var key =
      this.url.options.filters.updatedAtStart + "_" + table + "_" + columns[i];
    this.setInCache(key, t[columns[i]]);
  }
};

Piperun.prototype.zipColumns = function(schema, columns) {
  var rows = [];
  var values;
  for (var i = 0; i < columns[0].length; i++) {
    values = [];
    for (var j = 0; j < schema.length; j++) {
      values.push(columns[j][i]);
    }
    rows.push({ values: values });
  }
  return rows;
};

Piperun.prototype.getColumnsFromCache = function(table, columns) {
  var data = [];
  for (var i = 0; i < columns.length; i++) {
    var key =
      this.url.options.filters.updatedAtStart + "_" + table + "_" + columns[i];
    column = this.getFromCache(key);
    if (!column) return null;
    data.push(column);
  }
  return data;
};

Piperun.prototype.getFromCache = function(key) {
  var start = new Date().getTime();
  var data = null;
  console.log("Trying to fetch from Piperun cache...");
  try {
    var dataString = this.cache.get(key);
    console.log("Data string length: ", dataString.length);
    data = JSON.parse(dataString);
    console.log("Fetched succesfully from cache data length: ", data.length);
  } catch (e) {
    console.log("Error when fetching from cache:", e);
  }
  var end = new Date().getTime();
  var executionTime = end - start;
  console.log("Fetching from cache took " + executionTime + " milliseconds");
  return data;
};

Piperun.prototype.setInCache = function(key, data) {
  console.log("Setting data to Piperun cache...");
  try {
    this.cache.set(key, JSON.stringify(data));
  } catch (e) {
    console.log("Error when storing in cache", e);
  }
};
