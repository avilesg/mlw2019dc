
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
  

  const title = source.title;
  let profit;
  let revenues;
  let employees;
  let profitMargin = null;
  
  const match = fn.head(cts.search(cts.jsonPropertyValueQuery("NAME", title, "case-insensitive")))
  if (match !== null) {
    const matchInst = match.root.envelope.instance;
  
    profit = matchInst.PROFIT;
    revenues = matchInst.REVENUES;
    employees = matchInst.EMPLOYEES;
    // calculate the profit margin
    if (profit && !isNaN(profit) && revenues && !isNaN(revenues) && revenues !== 0) { 
      profitMargin = xs.decimal((profit / revenues) * 100);
    };
  }

  let instance = {
    '$attachments': attachments,
    '$type': 'company',
    '$version': '0.0.1',
    'name': title,
    'profit': profit,
    'revenues': revenues,
    'employees': employees
  };

  // if (!isNaN(profitMargin)) {
  //   instance.MARGIN = round(profitMargin, 2);
  // };
  
  // return the instance object
  return instance;
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

