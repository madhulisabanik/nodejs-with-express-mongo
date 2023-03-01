const db = require("../models");
const News = db.news;

// Create and Save new News
exports.create = (req, res) => {
    
    if(!req.body.title) {
        res.status(400).send({ message: "Title cannot be empty!" });
        return;
    } else if(!req.body.description) {
        res.status(400).send({ message: "Description cannot be empty!" });
        return;
    } else if(!req.body.newsCategory) {
        res.status(400).send({ message: "Please select News Category!" });
        return;
    } else if(!req.body.url) {
        res.status(400).send({ message: "URL cannot be empty!" });
        return;
    } else if(!req.body.urlToImage) {
        res.status(400).send({ message: "Image URL cannot be empty!" });
        return;
    }

    const news = new News({
        title: req.body.title,
        description: req.body.description,
        newsCategory: req.body.newsCategory,
        url: req.body.url,
        urlToImage: req.body.urlToImage
    });

    news.save(news)
        .then(data => {
            res.status(200).send({
                message: "News created successfully!",
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the News."
            });
        });
};

// Update News
exports.update = (req, res) => {
    
    if(!req.params.id) {
        return res.status(400).send({
            message: "No News-ID specified for update!"
        });
    }

    const id = req.params.id;

    News.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if(!data) {
                res.status(400).send({
                    message: "No News found against id: " + id
                });
            } else {
                res.send({
                    message: "News updated successfully!"
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating news with id: " + id
            });
        });
};

// Delete News
exports.delete = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No Id found to delete News!"
        });
    }

    const id = req.params.id;

    News.findByIdAndRemove(id)
        .then((data) => {
            if(!data) {
                res.status(400).send({
                    message: "No News found with the id: " + id
                });
            } else {
                res.send({
                    message: "News deleted succesfully!"
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error deleting News with id: ." + id
            });
        });
};

// Retrieve all News from the database
exports.findAll = (req, res) => {

    News.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching the News."
            });
        });
};