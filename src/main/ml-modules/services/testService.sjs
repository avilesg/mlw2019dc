function get(context, params) {
  const doc = cts.doc(params.uri);
  const companyDictionary = cts.entityDictionaryGet('/dictionaries/companies');
  const productDictionary = cts.entityDictionaryGet('/dictionaries/products');
  const results = [];

  const companyEntities = 
          cts.entityWalk(
              doc,
              function(entityType, text, normText, entityId, node, start) {
                      results.push({
                                type: entityType,
                                text: text,
                                norm: normText,
                                id: entityId,
                                start: start
                      });
              }, 
                companyDictionary
              );

  const productEntities = 
          cts.entityWalk(
              doc,
              function(entityType, text, normText, entityId, node, start) {
                      results.push({
                                type: entityType,
                                text: text,
                                norm: normText,
                                id: entityId,
                                start: start
                      });
              }, 
                productDictionary
              );

  context.outputStatus = [200, 'request was a success and uri is: ' + params.uri];
  return results;
};

// Include an export for each method supported by your extension.
exports.GET = get;
