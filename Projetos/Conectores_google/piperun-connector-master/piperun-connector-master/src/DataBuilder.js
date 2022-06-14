/**
 * Constructor for DataBuilder - a service for converting piperun json to the format expected by GDS.
 *
 * @param dataSchema {array[object]} - Array of requested fields
 *
 * @return {object} a DataBuilder object.
 */
function DataBuilder(schema) {
  this.schema = schema;

  return this;
}

DataBuilder.statusMapper = {
  0: "aberta",
  1: "fechada",
  2: "cancelada",
  3: "perdida",
};

DataBuilder.parseStatus = function(status) {
  return DataBuilder.statusMapper[status] || null;
};

DataBuilder.parsePercent = function(p) {
  return p ? p * 100 : null;
};

/**
 * @param record {object} - A piperun deals object
 *
 * @return {array} Array of values for each requested field
 */
DataBuilder.prototype.buildDeal = function(record) {
  var values = [];

  this.schema.forEach(function(field) {
    switch (field.getId()) {
      case "deal_id":
        values.push(record.id);
        break;
      case "title":
        values.push(record.title);
        break;
      case "order":
        values.push(record.order);
        break;
      case "status":
        values.push(DataBuilder.parseStatus(record.status));
        break;
      case "probability":
        values.push(DataBuilder.parsePercent(record.probability));
        break;
      case "reason_close":
        values.push(record.reason_close);
        break;
      case "temperature":
        values.push(record.temperature);
        break;
      case "deleted":
        values.push(!!record.deleted);
        break;
      case "freezed":
        values.push(!!record.freezed);
        break;
      case "frozen_at":
        values.push(DateUtils.formatDateResponse(record.frozen_at));
        break;
      case "created_at":
        values.push(DateUtils.formatDateResponse(record.created_at));
        break;
      case "updated_at":
        values.push(DateUtils.formatDateResponse(record.updated_at));
        break;
      case "closed_at":
        values.push(DateUtils.formatDateResponse(record.closed_at));
        break;
      case "last_contact_at":
        values.push(DateUtils.formatDateResponse(record.last_contact_at));
        break;
      case "last_stage_updated_at":
        values.push(DateUtils.formatDateResponse(record.last_stage_updated_at));
        break;
      case "value":
        values.push(record.value);
        break;
      case "value_mrr":
        values.push(record.value_mrr);
        break;
      case "lost_reason_name":
        values.push(record.lostReason ? record.lostReason.name : null);
        break;
      case "city_uf":
        values.push(record.city ? record.city.uf : null);
        break;
      case "city_name":
        values.push(record.city ? record.city.name : null);
        break;
      case "company_name":
        values.push(record.company ? record.company.name : null);
        break;
      case "origin_name":
        values.push(record.origin ? record.origin.name : null);
        break;
      case "funnel_type":
        values.push(record.pipeline ? record.pipeline.funnel_type_name : null);
        break;
      case "pipeline_name":
        values.push(record.pipeline ? record.pipeline.name : null);
        break;
      case "pipeline_order":
        values.push(record.pipeline ? record.pipeline.order : null);
        break;
      case "stage_name":
        values.push(record.stage ? record.stage.name : null);
        break;
      case "stage_order":
        values.push(record.stage ? record.stage.order : null);
        break;
      case "owner_name":
        values.push(record.owner ? record.owner.name : null);
        break;
      default:
        console.log("Unknown field:", field.name);
        values.push(null);
    }
  });

  return values;
};

/**
 * @param record {object} - A piperun deals object
 * @param index {number} - A deals record has an array of stage histories. This is the index of one.
 *
 * @return {array} Array of values for each requested field
 */
DataBuilder.prototype.buildStageHistory = function(record, index) {
  var row = [];
  var s = record.stageHistories[index];
  this.schema.forEach(function(field) {
    switch (field.getId()) {
      case "id":
        return row.push(s.id || null);
      case "status":
        return row.push(DataBuilder.parseStatus(record.status));
      case "account_id":
        return row.push(s.account_id || null);
      case "deal_id":
        return row.push(s.deal_id || null);
      case "in_stage_id":
        return row.push(s.in_stage_id || null);
      case "out_stage_id":
        return row.push(s.out_stage_id || null);
      case "in_user_id":
        return row.push(s.in_user_id || null);
      case "out_user_id":
        return row.push(s.out_user_id || null);
      case "in_date":
        return row.push(DateUtils.formatDateResponse(s.in_date));
      case "out_date":
        return row.push(DateUtils.formatDateResponse(s.out_date));
      case "in_stage_name":
        return row.push(s.inStageName || null);
      case "out_stage_name":
        return row.push(s.outStageName || null);
      case "in_pipeline_name":
        return row.push(s.inPipelineName || null);
      case "lead_time":
        return row.push(s.lead_time || null);
      case "in_user_name":
        return row.push(record.owner ? record.owner.name : null);
      case "out_user_name":
        return row.push(record.owner ? record.owner.name : null);
      case "created_at":
        return row.push(DateUtils.formatDateResponse(record.created_at));
      case "updated_at":
        return row.push(DateUtils.formatDateResponse(record.updated_at));
      case "freezed":
        return row.push(Boolean(record.freezed));
      case "closed_at":
        return row.push(DateUtils.formatDateResponse(record.closed_at));
      case "value_mrr":
        return row.push(Number(record.value_mrr));
      case "value":
        return row.push(Number(record.value));
      case "origin_name":
        var a = record.origin && record.origin.name;
        return row.push(a || null);
    }
  });

  return row;
};
