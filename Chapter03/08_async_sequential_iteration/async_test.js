"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const async = require('async');
const utilities = require('./utilities');

let links = ["hello", "world", "facebook", "google", "amazon"];

let callback = (err, result) => {
	console.log("done !", err, result)
}

async.eachSeries(links, (link, callback) => {
    console.log("link", link);
    callback(null)
  }, callback);