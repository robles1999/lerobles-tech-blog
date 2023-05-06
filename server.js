const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require('./controllers');

const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;


// Inform Express.js on which template engine to use
// create an instance of the Handlebars engine
const hbs = exphbs.create({ /* configuration options */ });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT + '/'));
});
