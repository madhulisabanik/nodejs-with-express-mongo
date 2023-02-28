const crypto = require("crypto");
const jwt = require("jsonwebtoken"); 
const db = require("../models");
const User = db.users;

// Create and Save new User
exports.signup = async (req, res) => {

    if(!req.body.name) {
        res.status(400).send({ message: "Name is mandatory!" });
        return;
    } else if (!req.body.email) {
        res.status(400).send({ message: "Email is mandatory!" });
        return;
    } else if (!req.body.password) {
        res.status(400).send({ message: "Password is mandatory!" });
        return;
    }

    const hashedPassword = await hash(req.body.password);
    //console.log("hashedPassword: ", hashedPassword);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    //console.log("user obj--> ", user);

    user.save(user)
        .then((data) => {
            res.send({
                message: "User created successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// User Login
exports.signin = async (req, res) => {

    if (!req.body.email) {
        res.status(400).send({ 
            isSuccess: false,
            message: "Email is mandatory!" 
        });
        return;
    } else if (!req.body.password) {
        res.status(400).send({ 
            isSuccess: false,
            message: "Password is mandatory!" 
        });
        return;
    }

    // Checking if user email exists 
    const user = await User.findOne({ email: req.body.email });
    //console.log(user);
    if(!user){
        return res.status(400).send({ 
            isSuccess: false,
            message: "Invalid Email-ID" 
        });
    }
      
    // Checking if user password matches 
    const validPasword = await verify(req.body.password, user.password);

    if(!validPasword){
        return res.status(400).send({ isSuccess: false, message:"Incorrect Password" });
    } else {
        const token = gerenateAccessToken({ userid: user.id, useremail: user.email });
        res.status(200).send({
            isSuccess: true,
            message: "User loggedin successfully!",
            token
        });
    }
};

// Function to Hash the password using Scrypt (salted hashing algorithm)
async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
};

// Function to check the given password is matched with the Hashed password stored in DB
async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
};

// Generate JWT after successful login
function gerenateAccessToken(userObj) {
    return jwt.sign(userObj, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}