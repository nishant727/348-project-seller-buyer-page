// server.js

// init project
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite1131.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
const sequelize = new Sequelize("sqlite::memory:");

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: DataTypes.TEXT
  },
  { sequelize, modelName: "category" }
);

(async () => {
  await sequelize.sync();
  
  try {
    const ticket = await Category.build({
      id: 0,
      description: "Ticket"
    });
    console.log(ticket.toJSON());
    await ticket.save();
    console.log("Ticket was saved to the database!");
  } catch (err) {
    console.log(err);
  }
  
  try {
    const clothing = await Category.build({
      id: 1,
      description: "Clothing"
    });
    console.log(clothing.toJSON());
    await clothing.save();
    console.log("Clothing was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const furniture = await Category.build({
      id: 2,
      description: "Furniture"
    });
    console.log(furniture.toJSON());
    await furniture.save();
    console.log("furniture was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const dorm_buys = await Category.build({
      id: 3,
      description: "Dorm Buys"
    });
    console.log(dorm_buys.toJSON());
    await dorm_buys.save();
    console.log("Dorm Buy was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const electronics = await Category.build({
      id: 4,
      description: "Electronics"
    });
    console.log(electronics.toJSON());
    await electronics.save();
    console.log("Electronic was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const textbooks = await Category.build({
      id: 5,
      description: "Textbooks"
    });
    console.log(textbooks.toJSON());
    await textbooks.save();
    console.log("Textbook was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const tutors = await Category.build({
      id: 6,
      description: "Tutor"
    });
    console.log(tutors.toJSON());
    await tutors.save();
    console.log("Tutor was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
})();

sequelize.sync();

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, price TEXT, contact TEXT, category int(22), datejoined TEXT)"
    );
    console.log("New table Items created");
  } else {
    console.log('Database "Items" ready to go!');
    //
    db.run(`PRAGMA read_uncommitted = 0`);
    // start indexes
    db.run(`CREATE INDEX IF NOT EXISTS ind_one ON Items(id)`);
    // end indexes
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the user in the database
app.get("/getItems", (request, response) => {
  db.all("SELECT * from Items", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a user to the database
app.post("/addItem", (request, response) => {
  console.log(`@@@@@@@@@add to items table ${request.body.item}`);
  if (!process.env.DISALLOW_WRITE) {
    const cleansedtitle = cleanseString(request.body.title);
    const cleanseddescription = cleanseString(request.body.description);
    const cleansedprice = cleanseString(request.body.price);
    const cleansedcontact = cleanseString(request.body.contact);
    const cleansedcategory = cleanseString(request.body.category);
    const cleanseddate = cleanseString(request.body.date);
    db.run(`BEGIN TRANSACTION EXCLUSIVE;`);
    db.run(
      `INSERT INTO Items (title, description, price, contact, category, datejoined) VALUES (?,?,?,?,?,?)`,
      cleansedtitle,
      cleanseddescription,
      cleansedprice,
      cleansedcontact,
      cleansedcategory,
      cleanseddate,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
    db.run(`COMMIT;`);
  }
});

/////////
app.post("/getByCategory", (request, response) => {
  console.log(`search by category ${request.body.Category2}`);
  const cleanCategory2 = cleanseString(request.body.Category2);
  db.all(
    `select * from Items where category ='${cleanCategory2}'`,
    (err, rows) =>{
      response.send(JSON.stringify(rows));
      // console.log(rows);
    }
  );
});
/////////

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
