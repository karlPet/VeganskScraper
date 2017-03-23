var mapping = require("./mapping.json");
var Xray = require("x-ray");
var xray = Xray();

var internals = {
    recipeId: ".wrapper",
    recipeNamesId: ".title2 a",
    recipeLinksId: ".title2 a@href",
    recipeImgId: ".img-wrapper a img@src"
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
        obj.forEach(n => {

            let length = n.recipeImage.length;
            let imgurl = n.recipeImage.replace("&w=150&h=110&c=y", "&w=640&h=480&c=y");
            n.recipeImage = imgurl;
        });

        resolve(obj);
    });
});

module.exports = scrapeWebsite;
