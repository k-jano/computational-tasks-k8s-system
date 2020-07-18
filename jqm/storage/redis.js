const Redis = require("ioredis");

module.exports = new Redis({
  port: 30018, // Redis port
  host: "172.17.0.2", // Redis host
  db: 0,
});