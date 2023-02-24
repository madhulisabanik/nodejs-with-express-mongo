const crypto = require("crypto");
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