const entity = require('/MarkLogic/entity');

function put(context, params, body) {
  entity.dictionaryInsert(
    '/dictionaries/companies',
    entity.skosDictionary('companies', 'en','case-insensitive')
  ); 

  entity.dictionaryInsert(
    '/dictionaries/products',
    entity.skosDictionary('products', 'en','case-insensitive')
  ); 

  context.outputStatus = [200, 'dictionaries created.'];
  return ['/dictionaries/companies', '/dictionaries/products'];
};

// Include an export for each method supported by your extension.
exports.PUT = put;
