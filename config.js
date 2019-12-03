var environments = {};

environments.staging = {
  'port': 3000,
  'envName': 'staging'
};
environments.production = {
  'port': 5000,
  'envName': 'production'
};

var current_environment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

var environmentToExport = typeof(environments[current_environment]) == 'object' ? environments[current_environment] : environments.staging

module.exports = environmentToExport;
