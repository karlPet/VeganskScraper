var mapping = require("./mapping.json");
var Xray = require("x-ray");
var xray = Xray();

var internals = {
    paginate: "",
    recipeId: ".recipe-header",
    recipeNamesId: "h2",
    recipeLinksId: "a@href",
    recipeImgId: ".recipe-header-image a img@src"
};

var scrapeWebsites = () => new Promise((resolve, reject) => {

    Promise.all(mapping.links.map(site => scrapeWebsite(site)))
    .then(recipeData =>
        resolve(recipeData.reduce((a, b) => a.concat(b)) // reduce just merges all arrays of recipes into one array
    ));
});


var scrapeWebsite = (site) => new Promise(function(resolve, reject) {

    xray(site, internals.recipeId, [{
        recipeName: internals.recipeNamesId,
        recipeLink: internals.recipeLinksId,
        recipeImage: internals.recipeImgId
    }]).paginate(internals.paginate)(function(err, obj) {

        if (err) {
            reject(err);
        }

        obj.filter(n => n.recipeImage === 'http://cdn1.tasteline.com/Food_missing-336x222.jpg')
           .forEach(n => delete n.recipeImage);

        resolve(obj);
    });
});



module.exports = scrapeWebsites;
