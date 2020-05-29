const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.set('view', path.join(__dirname, 'views'));

app.set('view-engine', 'ejs');