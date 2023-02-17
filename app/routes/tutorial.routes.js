module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();
    // router.use((req,res,next) => {
    //     console.log("inside router -->", req.body);
    //     next();
    // });

    router.post("/", tutorials.create);

    router.get("/", tutorials.findAll);

    router.get("/:id", tutorials.findOne);

    app.use('/api/tutorials', router);
}