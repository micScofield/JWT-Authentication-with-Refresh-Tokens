const jwt = require("jsonwebtoken");

function signAccessToken(payload) {
  const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5s',
  });
  return { newToken }
}

function signRefreshToken(payload) {
  const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: '5m',
  });
  return { newRefreshToken }
}

exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
