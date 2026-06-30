const Part = require("../models/Part");
const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const rawParts = [
        {
          name: "Basic Wing",
          value: 85,
          stock: 300,
          type: "Wing",
          filename: "icon1.png",
          description: "Won't do much more than fly",
        },
        {
          name: "Fast Wing",
          value: 350,
          stock: 85,
          type: "Wing",
          filename: "icon2.png",
          description: "Light and easy to soar with.",
        },
        {
          name: "Fighter Wing",
          value: 600,
          stock: 40,
          type: "Wing",
          filename: "icon3.png",
          description: "A bulky and reliable arm.",
        },
        {
          name: "Ace Wing",
          value: 1300,
          stock: 15,
          type: "Wing",
          filename: "icon4.png",
          description: "Enough to make a comet jealous.",
        },
        {
          name: "Basic Cockpit",
          value: 150,
          stock: 150,
          type: "Cockpit",
          filename: "icon5.png",
          description: "The windows need cleaning.",
        },
        {
          name: "Professional's Cockpit",
          value: 400,
          stock: 70,
          type: "Cockpit",
          filename: "icon6.png",
          description: "More buttons than you know what to do with.",
        },
        {
          name: "Battle Station",
          value: 800,
          stock: 55,
          type: "Cockpit",
          filename: "icon7.png",
          description: "Could unite into a giant robot, probably.",
        },
        {
          name: "Executive Throne",
          value: 2300,
          stock: 10,
          type: "Cockpit",
          filename: "icon8.png",
          description: "It even has a wine cup holder.",
        },
        {
          name: "Basic Hull",
          value: 130,
          stock: 150,
          type: "Hull",
          filename: "icon9.png",
          description: "All holes covered up last minute.",
        },
        {
          name: "Sturdy Hull",
          value: 300,
          stock: 90,
          type: "Hull",
          filename: "icon12.png",
          description: "Don't go ramming into asteroids with this anyway.",
        },
        {
          name: "War Hull",
          value: 900,
          stock: 50,
          type: "Hull",
          filename: "icon11.png",
          description: "Enough weapons aboard to make a soldier blush.",
        },
        {
          name: "Lightspeed Hull",
          value: 4000,
          stock: 1,
          type: "Hull",
          filename: "icon10.png",
          description: "A fragment of a legendary ship.",
        },
        {
          name: "Basic Thrusters",
          value: 50,
          stock: 230,
          type: "Thruster",
          filename: "icon15.png",
          description: "Only slightly better than a kitchen stove",
        },
        {
          name: "HH Thrusters",
          value: 220,
          stock: 100,
          type: "Thruster",
          filename: "icon14.png",
          description: "That stands for High Horsepower, mind.",
        },
        {
          name: "Flaming Thrusters",
          value: 750,
          stock: 60,
          type: "Thruster",
          filename: "icon13.png",
          description: "Illegal in most Terra Federation orbits.",
        },
        {
          name: "Supernova Thrusters",
          value: 3000,
          stock: 5,
          type: "Thruster",
          filename: "icon24.png",
          description: "I hope you have a solid stomach.",
        },
      ];

      const partsToSeed = rawParts.map((part) => {
        const filePath = path.join(__dirname, `../assets/${part.filename}`);

        const iconBuffer = fs.existsSync(filePath)
          ? fs.readFileSync(filePath)
          : null;

        return {
          name: part.name,
          value: part.value,
          stock: part.stock,
          type: part.type,
          icon: iconBuffer,
          description: part.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      await queryInterface.bulkInsert("parts", partsToSeed);
    } catch (err) {
      console.error("Error during seeding", err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parts", null, {});
  },
};
