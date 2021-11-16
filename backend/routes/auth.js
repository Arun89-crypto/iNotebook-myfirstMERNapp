const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SEC = "iamagoodboy";

//ROUTE 1: Create a USER using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req); //getting if there are any errors in the validation request
    let success = false;
    if (!errors.isEmpty()) {
        //if errors return bad request
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry the user with email already exists" })
        }
        const salt = await bcrypt.genSalt() //getting the salt from bcryptjs 
        const secPass = await bcrypt.hash(req.body.password, salt); //generating the hash for the password using password and the salt
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC);
        success = true;
        console.log(authToken);
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

//ROUTE 2: Authenticate a USER using POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC);
        console.log(authToken);
        success = true
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})


//ROUTE 3: Getting a USER using POST "/api/auth/getuser". No login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server Error" })
    }
})
module.exports = router