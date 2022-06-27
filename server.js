const express = require('express');

const app = express();

const {animals} = require('./data/animals');

app.get('/api/animals', (req, res) => {
    let results = animals;

    if (req.query) {
        results = filterByQuery(req.query, results);
    };
    
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API Server now on port 3001!`);
})

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //Note that we still save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //if personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        } 
        
        //now loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filteredResults array
            //remember: it is initially a copy of the animalsArray, but here're we're updating it for each trait in the forEach() loop.
            //for each trait being targeting by the filter, the filteredResults array will then contain only the entries that contain the trait,
            //So, at the end we'll have an array of animals that have every one of the traits when the forEach() loop is finished.
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        })
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}
