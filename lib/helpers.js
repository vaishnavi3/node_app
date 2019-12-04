var crypto = require('crypto');
var config = require('./config');

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

helpers.parseJsonToBbject = function(str){
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

module.exports = helpers
