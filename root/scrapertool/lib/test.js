var middleware = require("./middleware.js");

middleware.rawScrapeDataToDbOps("tasteline").then(function(results) {
  console.log(results);
});
