const express = require("express");
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const Flight = require('../models/flight');
const bcrypt = require('bcryptjs');
//method for routecode
function removeVowels(str) {
    return str.replace(/[aeiouAEIOU]/g, '');
}
// Define routes
router.get("/", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/addFlight", (req, res) => {
    res.render("addFlight");
});

router.post('/signup', async (req, res) => { // Corrected async placement
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            res.send("This Email is already been used.");
        } else {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);

            await user.save(); // Save the user to the database

            req.session.message = {
                type: 'success',
                message: 'User added successfully!'
            };
            res.redirect('/');
            console.log("User added successfully!");
        }
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.post('/login', async (req, res)=>{

    try{
        const check =await User.findOne({email: req.body.email})

        if(!check){
            res.send("Account not Found");
            console.log("Account not Found");
        }

        const isPasswordMatch =  await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            if (req.body.email === "admin@gmail.com") {
                res.redirect("adminpage"); // Redirect to admin page
            } else {
                res.render("home"); // Render home page
            }
        }else{
            res.send("Wrong password");
        }
    }catch{
        res.send("Wrong Details");
    }

});
// Admin page route
router.get('/adminpage', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().exec();
        // Render the index view, passing in the title and the list of users
        res.render("adminpage", {
            title: "Admin Page",
            users: users,
        });
    } catch (err) {
        // Handle errors by sending a JSON response with the error message
        res.json({ message: err.message });
    }
});
router.get('/flightList', async (req, res) => {
    try {
        // Fetch all flight from the database
        const flight = await Flight.find().exec();
        // Render the index view, passing in the title and the list of flight
        res.render("flightList", {
            title: "Admin Page",
            flight: flight,
        });
    } catch (err) {
        // Handle errors by sending a JSON response with the error message
        res.json({ message: err.message });
    }
});
router.post("/addFlight",async (req, res) =>{
    const startingLocation = req.body.startingLocation;
        const destination = req.body.destination;

        // Remove vowels and concatenate
        let routecode = removeVowels(startingLocation).toUpperCase() + '-' + removeVowels(destination).toUpperCase();
 
    const flight = new Flight({
        startingLocation: req.body.startingLocation,
        destination: req.body.destination,
        routecode:routecode,
        departure: req.body.departure,
        timeFlight: req.body.timeFlight,
        price: req.body.price
    });
    flight.save()
    .then(() => {
        req.session.message = {
            type: 'success',
            message: 'Flight added successfully!'
        };
        res.redirect('/flightList');
        console.log("Flight added successfully!");
    })
    .catch((err) => {
        res.json({ message: err.message, type: 'danger' });
    });
});

// Search route
router.get('/search', async (req, res) => {
    const { from, to, departureDate, returnDate } = req.query;
    
    try {
        const flights = await Flight.find({
            startingLocation: from,
            destination: to,
            departure: { $gte: new Date(departureDate) }
        });
        const returnFlights = await Flight.find({
            startingLocation: to,
            destination: from,
            departure: { $gte: new Date(returnDate) }
        });

        if (flights.length === 0 && returnFlights.length === 0) {
            return res.render('flightStatus', { flights: null, returnFlights: null });
        }

        res.render('flightStatus', { flights, returnFlights }); // Pass both flights and returnFlights
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router;
