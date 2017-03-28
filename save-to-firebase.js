var firebase = require('firebase');

var scraper = require("./sites/scraper");

var config = {
    apiKey: "AIzaSyDPrMWV31IYUFBgLhC0F6S0ZW5S1YF43_4",
    authDomain: "veganskmiddagapp.firebaseapp.com",
    databaseURL: "https://veganskmiddagapp.firebaseio.com",
    storageBucket: "veganskmiddagapp.appspot.com",
    messagingSenderId: "945366919583"
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();

scraper().then(recipeData => {

    recipeData.filter(recipe => recipe.recipeName)
    .map(recipeBody => schemifyData(recipeBody))
    .map(recipe => {
        firebase.database().ref('recipes/').push(recipe);
    });

    console.log("Out of " + recipeData.length + " recipes, " + recipeData.filter(recipe => recipe.recipeName).length + " where successfully uploaded.")

})

function schemifyData(recipe) {

    if (recipe.recipeImage) {
        return {
            name: recipe.recipeName,
            url: recipe.recipeLink,
            imgurl: recipe.recipeImage,
            site: recipe.site,
        };
    } else {
        return {
            name: recipe.recipeName,
            url: recipe.recipeLink,
            imgurl: "",
            site: recipe.site,
        };
    }
}
