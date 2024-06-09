const express = require("express");
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const Flight = require('../models/flight');
const PersonalDetails = require('../models/PersonalDetail');
const ContactDetails = require('../models/ContactDetail');
const bcrypt = require('bcryptjs');
//method for routecode
function removeVowels(str) {
    return str.replace(/[aeiouAEIOU]/g, '');
}
// Define routes
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render("login", { users }); // Pass the users to the view
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/addFlight", (req, res) => {
    res.render("addFlight");
});
router.get("/guestDetails", (req, res) => {
    const userId = req.session.userId;
    res.render('guestDetails', { userId: userId });
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
            req.session.userId = check._id;
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

router.get('/search', async (req, res) => {
    const { from, to, departureDate, returnDate, tripType } = req.query;
    
    try {
        const flights = await Flight.find({
            startingLocation: from,
            destination: to,
            departure: { $gte: new Date(departureDate) }
        });

        let returnFlights = [];
        if (tripType === 'round-trip' && returnDate) {
            returnFlights = await Flight.find({
                startingLocation: to,
                destination: from,
                departure: { $gte: new Date(returnDate) }
            });
        }

        res.render('flightStatus', { flights: flights.length ? flights : null, returnFlights: returnFlights.length ? returnFlights : null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//Create a new ContactDetails PersonalDetails document
router.post("/submitDetails", async (req, res) => {
    try {
        // Get the user ID from the session
        const userId = req.session.userId;

        if (!userId) {
            return res.status(403).json({ message: "User ID not found in session", type: "danger" });
        }
        
        // Create a new PersonalDetails document
        const personalDetailsDoc = new PersonalDetails({
            user: userId, // Assign the user ID obtained from the session
            firstname:req.body.firstname,
            middleinitial: req.body.middleinitial,
            lastname: req.body.lastname,
            suffix: req.body.suffix,
            gender: req.body.gender,
            birthday: new Date(req.body.birthday),
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country
            },
            nationality: req.body.nationality
        });

        const savedPersonalDetails = await personalDetailsDoc.save();

        // Create a new ContactDetails document
        const contactDetailsDoc = new ContactDetails({
            personalDetails: savedPersonalDetails._id,
            email: req.body.email,
            phone: req.body.phone,
            telno: req.body.telno,
            emergency: {
                emergencyname: req.body.emergencyname,
                emergencyno: req.body.emergencyno
            },
        });

        await contactDetailsDoc.save();

        req.session.message = {
            type: 'success',
            message: 'Details submitted successfully!'
        };

        res.redirect('/');
        console.log("Details submitted successfully!");
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

// Export the router
module.exports = router;
