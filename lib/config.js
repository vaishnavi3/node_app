var environments = {};

environments.staging = {
  'port': 3000,
  'envName': 'staging',
  'hashingSecret': 'Thisisasecret',
  'maxChecks': 5,
  twilio: {
    'acountSid': '',
    'authToken': '',
    'fromPhone': ''
  }
};
environments.production = {
  'port': 5000,
  'envName': 'production',
  'hashingSecret': 'Thisisalsoasecret',
  'maxChecks': 5,
  twilio: {
    'acountSid': '',
    'authToken': '',
    'fromPhone': ''
  }
};

var current_environment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

var environmentToExport = typeof(environments[current_environment]) == 'object' ? environments[current_environment] : environments.staging

module.exports = environmentToExport;
