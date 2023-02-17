const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    
    if(!req.body.title) {
        res.status(400).send({ message: "Title cannot be empty!" });
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial.save(tutorial)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {

    Tutorial.find()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while fetching the Tutorials."
                });
            });
};

// Find a single Tutorial with an id (id as a param)
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
            .then((data) => {
                if(!data){
                    res.status(404).send({
                        message: "No tutorial found against the id: " + id
                    });
                }else{
                    res.send(data);
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while fetching the Tutorial with id: ." + id
                });
            });
}