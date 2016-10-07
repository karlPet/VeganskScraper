var middleware = require("./middleware.js");

middleware.rawScrapeDataToDbOps("vegokoll").then(function(results) {
  console.log(results);
});
