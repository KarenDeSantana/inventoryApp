require('./model/userModel');
require('./model/articleModel');
require("./config/db");
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
// const requireAuth = require('./middlewares/requireAuth');
const articleRoutes = require('./routes/articleRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(articleRoutes);
app.use(imageRoutes);

// Setup server port
const port = process.env.PORT || 8080;

app.get('/', (req, res) => { //app.get('/', requireAuth, (req, res) => {
    res.send('Welcome');
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});