const express = require("express");
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
// Define routes
router.get("/", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
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
// Export the router
module.exports = router;
