import requestServer from '../request-server';

var internals = {};

internals.login = function(data) {
  return requestServer(
    '/api/v1/clientdetails',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};

internals.fetchportfolioService = function(data) {
  return requestServer(
    '/api/v1/fetchportfolio',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};

internals.rebalancingdetailsService = function(data) {
  return requestServer(
    '/api/v1/vf/RebalancingDetails ',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};

internals.getschemedetailsService = function(data) {
  return requestServer(
    '/api/v1/getSchemeDetails',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};

internals.searchService = function(data) {
  return requestServer(
    '/api/v1/search',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};

internals.nomineeDetails = function(data) {
  return requestServer(
    '/api/v1/investmentcart/view',
    data,
    'POST',
    {},
    'demo',
    'application/json; charset=utf-8',
    true
  );
};



export default internals;
