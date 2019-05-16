function get(context, params) {
  // return zero or more document nodes
  let title = params.title;

  return cts.search(
    cts.jsonPropertyValueQuery("name", title, "case-insensitive")
  );
};

function post(context, params, input) {
  // return zero or more document nodes
};

function put(context, params, input) {
  // return at most one document node
};

function deleteFunction(context, params) {
  // return at most one document node
};

exports.GET = get;
exports.POST = post;
exports.PUT = put;
exports.DELETE = deleteFunction;
