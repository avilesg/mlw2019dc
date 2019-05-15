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
  return {
 	 'loadDate': fn.currentDate(),
    'originalource': 'CSV export from RDBMS',
    'loadedBy': xdmp.getCurrentUser()
  };
}

module.exports = {
  createHeaders: createHeaders
};
