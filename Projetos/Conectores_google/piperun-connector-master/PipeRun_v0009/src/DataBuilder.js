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

DataBuilder.parseStatus = async function(status) {
  var DataBuilderstatusMapper = DataBuilder.statusMapper[status] || null;
  return await DataBuilderstatusMapper;
};

DataBuilder.parsePercent = async function(p) {
  var param = p ? p * 100 : null;
  return await param;
};

/**
 * @param record {object} - A piperun deals object
 *
 * @return {array} Array of values for each requested field
 */
DataBuilder.prototype.buildDeal = async function(record) {
  var values = [];

  this.schema.forEach(async function(field) {
    switch (field.getId()) {
      case "deal_id":
        var valuesPush = values.push(record.id);
        valuesPush = await valuesPush
        break;
      case "title":
        var valuesPush = values.push(record.title);
        valuesPush = await valuesPush
        break;
      case "order":
        var valuesPush = values.push(record.order);
        valuesPush = await valuesPush
        break;
      case "status":
        var valuesPush = values.push(DataBuilder.parseStatus(record.status));
        valuesPush = await valuesPush
        break;
      case "probability":
        var valuesPush = values.push(DataBuilder.parsePercent(record.probability));
        valuesPush = await valuesPush
        break;
      case "reason_close":
        var valuesPush = values.push(record.reason_close);
        valuesPush = await valuesPush
        break;
      case "temperature":
        var valuesPush = values.push(record.temperature);
        valuesPush = await valuesPush
        break;
      case "deleted":
        var valuesPush = values.push(!!record.deleted);
        valuesPush = await valuesPush
        break;
      case "freezed":
        var valuesPush = values.push(!!record.freezed);
        valuesPush = await valuesPush
        break;
      case "frozen_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.frozen_at));
        valuesPush = await valuesPush
        break;
      case "created_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.created_at));
        valuesPush = await valuesPush
        break;
      case "updated_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.updated_at));
        valuesPush = await valuesPush
        break;
      case "closed_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.closed_at));
        valuesPush = await valuesPush
        break;
      case "last_contact_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.last_contact_at));
        valuesPush = await valuesPush
        break;
      case "last_stage_updated_at":
        var valuesPush = values.push(DateUtils.formatDateResponse(record.last_stage_updated_at));
        valuesPush = await valuesPush
        break;
      case "value":
        var valuesPush = values.push(record.value);
        valuesPush = await valuesPush
        break;
      case "value_mrr":
        var valuesPush = values.push(record.value_mrr);
        valuesPush = await valuesPush
        break;
      case "lost_reason_name":
        var valuesPush = values.push(record.lostReason ? record.lostReason.name : null);
        valuesPush = await valuesPush
        break;
      case "city_uf":
        var valuesPush = values.push(record.city ? record.city.uf : null);
        valuesPush = await valuesPush
        break;
      case "city_name":
        var valuesPush = values.push(record.city ? record.city.name : null);
        valuesPush = await valuesPush
        break;
      case "company_name":
        var valuesPush = values.push(record.company ? record.company.name : null);
        valuesPush = await valuesPush
        break;
      case "origin_name":
        var valuesPush = values.push(record.origin ? record.origin.name : null);
        valuesPush = await valuesPush
        break;
      case "funnel_type":
        var valuesPush = values.push(record.pipeline ? record.pipeline.funnel_type_name : null);
        valuesPush = await valuesPush
        break;
      case "pipeline_name":
        var valuesPush = values.push(record.pipeline ? record.pipeline.name : null);
        valuesPush = await valuesPush
        break;
      case "pipeline_order":
        var valuesPush = values.push(record.pipeline ? record.pipeline.order : null);
        valuesPush = await valuesPush
        break;
      case "stage_name":
        var valuesPush = values.push(record.stage ? record.stage.name : null);
        valuesPush = await valuesPush
        break;
      case "stage_order":
        var valuesPush = values.push(record.stage ? record.stage.order : null);
        valuesPush = await valuesPush
        break;
      case "owner_name":
        var valuesPush = values.push(record.owner ? record.owner.name : null);
        valuesPush = await valuesPush
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
DataBuilder.prototype.buildStageHistory = async function(record, index) {
  var row = [];
  var s = record.stageHistories[index];
  this.schema.forEach(async function(field) {
    switch (field.getId()) {
      case "id":
        var returnPow = row.push(s.id || null);
        return await returnPow
      case "status":
        var returnPow = row.push(DataBuilder.parseStatus(record.status));
        return await returnPow
      case "account_id":
        var returnPow = row.push(s.account_id || null);
        return await returnPow
      case "deal_id":
        var returnPow = row.push(s.deal_id || null);
        return await returnPow
      case "in_stage_id":
        var returnPow = row.push(s.in_stage_id || null);
        return await returnPow
      case "out_stage_id":
        var returnPow = row.push(s.out_stage_id || null);
        return await returnPow
      case "in_user_id":
        var returnPow = row.push(s.in_user_id || null);
        return await returnPow
      case "out_user_id":
        var returnPow = row.push(s.out_user_id || null);
        return await returnPow
      case "in_date":
        var returnPow = row.push(DateUtils.formatDateResponse(s.in_date));
        return await returnPow
      case "out_date":
        var returnPow = row.push(DateUtils.formatDateResponse(s.out_date));
        return await returnPow
      case "in_stage_name":
        var returnPow = row.push(s.inStageName || null);
        return await returnPow
      case "out_stage_name":
        var returnPow = row.push(s.outStageName || null);
        return await returnPow
      case "in_pipeline_name":
        var returnPow = row.push(s.inPipelineName || null);
        return await returnPow
      case "lead_time":
        var returnPow = row.push(s.lead_time || null);
        return await returnPow
      case "in_user_name":
        var returnPow = row.push(record.owner ? record.owner.name : null);
        return await returnPow
      case "out_user_name":
        var returnPow = row.push(record.owner ? record.owner.name : null);
        return await returnPow
      case "created_at":
        var returnPow = row.push(DateUtils.formatDateResponse(record.created_at));
        return await returnPow
      case "updated_at":
        var returnPow = row.push(DateUtils.formatDateResponse(record.updated_at));
        return await returnPow
      case "freezed":
        var returnPow = row.push(Boolean(record.freezed));
        return await returnPow
      case "closed_at":
        var returnPow = row.push(DateUtils.formatDateResponse(record.closed_at));
        return await returnPow
      case "value_mrr":
        var returnPow = row.push(Number(record.value_mrr));
        return await returnPow
      case "value":
        var returnPow = row.push(Number(record.value));
        return await returnPow
      case "origin_name":
        var a = record.origin && record.origin.name;
        var returnPow = row.push(a || null);
        return await returnPow;
    }
  });
  
  return await row;
};
