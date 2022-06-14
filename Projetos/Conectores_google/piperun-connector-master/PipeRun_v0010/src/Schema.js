/**
 * @param {String} table
 * @return {Object} Object containing field definitions
 */
function getFields(table) {
  switch (table) {
    case "stageHistory":
      return stageHistoryFields();
    case "deals":
      return dealsFields();
    default:
      console.log("Unsupported data table");
      throw new Error("Table name not supported by schema");
  }
}

function dealsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;

  // Deal
  var id = fields
    .newDimension()
    .setId("deal_id")
    .setName("Id Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Identificador da oportunidade")
    .setType(types.NUMBER);
  var title = fields
    .newDimension()
    .setId("title")
    .setName("Título da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Identificador da oportunidade")
    .setType(types.TEXT);
  var order = fields
    .newDimension()
    .setId("order")
    .setName("Ordem da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem da oportunidade na etapa.")
    .setType(types.NUMBER);
  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Deals Aggregated")
    .setDescription("Status da oportunidade.")
    .setType(types.TEXT);
  var probability = fields
    .newDimension()
    .setId("probability")
    .setName("Probabilidade")
    .setGroup("Deals Aggregated")
    .setDescription("Probabilidade de fechamento da oportunidade, de 0 a 90")
    .setType(types.NUMBER);

  var reason_close = fields
    .newDimension()
    .setId("reason_close")
    .setName("Motivo de Fechamento")
    .setGroup("Deals Aggregated")
    .setDescription("Razão de fechamento de oportunidade.")
    .setType(types.TEXT);
  var temperature = fields
    .newDimension()
    .setId("temperature")
    .setName("Temperatura")
    .setGroup("Deals Aggregated")
    .setDescription(
      "Temperatura da oportunidade: 1 - muito quente, 2 - quente, 3 - morna, 4 - fria"
    )
    .setType(types.NUMBER);
  var deleted = fields
    .newDimension()
    .setId("deleted")
    .setName("Deletado")
    .setGroup("Deals Aggregated")
    .setDescription("Oportunidade deletada")
    .setType(types.BOOLEAN);
  var freezed = fields
    .newDimension()
    .setId("freezed")
    .setName("Congelado")
    .setGroup("Deals Aggregated")
    .setDescription("Oportunidade congelada")
    .setType(types.BOOLEAN);
  var frozenAT = fields
    .newDimension()
    .setId("frozen_at")
    .setName("Data de Congelamento")
    .setGroup("Deals Aggregated")
    .setDescription("Data do congelamento.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Data de Criação")
    .setGroup("Deals Aggregated")
    .setDescription("Data de criação da oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var uodatedAt = fields
    .newDimension()
    .setId("updated_at")
    .setName("Data da última atualização")
    .setGroup("Deals Aggregated")
    .setDescription("Data da última atualização")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var closedAt = fields
    .newDimension()
    .setId("closed_at")
    .setName("Data de Fechamento")
    .setGroup("Deals Aggregated")
    .setDescription("Data de fechamento da oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var lastContactAt = fields
    .newDimension()
    .setId("last_contact_at")
    .setName("Data de Último Contato")
    .setGroup("Deals Aggregated")
    .setDescription("Data do último contato feito na oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var lastStageUpdatedAt = fields
    .newDimension()
    .setId("last_stage_updated_at")
    .setName("Data de Última Atualização de Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Data de atualização do último stage.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var value = fields
    .newMetric()
    .setId("value")
    .setName("Valor P&S")
    .setGroup("Deals Aggregated")
    .setDescription("Valor da oportunidade.")
    .setType(types.NUMBER);
  var value_mrr = fields
    .newMetric()
    .setId("value_mrr")
    .setName("Valor MRR")
    .setGroup("Deals Aggregated")
    .setDescription("Valor MRR da oportunidade.")
    .setType(types.NUMBER);

  // LostReason
  var lostReasonName = fields
    .newDimension()
    .setId("lost_reason_name")
    .setName("Nome do Motivo de Fechamento")
    .setGroup("Deals Aggregated")
    .setDescription("Nome do Motivo de Fechamento")
    .setType(types.TEXT);

  // City
  var uf = fields
    .newDimension()
    .setId("city_uf")
    .setName("UF")
    .setGroup("Deals Aggregated")
    .setDescription("UF da cidade")
    .setType(types.TEXT);
  var cityName = fields
    .newDimension()
    .setId("city_name")
    .setName("Cidade")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da cidade")
    .setType(types.TEXT);

  // Company
  var companyName = fields
    .newDimension()
    .setId("company_name")
    .setName("Nome da Empresa")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da empresa")
    .setType(types.TEXT);

  // Orgin
  var originName = fields
    .newDimension()
    .setId("origin_name")
    .setName("Nome da Origem")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da origem")
    .setType(types.TEXT);

  // Pipeline
  var funnelTypeName = fields
    .newDimension()
    .setId("funnel_type")
    .setName("Tipo de Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Nome do tipo de funil")
    .setType(types.TEXT);
  var funnelName = fields
    .newDimension()
    .setId("pipeline_name")
    .setName("Nome do Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Nome do funil")
    .setType(types.TEXT);
  var funnelOrder = fields
    .newDimension()
    .setId("pipeline_order")
    .setName("Ordem do Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem do funil de vendas na lista")
    .setType(types.NUMBER);

  // Stages
  var stageName = fields
    .newDimension()
    .setId("stage_name")
    .setName("Nome da Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da etapa")
    .setType(types.TEXT);
  var stageOrder = fields
    .newDimension()
    .setId("stage_order")
    .setName("Ordem da Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem da etapa dentro do funil")
    .setType(types.NUMBER);

  // Owner
  var ownerName = fields
    .newDimension()
    .setId("owner_name")
    .setName("Dono da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da dono")
    .setType(types.TEXT);

  fields.setDefaultDimension(id.getId());
  fields.setDefaultMetric(value.getId());

  return fields;
}

function stageHistoryFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Id")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Id da Conta")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var dealId = fields
    .newDimension()
    .setId("deal_id")
    .setName("Id da Oportunidade")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inStageId = fields
    .newDimension()
    .setId("in_stage_id")
    .setName("Id da Etapa de Entrada")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var outStageId = fields
    .newDimension()
    .setId("out_stage_id")
    .setName("Id da Etapa de Saída")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inUserId = fields
    .newDimension()
    .setId("in_user_id")
    .setName("Id do Usuário de Entrada")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var outUserId = fields
    .newDimension()
    .setId("out_user_id")
    .setName("Id do Usuário de Saída")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inDate = fields
    .newDimension()
    .setId("in_date")
    .setName("Data de Entrada")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var outDate = fields
    .newDimension()
    .setId("out_date")
    .setName("Data de Saída")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var inStageName = fields
    .newDimension()
    .setId("in_stage_name")
    .setName("Nome Etapa Entrada")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var outStageName = fields
    .newDimension()
    .setId("out_stage_name")
    .setName("Nome Etapa Saída")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var inPipelineName = fields
    .newDimension()
    .setId("in_pipeline_name")
    .setName("Nome do Funil")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var leadTime = fields
    .newDimension()
    .setId("lead_time")
    .setName("Lead Time")
    .setGroup("Deals History")
    .setType(types.TEXT);

  var inUserName = fields
    .newDimension()
    .setId("in_user_name")
    .setName("Nome Usuário Entrada")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var outUserName = fields
    .newDimension()
    .setId("out_user_name")
    .setName("Nome Usuário Saída")
    .setGroup("Deals History")
    .setType(types.TEXT);

  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Data de Criação")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var uodatedAt = fields
    .newDimension()
    .setId("updated_at")
    .setName("Data da última atualização")
    .setGroup("Deals Aggregated")
    .setDescription("Data da última atualização")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var freezed = fields
    .newDimension()
    .setId("freezed")
    .setName("Oportunidade Congelada")
    .setGroup("Deals History")
    .setType(types.BOOLEAN);

  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var closedAt = fields
    .newDimension()
    .setId("closed_at")
    .setName("Data de Fechamento")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var valueMRR = fields
    .newDimension()
    .setId("value_mrr")
    .setName("Valor MRR")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var value = fields
    .newDimension()
    .setId("value")
    .setName("Valor P&S")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var originName = fields
    .newDimension()
    .setId("origin_name")
    .setName("Nome da origem")
    .setGroup("Deals History")
    .setType(types.TEXT);

  fields.setDefaultDimension(id.getId());

  return fields;
}

function getDealsSchema() {
  return {
    defaultUrl: "",
    joinOn: null,
    fields: {
      deal_id: {
        id: "deal_id",
        name: {
          pt: "Id Oportunidade",
          en: "Deal ID",
        },
        description: "Identificador da oportunidade",
        type: "NUMBER",
        path: ["id"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      title: {
        id: "title",
        name: {
          pt: "Título da Oportunidade",
          en: "Oportunity Title",
        },
        description: "Título da Oportunidade",
        type: "TEXT",
        path: ["title"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      order: {
        id: "order",
        name: {
          pt: "Ordem da Oportunidade",
          en: "Oportunity Order",
        },
        description: "Ordem da oportunidade na etapa",
        type: "NUMBER",
        path: ["order"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      status: {
        id: "status",
        name: {
          pt: "Status",
          en: "Status",
        },
        description: "Status da oportunidade",
        type: "TEXT",
        path: ["status"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      probability: {
        id: "probability",
        name: {
          pt: "Probabilidade",
          en: "Probability",
        },
        description: "Probabilidade de fechamento da oportunidade, de 0 a 90.",
        type: "NUMBER",
        path: ["probability"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      reason_close: {
        id: "reason_close",
        name: {
          pt: "Motivo de Fechamento",
          en: "Reason Close",
        },
        description: "Razão de fechamento de oportunidade",
        type: "TEXT",
        path: ["reason_close"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      temperature: {
        id: "temperature",
        name: {
          pt: "Temperatura",
          en: "Temperature",
        },
        description:
          "Temperatura da oportunidade: 1 - muito quente, 2 - quente, 3 - morna, 4 - fria",
        type: "NUMBER",
        path: ["temperature"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      deleted: {
        id: "deleted",
        name: {
          pt: "Deletado",
          en: "Deleted",
        },
        description: "Oportunidade deletada: 0 - falso, 1 - verdadeiro",
        type: "BOOLEAN",
        path: ["deleted"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      freezed: {
        id: "freezed",
        name: {
          pt: "Congelado",
          en: "Freezed",
        },
        description: "Oportunidade congelada: 0 - falso, 1 - verdadeiro",
        type: "BOOLEAN",
        path: ["freezed"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      frozen_at: {
        id: "frozen_at",
        name: {
          pt: "Data de Congelamento",
          en: "Frozen At Date",
        },
        description: "Data do congelamento da oportunidade",
        type: "YEAR_MONTH_DAY_SECOND",
        path: ["frozen_at"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      created_at: {
        id: "created_at",
        name: {
          pt: "Data de Criação",
          en: "Created At Date",
        },
        description: "Data de criação da oportunidade",
        type: "YEAR_MONTH_DAY_SECOND",
        path: ["created_at"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      closed_at: {
        id: "closed_at",
        name: {
          pt: "Data de Fechamento",
          en: "Closed At Date",
        },
        description: "Data de fechamento da oportunidade.",
        type: "YEAR_MONTH_DAY_SECOND",
        path: ["closed_at"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      last_contact_at: {
        id: "last_contact_at",
        name: {
          pt: "Data de Último Contato",
          en: "Last Contact At Date",
        },
        description: "Data do último contato feito na oportunidade.",
        type: "YEAR_MONTH_DAY_SECOND",
        path: ["last_contact_at"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      last_stage_updated_at: {
        id: "last_stage_updated_at",
        name: {
          pt: "Data de Última Atualização de Etapa",
          en: "Last Stage Updated At Date",
        },
        description: "Data de atualização do último stage",
        type: "YEAR_MONTH_DAY_SECOND",
        path: ["last_stage_updated_at"],
        fromAggregate: null,
        conceptType: "DIMENSION",
      },
      value: {
        id: "value",
        name: {
          pt: "Valor P&S",
          en: "Value",
        },
        description: "Valor da oportunidade",
        type: "NUMBER",
        path: ["value"],
        fromAggregate: null,
        conceptType: "METRIC",
      },
      value_mrr: {
        id: "value_mrr",
        name: {
          pt: "Valor MRR",
          en: "Value MRR",
        },
        description: "Valor MRR da oportunidade.",
        type: "NUMBER",
        path: ["value_mrr"],
        fromAggregate: null,
        conceptType: "METRIC",
      },
      city_uf: {
        id: "city_uf",
        name: {
          pt: "UF",
          en: "UF",
        },
        description: "UF da cidade.",
        type: "TEXT",
        path: ["city", "uf"],
        fromAggregate: "city",
        conceptType: "DIMENSION",
      },
      city_name: {
        id: "city_name",
        name: {
          pt: "Cidade",
          en: "City",
        },
        description: "Nome da Cidade",
        type: "TEXT",
        path: ["city", "name"],
        fromAggregate: "city",
        conceptType: "DIMENSION",
      },
      company_name: {
        id: "company_name",
        name: {
          pt: "Nome da Empresa",
          en: "Company Name",
        },
        description: "Nome da empresa",
        type: "TEXT",
        path: ["company", "name"],
        fromAggregate: "company",
        conceptType: "DIMENSION",
      },
      origin_name: {
        id: "origin_name",
        name: {
          pt: "Nome da Origem",
          en: "Origin Name",
        },
        description: "Nome da Origem",
        type: "TEXT",
        path: ["origin", "name"],
        fromAggregate: "origin",
        conceptType: "DIMENSION",
      },
      funnel_type: {
        id: "funnel_type",
        name: {
          pt: "Tipo de Funil",
          en: "Funnel Type",
        },
        description: "Nome do tipo de funil",
        type: "TEXT",
        path: ["pipeline", "funnel_type_name"],
        fromAggregate: "pipeline",
        conceptType: "DIMENSION",
      },
      pipeline_name: {
        id: "pipeline_name",
        name: {
          pt: "Nome do Funil",
          en: "Funnel Name",
        },
        description: "Nome do Funil",
        type: "TEXT",
        path: ["pipeline", "name"],
        fromAggregate: "pipeline",
        conceptType: "DIMENSION",
      },
      pipeline_order: {
        id: "pipeline_order",
        name: {
          pt: "Ordem do Funil",
          en: "Funnel Order",
        },
        description: "Ordem do funil de vendas na lista",
        type: "NUMBER",
        path: ["pipeline", "order"],
        fromAggregate: "pipeline",
        conceptType: "DIMENSION",
      },
      stage_name: {
        id: "stage_name",
        name: {
          pt: "Nome da Etapa",
          en: "Stage Name",
        },
        description: "Nome da etapa",
        type: "TEXT",
        path: ["stage", "name"],
        fromAggregate: "stage",
        conceptType: "DIMENSION",
      },
      stage_order: {
        id: "stage_order",
        name: {
          pt: "Ordem da Etapa",
          en: "Stage Order",
        },
        description: "Ordem da etapa dentro do funil",
        type: "NUMBER",
        path: ["stage", "order"],
        fromAggregate: "stage",
        conceptType: "DIMENSION",
      },
      owner_name: {
        id: "owner_name",
        name: {
          pt: "Dono da Oportunidade",
          en: "Owner Name",
        },
        description: "Nome da dono",
        type: "TEXT",
        path: ["owner", "name"],
        fromAggregate: "owner",
        conceptType: "DIMENSION",
      },
    },
  };
}
