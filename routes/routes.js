const express = require("express");
// const session = require('express-session');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/routescontroller');

router.get('/flight/:id', controller.flightgetID);
  
router.post('/flight', controller.flightPost);

router.get("/", async (req, res)=>{
    const name = req.session.email; 
    if (!name) {
        res.render("home", { name: "Guest", logstatus: "LOGIN" });
    } else {
        res.render("home", { name: name, logstatus: "LOGOUT" });
    }
    console.log(req.session.id)
})
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/transaction", (req, res) => {
    res.render("transaction");
});
router.get("/aboutUs", (req, res) => {
    const name = req.session.email;
    if (!name) {
        res.render("aboutUs", { name: "Guest", logstatus: "LOGIN" });
    } else {
        res.render("aboutUs", { name: name, logstatus: "LOGOUT" });
    }
    
});
router.get("/addFlight", (req, res) => {
    res.render("addFlight");
});
router.get("/guestDetails", (req, res) => {
    const userId = req.session.userId;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    res.render('guestDetails', { userId: userId });
});

router.post('/signup', controller.signupPost);

router.post('/login', controller.loginPost)
    .get("/login", (req, res)=>{
        res.render("login");
    });

// Admin page route
router.get('/adminpage', controller.adminpageGet);
router.get('/flightList', controller.flightlistGet);

router.get('/delete/:id', controller.deleteFlight)



router.post("/addFlight", controller.addFlightPost);

// Render the edit page
router.get('/edit/:id', controller.editFlight);

// Update flight
router.post("/updateFlight/:id", controller.updateFlightPost);
router.get('/search', controller.flightsearch);

router.post("/submitDetails", controller.submitDetailsPost);


router.get('/adminReservation', controller.adminReservationGet);


router.get('/reservationlist', controller.reservationListGet);

router.use((req, res) =>{
    res.status(404).render('error')
})

// Export the router
module.exports = router;
