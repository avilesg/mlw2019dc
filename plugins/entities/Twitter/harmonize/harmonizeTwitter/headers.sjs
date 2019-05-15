/*
 * Create Headers Plugin
 *
 * @param id       - the identifier returned by the collector
 * @param content  - the output of your content plugin
 * @param options  - an object containing options. Options are sent from Java
 *
 * @return - an object of headers
 */
function createHeaders(id, content, options) {
  
  const doc = cts.doc(id);
  
  const identifiedEntities = enrichTweet(doc);
  
  return {
  	
    // perform the enrichment and return the entities that are identified (if any)
  	identifiedEntities
    
  };
}

function enrichTweet(data) {
  
  const companyDictionary = cts.entityDictionaryGet('/dictionaries/companies');
	const productDictionary = cts.entityDictionaryGet('/dictionaries/products');
  const results = [];
  
  const companyEntities = 
          cts.entityWalk(
              data,
              function(entityType, text, normText, entityId, node, start) {
                      results.push({
                                type: entityType,
                                text: text,
                                companyName: normText,
                                id: entityId,
                                start: start
                      });
              }, 
                companyDictionary
              );

  const productEntities = 
          cts.entityWalk(
              data,
              function(entityType, text, normText, entityId, node, start) {
                      results.push({
                                type: entityType,
                                text: text,
                                productName: normText,
                                id: entityId,
                                start: start
                      });
              }, 
                productDictionary
              );

  return results;
  	
}

module.exports = {
  createHeaders: createHeaders
};