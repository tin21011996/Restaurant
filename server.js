/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/
'use strict';
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./utils/routes');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./routes/users');
const config = require('./config/database');

// Connect to MongoDB
mongoose.connect(config.database);

// Listen connection
mongoose.connection.on("connected", () => {
    console.log('Connected to database: ' + config.database)
});

// Listen error
mongoose.connection.on("error", (err) => {
  console.log("Database connection: " + err)
});

class Server{

	constructor(){
		this.port = 8080;
		this.host = `localhost`;
		this.app = express();
	}

	appConfig(){
		this.app.use(bodyParser.json());
		this.app.use(
			cors()
    );
    // Passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    require('./config/passport')(passport);

    this.app.use("/users", users);

    // Router
    this.app.get("/", (req, res) => {
      res.send("Hello world, welcome to backend MEAN-Stack")
    });
	}

	/* Including app Routes starts*/
	includeRoutes(){
		new routes(this.app).routesConfig();
	}
	/* Including app Routes ends*/

	appExecute(){

		this.appConfig();
		this.includeRoutes();

		this.app.listen(this.port, this.host, () => {
			console.log(`Listening on http://${this.host}:${this.port}`);
		});
  }
}

const app = new Server();
app.appExecute();
