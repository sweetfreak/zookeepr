const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js");
const {zookeepers} = require('../data/zookeepers.json');

jest.mock('fs')

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
      { name: "Darlene", id: "jhgdja3ng2" },
      zookeepers
    );
  
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
  });

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Jesse",
            favoriteAnimal: "gorilla",
            age: 30
        },
        {
            id: "4",
            name: "Zoe",
            favoriteAnimal: "Sheep",
            age: 26
        },
    ];

    const updatedZookeepers = filterByQuery({age: 30}, startingZookeepers);
    
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by ID", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Jesse",
            favoriteAnimal: "gorilla",
            age: 30
        },
        {
            id: "4",
            name: "Zoe",
            favoriteAnimal: "Sheep",
            age: 26
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Jesse")
});

test("validates age", () => {
    const zookeeper = {
            id: "3",
            name: "Jesse",
            favoriteAnimal: "gorilla",
            age: 30
      };

    const invalidZookeeper = {
            id: "4",
            name: "Zoe",
            favoriteAnimal: "Sheep",
            age: "26"
      };
      

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
    
    expect(result).toBe(true);
    expect(result2).toBe(false);
});