var level = require('levelup');
var db = level('./database');

/////////////////////////////////////////////////////
/// store scraped list of recipes into './database'//
/////////////////////////////////////////////////////

//store a list of scraped recipes with format:
//{
//    recipeName: links[index]["recipeNamesId"],
//    recipeLink: links[index]["recipeLinksId"]
//}
//store into ./database with level db.
var storeScrapedRecipes = function(listOfScrapedRecipes, startIndex) {

  var ops = [];
  var recipeAmountOps = [];
  var recipeOps = [];
  var recipeLinkOps = [];
  var tempRecipeOps = {};
  var tempRecipeLinkOps = {};
  var recipeSitesScrapedOps = [];

  var indexed = startIndex;

  console.log(listOfScrapedRecipes);

  for (index in listOfScrapedRecipes) {

    var linkIndex = "linkIndex" + index.toString();
    var recipeIndex = "recipeIndex" + index.toString();

    tempRecipeOps = {
      type: 'put',
      key: recipeIndex,
      value: listOfScrapedRecipes[index]['recipeName']
     }

    recipeOps = recipeOps.concat(tempRecipeOps);

    tempRecipeLinkOps = {
      type: 'put',
      key: linkIndex,
      value: listOfScrapedRecipes[index]['recipeLink']
    }
    recipeLinkOps = recipeLinkOps.concat(tempRecipeLinkOps);

    indexed += 1;
  }

  recipeAmountOps = {
    type: 'put',
    key: "numberOfRecipes",
    value: indexed
  };

  recipeSitesScrapedOps = {
    type: 'put',
    key: "numberOfScrapedWebsites",
    value: Object.keys(links).length
  };

  ops = recipeOps.concat(recipeLinkOps, recipeAmountOps, recipeSitesScrapedOps);
  console.log(ops);

  db.batch(ops, function (err) {
    if (err) { return console.log('Ooops!', err); }
    console.log('All recipes succesfully stored!');
    });
}

//////////////////////////////////////////////
//Extra functions to be exported to server.js/
//////////////////////////////////////////////

//EXTERNAL_FUNCTION, THIS FUNCTION IS CALLED FROM: server.js
//promise function, resolves a recipe from its index in ./database
//with level db
var getRecipeName = function(index) {

  return new Promise(function(resolve, reject) {

    db.get(("recipeIndex" + index.toString()), function(err, recipe) {
      resolve(recipe);
    })
  });
}

//EXTERNAL_FUNCTION, THIS FUNCTION IS CALLED FROM: server.js
//promise function, resolves a link from its index in ./database
//with level db
var getRecipeLink = function(index) {

  return new Promise(function(resolve, reject) {

    db.get(("linkIndex" + index.toString()), function(err, link) {
      resolve(link);
    })
  });
}

//EXTERNAL_FUNCTION, THIS FUNCTION IS CALLED FROM: server.js
//promise function, resolves size of database (based on index)
var getAmountOfRecipes = function() {

  return new Promise(function(resolve, reject) {

    db.get("numberOfRecipes", function (err, amount) {
    resolve(amount);
  });
});
}

//EXTERNAL_FUNCTION, THIS FUNCTION IS CALLED FROM: server.js
//outputs the content of vegan_links.json to consolt
var logJSONFile = function() {

    console.log(links);
}

module.exports.logJSONFile = logJSONFile;
module.exports.getAmountOfRecipes = getAmountOfRecipes;
module.exports.getRecipeName = getRecipeName;
module.exports.getRecipeLink = getRecipeLink;
