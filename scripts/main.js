
const API = require("./directline/main");
const WORLD = require("./world/main");

const Promise = require('es6-promise').Promise;

const credentials = require("./credentials.json");

const SECRET = credentials.SECRET;


let modules = [];

modules.push(API.initialize(SECRET));


Promise.all(modules)
	.then((data) => {
		return data[0];
	})
	.then((data) => {
		return WORLD.initialize();
	})
	.catch((error) => {

		throw new Error(error)
	})


