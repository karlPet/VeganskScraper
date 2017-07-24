var Xray = require("x-ray");
var xray = Xray();

const url = "https://www.ica.se/Templates/ajaxresponse.aspx?ajaxFunction=RecipeListMdsa&filter=Specialkost%3AVegan&filter=M%C3%A5ltid%3AMiddag&mdsarowentityid=b0298f73-93cd-4249-8f22-a4a401080676&num=1000&sortbymetadata=Relevance&id=12&_hour=1";

var scrapeWebsite = () => new Promise((resolve,reject) => {

    xray(url, {
        recipeNames:  ['.recipe div header h2 a'],
        recipeLinks:  ['.recipe div header h2 a@href'],
        recipeImages: ['.recipe div figure a noscript img@src']
    })((err, obj) => {
        if (err) {
            reject(err)
        }
        let recipes = [].concat(obj.recipeNames)
            .map((elem, index) => ({
                recipeName: elem,
                recipeLink:  obj.recipeLinks[index],
                recipeImage: obj.recipeImages[index]
            }))
        resolve(recipes)
    })
})

module.exports = scrapeWebsite;