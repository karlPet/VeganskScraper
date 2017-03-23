var mapping = require(__dirname + "/mapping.json");
var Xray = require("x-ray");
var xray = Xray();

var internals = {
    recipeId: ".list-item.recipe",
    recipeNamesId: "a img@alt",
    recipeLinksId: "a@href",
    recipeImgId: "a img@src",
    alternateRecipeImage: "a noscript img@src"
};

var scrapeWebsite = () => new Promise(function(resolve, reject) {

    xray(mapping.links[0], internals.recipeId, [{
        recipeName: internals.recipeNamesId,
        recipeLink: internals.recipeLinksId,
        recipeImage: internals.recipeImgId,
        alternateRecipeImage: internals.alternateRecipeImage
    }])((err, obj) => {
        if (err) {
            reject(err);
        }
        obj.filter(n => n.alternateRecipeImage)
           .forEach(n => {
               n.recipeImage = n.alternateRecipeImage;
               delete n.alternateRecipeImage;
           });

        resolve(obj);
    });
});

module.exports = scrapeWebsite;
