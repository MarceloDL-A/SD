/**
 * Mandatory function required by Google Data Studio that should
 * return the authentication method required by the connector
 * to authorize the third-party service.
 * @return {Object} AuthType
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc
    .newAuthTypeResponse()
    .setAuthType(cc.AuthType.KEY)
    .setHelpUrl("https://crmpiperun.com/")
    .build();
}

/**
 * Mandatory function required by Google Data Studio that should
 * determine if the authentication for the third-party service is valid.
 * @return {Boolean}
 */
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty("dscc.key");
  return checkForValidKey(key);
}

/**
 * Mandatory function required by Google Data Studio that should
 * set the credentials after the user enters either their
 * credential information on the community connector configuration page.
 * @param {Object} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
function setCredentials(request) {
  var key = request.key;
  var validKey = checkForValidKey(key);
  if (!validKey) {
    return {
      errorCode: "INVALID_CREDENTIALS",
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("dscc.key", key);
  return {
    errorCode: "NONE",
  };
}

/**
 * Mandatory function required by Google Data Studio that should
 * clear user credentials for the third-party service.
 * This function does not accept any arguments and
 * the response is empty.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty("dscc.key");
}

/**
 * Checks if the Key/Token provided by the user is valid
 * @param {String} key
 * @return {Boolean}
 */
function checkForValidKey(key) {
  var client;
  try {
    client = new Piperun(key);
  } catch (e) {
    return false;
  }
  return client.token !== undefined;
}

/**
 * Mandatory function required by Google Data Studio that should
 * return the user configurable options for the connector.
 * @param {Object} request
 * @return {Object} fields
 */
function getConfig(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var configParams = request.configParams;
  var isFirstRequest = configParams === undefined;
  var config = cc.getConfig();
  if (isFirstRequest) {
    config.setIsSteppedConfig(true);
  }

  const deals = config
    .newOptionBuilder()
    .setLabel("Visão Geral")
    .setValue("deals");
  const stageHistories = config
    .newOptionBuilder()
    .setLabel("Movimentação de Oportunidades")
    .setValue("stageHistory");

  config
    .newSelectSingle()
    .setId("table")
    .setName("Escolha uma tabela para importar")
    .setIsDynamic(true)
    .addOption(deals)
    .addOption(stageHistories);

  if (!isFirstRequest) {
    var dateWindow = config
      .newSelectSingle()
      .setId("dateWindow")
      .setName("Periodo de analise");

    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 7 dias")
        .setValue("lastSevenDays")
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Começo do mês")
        .setValue("startOfMonth")
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Começo do ano")
        .setValue("startOfYear")
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("6 meses anteriores ao começo do mês")
        .setValue("lastSixMonths")
    );
  }

  config.setDateRangeRequired(false);

  return config.build();
}

/**
 * Mandatory function required by Google Data Studio that should
 * return the schema for the given request.
 * This provides the information about how the connector's data is organized.
 * @param {Object} request
 * @return {Object} schema
 */
function getSchema(request) {
  var fields = getFields(request.configParams.table).build();
  return { schema: fields };
}

function getUserProperty(name) {
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty(name);
}

/**
 * Mandatory function required by Google Data Studio that should
 * return the schema for requested fields and the formatted rows with data following
 * the schema.
 * This function is called everytime a change is made in a report
 * @param {Object} request
 * @return {Object} data
 */
function getData(request) {
  var lock = LockService.getUserLock();
  var cache = new DataCache(CacheService.getUserCache());
  var fields = request.fields;
  var token = getUserProperty("dscc.key");
  var table = request.configParams.table;
  var dateWindow = request.configParams.dateWindow;
  var startDate = DateUtils.getPeriods()[dateWindow];
  var aggregations = [
    "lostReason",
    "city",
    "company",
    "origin",
    "pipeline",
    "stage",
    "owner",
    "stageHistories.inStageName",
    "stageHistories.inPipelineName",
    "stageHistories.outStageName",
  ];

  var client = new Piperun(token, cache)
    .updatedAt({
      start: startDate,
    })
    .deleted(false)
    .with(aggregations)
    .show(80);

  var requested = [];
  for (var i = 0; i < fields.length; i++) {
    requested.push(fields[i].name);
  }

  var cacheKey = startDate + "_" + table + "_" + requested + "_" + token;
  var rows = client.getFromCache(cacheKey);
  if (rows === null) {
    lock.waitLock(360000);
    rows = client.getAll(table, requested);
    lock.releaseLock();
    client.setInCache(cacheKey, rows);
  }

  return {
    schema: getFields(table)
      .forIds(requested)
      .build(),
    rows: rows,
  };
}

// function prepareSchema(request) {
//   // Prepare the schema for the fields requested.
//   var fields = request.fields;
//   var requested = [];
//   var fixedSchema = getFields(request.configParams.table);

//   for (var i = 0; i < request.fields.length; i++) {
//     requested.push(fields[i].name);
//   }

//   return fixedSchema.forIds(requested);
// }

// function buildDealsTabularData(data, dataSchema) {
//   var rows = [];
//   var dataBuilder = new DataBuilder(dataSchema.asArray());

//   data.forEach(function(record) {
//     rows.push({
//       values: dataBuilder.buildDeal(record),
//     });
//   });

//   return {
//     schema: dataSchema.build(),
//     rows: rows,
//   };
// }

// function buildStageHistoryTabularData(data, dataSchema) {
//   console.log("I am inside!!!!");
//   var rows = [];
//   var dataBuilder = new DataBuilder(dataSchema.asArray());

//   data.forEach(function(record) {
//     var joins = record.stageHistories.length;
//     for (var i = 0; i < joins; i++) {
//       rows.push({
//         values: dataBuilder.buildStageHistory(record, i),
//       });
//     }
//   });

//   return {
//     schema: dataSchema.build(),
//     rows: rows,
//   };
// }
