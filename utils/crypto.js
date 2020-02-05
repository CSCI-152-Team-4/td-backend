var crypto = require('crypto');

var encryptPass = (pass) => {
  var sha = crypto.createHash('sha256');
  sha.update(pass);
  return sha.digest('hex');
}

module.exports.encryptPass = encryptPass;