var DataBasePackage = require('levelup');
var Database = DatabasePackage('./database');
var OpsFromMiddleWare = require('./scrapertool/middleware.js')

var middleware = require("./middleware.js");

middleware.rawScrapeDataToDbOps("vegokoll").then(function(ops) {
  Database.batch(ops, function (err) {
      if (err) { return console.log('Ooops!', err); }
      console.log('All recipes succesfully stored!');
      });
});
