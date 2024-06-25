const User = require('../models/user');
const Flight = require('../models/flight');
const PersonalDetails = require('../models/PersonalDetail');
const ContactDetails = require('../models/ContactDetail');
const SeatPlan = require('../models/seatplan.js');
const PaymentDetails = require('../models/paymentDetails.js');
const TransactionDetails = require('../models/transactionDetails.js');
const ReservationDetails = require('../models/reservationDetails.js');
const ServiceDetails =  require('../models/services_model.js');
const bcrypt = require('bcryptjs');

//method for routecode
const citycode=(str)=>{
    return str.slice(-3);
}

const loginPost = async(req,res)=>{
    try{
        const check =await User.findOne({email: req.body.email})

        if(!check){
            res.json({message:"Account not Found"});
            console.log("Account not Found");
            return
        }
        const isPasswordMatch =  await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            req.session.userId = check._id;
            req.session.email = check.email;
            if (req.body.email === "admin@gmail.com") {
                res.redirect("adminpage"); 
            } else {
                res.render("home", {name: check.email, logstatus: "LOGOUT"}); 
            }
        }else{
            res.json({message: "Wrong password"})
        }
    }catch(err){
        res.send("Wrong Details");
        console.log(err)
    }
}

const signupPost = async (req,res)=>{
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
}

const adminpageGet = async (req, res)=>{
    try {
        const users = await User.find().exec();
        res.render("adminpage", {
            title: "Admin Page",
            users: users,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
}

const flightlistGet = async (req,res)=>{
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
}

const deleteFlight = async (req, res)=>{
    try{
        const flightnum = req.params.id;
        const deleteflight = await Flight.deleteOne({_id: flightnum});
        console.log(deleteflight.acknowledged);
        res.redirect('back')
    } catch(err){
        console.log(err)
        res.status(404)
    }
}

const editFlight = async (req,res)=>{
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            req.session.message = {
                type: 'danger',
                message: 'Flight not found!'
            };
            return res.redirect('/flightList');
        }
        res.render('editFlight', { flight });
    } catch (err) {
        req.session.message = {
            type: 'danger',
            message: err.message
        };
        res.redirect('/flightList');
    }
}

const addFlightPost = async (req,res)=>{
    const startingLocation = req.body.startingLocation;
    const destination = req.body.destination;
    let routecode = citycode(startingLocation).toUpperCase() + "=>" + citycode(destination).toUpperCase();
 
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
}

const updateFlightPost = async (req,res)=>{
    const flightId = req.params.id;
    const startingLocation = req.body.startingLocation;
    const destination = req.body.destination;

    let routecode = citycode(startingLocation).toUpperCase() + "=>" + citycode(destination).toUpperCase();


    try {
        const flight = await Flight.findById(flightId);

        if (!flight) {
            req.session.message = {
                type: 'danger',
                message: 'Flight not found!'
            };
            return res.redirect('/flightList');
        }

        flight.startingLocation = startingLocation;
        flight.destination = destination;
        flight.routecode = routecode;
        flight.departure = req.body.departure;
        flight.timeFlight = req.body.timeFlight;
        flight.price = req.body.price;

        await flight.save();

        req.session.message = {
            type: 'success',
            message: 'Flight updated successfully!'
        };
        res.redirect('/flightList');
        console.log("Flight updated successfully!");
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
}

const flightsearch = async (req, res)=>{
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

        res.render('flightStatus', {
            flights: flights.length ? flights : null,
            returnFlights: returnFlights.length ? returnFlights : null,
            tripType
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const submitDetailsPost = async (req,res)=>{
    try {
        // Get the user ID from the session
        const userId = req.session.userId;

        
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

        const seatPlanDoc = new SeatPlan({
            seatID: req.body.seat,
            travel_class: req.body.travelclass,
            seat_status: true
            
        });
        await seatPlanDoc.save();

        const paymentDetailsDoc = new PaymentDetails({
            amountPayment: req.body.amountOfPayment,
            paymentStatus: true

        })

        await paymentDetailsDoc.save();

        const transactionDetailsDoc = new TransactionDetails({
            paymentDetails: paymentDetailsDoc._id,
            transact_Type: req.body.paymentMethod,
            transact_No: new Date()+""+paymentDetailsDoc._id
        });

        await transactionDetailsDoc.save();

        let fType=req.body.triptype;
        if(fType==="round-trip"){
            const RreservationDetailsDoc = new ReservationDetails({
                passengerID: savedPersonalDetails.id,
                flightID: req.body.returncodeid,
                seatID:seatPlanDoc._id,
                transactionID:transactionDetailsDoc._id,
                flightType:req.body.triptype
    
            })
            await RreservationDetailsDoc.save();
        }

        const reservationDetailsDoc = new ReservationDetails({
            passengerID: savedPersonalDetails.id,
            flightID: req.body.departcodeid,
            seatID:seatPlanDoc._id,
            transactionID:transactionDetailsDoc._id,
            flightType:req.body.triptype

        })

        await reservationDetailsDoc.save();

        let ser = req.body.service;
        let des = "";
        
        if (ser === "Go Basic") {
            des = "Preferred seat: \nStandard seat of your choice";
        } else if (ser === "Go Easy") {
            des = `1pc hand-carry bag: 
        Max. weight of 7kg
        Preferred seat: 
        Standard seat of your choice
        1pc checked baggage: 
        Max. weight of 20kg`;
        } else {
            des = `1pc hand-carry bag: 
        Max. weight of 7kg
        Preferred seat: 
        Standard seat of your choice
        1pc checked baggage: 
        Max. weight of 20kg
        CEB Flexi:
        Convert your booking into non-expiring Travel Fund for future use`;
        }
        
        const serviceDetailsDoc = new ServiceDetails({
            servicePackage: req.body.service,
            serviceDesc: des,
            reservationID: reservationDetailsDoc._id
        });
        await serviceDetailsDoc.save();

        req.session.message = {
            type: 'success',
            message: 'Details submitted successfully!'
        };

        res.redirect('/transaction');
        console.log("Details submitted successfully!");
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
}

const adminReservationGet = async (req,res)=>{
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).send('User not logged in');
        }

        // Fetch all personal details for the given user ID
        const allPersonalDetails = await PersonalDetails.find({ user: userId }).lean();

        if (!allPersonalDetails || allPersonalDetails.length === 0) {
            return res.status(404).send('No Reservation found for the user');
        }

        // Array to hold all reservations grouped by personalDetails
        const reservationsByPersonalDetails = [];

        // Iterate over each personalDetails and fetch reservations
        for (const personalDetails of allPersonalDetails) {
            const reservations = await ReservationDetails.find({ passengerID: personalDetails._id })
                .populate({
                    path: 'passengerID',
                    model: 'PersonalDetails'
                })
                .populate({
                    path: 'seatID',
                    model: 'seatDetails'
                })
                .populate({
                    path: 'transactionID',
                    model: 'TransactDetails'
                })
                .populate({
                    path: 'flightID',
                    model: 'Flight'
                })
                .exec();

            reservationsByPersonalDetails.push({
                personalDetails: personalDetails,
                reservations: reservations
            });
        }

        // Render the view, passing in the array of reservations grouped by personalDetails
        res.render("reservationlist", {
            reservationsByPersonalDetails: reservationsByPersonalDetails
        });

    } catch (err) {
        // Handle errors by sending a JSON response with the error message
        res.json({ message: err.message });
    }
}

const reservationListGet = async (req,res)=>{
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).send('User not logged in');
        }

        // Fetch all personal details for the given user ID
        const allPersonalDetails = await PersonalDetails.find({ user: userId }).lean();

        if (!allPersonalDetails || allPersonalDetails.length === 0) {
            return res.status(404).send('No Reservation found for the user');
        }

        // Array to hold all reservations grouped by personalDetails
        const reservationsByPersonalDetails = [];

        // Iterate over each personalDetails and fetch reservations
        for (const personalDetails of allPersonalDetails) {
            const reservations = await ReservationDetails.find({ passengerID: personalDetails._id })
                .populate({
                    path: 'passengerID',
                    model: 'PersonalDetails'
                })
                .populate({
                    path: 'seatID',
                    model: 'seatDetails'
                })
                .populate({
                    path: 'transactionID',
                    model: 'TransactDetails'
                })
                .populate({
                    path: 'flightID',
                    model: 'Flight'
                })
                .exec();

            reservationsByPersonalDetails.push({
                personalDetails: personalDetails,
                reservations: reservations
            });
        }

        // Render the view, passing in the array of reservations grouped by personalDetails
        res.render("reservationlist", {
            reservationsByPersonalDetails: reservationsByPersonalDetails
        });

    } catch (err) {
        // Handle errors by sending a JSON response with the error message
        res.json({ message: err.message });
    }
}

const flightgetID = async (req,res)=>{
    try {
        const flightId = req.params.id;
        const flight = await Flight.findById(flightId);
        if (!flight) {
          return res.status(404).send('Flight not found');
        }
        res.json(flight);
      } catch (error) {
        console.error('Error retrieving flight information:', error);
        res.status(500).send('Internal server error');
      }
}

const flightPost = async (req,res)=>{
    try {
        const { startingLocation, destination, routecode, departure, timeFlight, price } = req.body;
    
        // Ensure the departure date is a valid date
        const parsedDeparture = new Date(departure);
        if (isNaN(parsedDeparture)) {
          return res.status(400).send('Invalid departure date');
        }
    
        const newFlight = new Flight({
          startingLocation,
          destination,
          routecode,
          departure: parsedDeparture,
          timeFlight,
          price,
        });
    
        await newFlight.save();
        res.status(201).json(newFlight);
      } catch (error) {
        console.error('Error creating flight:', error);
        res.status(500).send('Internal server error');
      }
}

module.exports = {
    loginPost,
    signupPost,
    adminpageGet,
    flightlistGet,
    deleteFlight,
    addFlightPost,
    editFlight,
    updateFlightPost,
    submitDetailsPost,
    flightsearch,
    adminReservationGet,
    reservationListGet,
    flightgetID,
    flightPost
}