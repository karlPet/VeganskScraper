var mapping = require("./mapping.json");
var Xray = require("x-ray");
var xray = Xray();

var internals = {
    recipeId: ".product.recipe",
    recipeNamesId: ".prodHeader a",
    recipeLinksId: ".prodHeader a@href",
    recipeImgId: ".prodImg a img@src"
};

var scrapeWebsite = () => new Promise((resolve, reject) => {
    xray(mapping.links[0], internals.recipeId, [{
        recipeName: internals.recipeNamesId,
        recipeLink: internals.recipeLinksId,
        recipeImage: internals.recipeImgId
    }])((err, obj) => {

        if (err) {
            reject(err);
        }

        obj.filter(n => n.recipeImage === "https://static.mathem.se/shared/images/recipes/genericWithoutBorder.png")
            .forEach(n => delete n.recipeImage);

        resolve(obj);
    });
});

module.exports = scrapeWebsite;
