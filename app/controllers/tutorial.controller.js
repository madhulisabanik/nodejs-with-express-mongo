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
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            message: "No ID specified for update!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                if(!data) {
                    res.status(400).send({
                        message: "No data found to update aggainst id: " + id
                    });
                } else {
                    res.send({
                        message: "Data supdated successfully!"
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error updating tutorial with id: " + id
                });
            });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No Id found to delete tutorial"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
            .then((data) => {
                if(!data) {
                    res.status(400).send({
                        message: "No tutorial found with the id: " + id
                    });
                } else {
                    res.send({
                        message: "Tutorial deleted succesfully with id: " + id
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error deleting Tutorial with id: ." + id
                });
            })
};

// Delete all Tutorials from the database
exports.deleteAll = (req, res) => {

    Tutorial.deleteMany({})
            .then((data) => {
                res.send({
                    message: `${data.deletedCount} Tutorials were deleted successfully!`
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all tutorials."
                });
            })
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

    Tutorial.find({ published: true})
            .then((data) => {
                console.log(data)
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retriving published tutorials."
                });
            })
};