var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');

var helpers = {};

//  create SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;

  }else{
    return false;
  }
}

helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj
  }catch(e){
    return {}
  }
}


helpers.createRandomString = function(strLength){
    var strLen = typeof(strLength) == 'number' && strLength > 0 ? strLength : false
    if(strLen){
      var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var str = ''
      for(i= 1; i<= strLen; i++){
        var randomCharc = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str += randomCharc
      }
      return str;
    }else{
      return false;
    }
  }


helpers.sendTwilioSms = function(phone,msg,callback){
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim(): false
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1660 ? msg.trim() : false
  if(phone && msg){
    // config request payload
    var payload ={
      'From': config.twilio.fromPhone,
      'To': '+1'+phone,
      'Body': msg
    }
    var stringPayload = querystring.stringify(payload);
    var requestDetails = {
      'protocol': 'https:',
      'hostname': 'api.twilio.com',
      'method': 'POST',
      'path': '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth': config.twilio.accountSid+':'+config.twilio.authToken,
      'headers': {
        'Content-Type': 'application/x-ww-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };
    var req = https.request(requestDetails,function(res){
      var status = res.statusCode;
      if(status == 200 || status == 201){
        callback(false)
      }else{
        callback('Status code returned was'+status)
      }
    });

    // bind to err event so it doesn't get thrown
    req.on('error',function(e){
      callback(e)
    })
    // add payload
    req.write(stringPayload);
    // end request
    req.end()

  }else{
    callback('Given params were missing or invalid')
  }
}

module.exports = helpers
