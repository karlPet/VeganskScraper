var mapping = require("./mapping.json");
var Xray = require("x-ray");
var _ = require("underscore");

var xray = Xray();

var internals = {
    paginate: "li.pager-next a@href",
    recipeId: ".node.teaser.teaser-recept",
    recipeNamesId: ".title a",
    recipeLinksId: ".title a@href",
    recipeImgId: "span a img@src"
};

var scrapeWebsite = () => new Promise((resolve, reject) => {

    Promise.all(_.range(9).map(pageindex => scrapePage("http://www.vegokoll.se/recept?page=" + pageindex + "&tid=50"))).then(result => {
        resolve(result.reduce((a, b) => a.concat(b)));
    });
});

function scrapePage(url) {
    return new Promise((resolve, reject) => {
        xray(url, internals.recipeId, [{
            recipeName: internals.recipeNamesId,
            recipeLink: internals.recipeLinksId,
            recipeImage: internals.recipeImgId
        }])((err, obj) => {
            if (err) {
                reject(err);
            }
            resolve(obj);
        });
    });
}

module.exports = scrapeWebsite;
