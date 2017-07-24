var mongoose = require("mongoose");

/*
recipeSchema is a data model for the mongodb storage.
- id should start at 0 and increment for every save
TODO: id should probably not be used, read up on gettig random database element
      methods that are already in the mongodb api.
- name the name of the recipe
- url the web adress to the recipe
- site the site the recipe is scraped from (example: "koket")
- scrapedAt the date when the links was scraped
*/
var recipeSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  imgurl: { type: String, required: false},
  site: { type: String, require: true },
  rate:{type:Number, default:0},
  createdAt: { type: Date, default: Date.now }
});

var Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;