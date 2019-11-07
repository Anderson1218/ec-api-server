const jwt = require("jsonwebtoken");

exports.generateAuthToken = async id => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
};

exports.verifyAuthToken = async token => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};
