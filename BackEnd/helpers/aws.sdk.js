const AWS = require("aws-sdk");

// Configuración de las credenciales de AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-west-2",
});

module.exports = AWS;
