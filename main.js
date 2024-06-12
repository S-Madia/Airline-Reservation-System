require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// Initialize Express application
const app = express();

// Database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to the Database!"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "my secret key", // Use an environment variable for the session secret if possible
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Static files
app.use(express.static("uploads"));
app.use(express.static("public/css"));
app.use(express.static("public/js"));
app.use(express.static("public/images"));
// Set template engine
app.set("view engine", "ejs");

// Use the routes defined in routes.js
const routes = require('./routes/routes');
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
