
'use strict'

// this function will round the calculated profit margin 
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};  

/*
 * Create Content Plugin
 *
 * @param id         - the identifier returned by the collector
 * @param options    - an object containing options. Options are sent from Java
 *
 * @return - your content
 */
function createContent(id, options) {
  let doc = cts.doc(id);
  let root = doc.root.toObject();

  let source = root.envelope.instance;

  return extractInstanceCompany(source);
}

/**
 * Creates an object instance from some source document.
 * @param source  A document or node that contains
 *   data for populating a company
 * @return An object with extracted data and
 *   metadata about the instance.
 */
function extractInstanceCompany(source) {
  
  // the original source documents - original data is preserved in the attachments
  const attachments = source;
  
  // get the PROFIT property value from the document. Make it a number for future calculation.
	const profit = parseFloat(source.PROFIT);
  
  // get the  REVENUES property value from the document. Make it a number for future calculation.
  const revenues = parseFloat(source.REVENUES);
  
  // calculate the profit margin
  const profitMargin = xs.decimal((profit / revenues) * 100);
  
  // return the instance object
  return {
    '$attachments': attachments,
    '$type': 'company',
    '$version': '0.0.1',
    'MARGIN': round(profitMargin, 2)
  }
};
  

function makeReferenceObject(type, ref) {
  return {
    '$type': type,
    '$ref': ref
  };
}

module.exports = {
  createContent: createContent
};

