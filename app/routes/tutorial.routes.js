module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();
    // router.use((req,res,next) => {
    //     console.log("inside router -->", req.body);
    //     next();
    // });

    router.post("/", tutorials.create);

    router.get("/", tutorials.findAll);

    router.get("/published", tutorials.findAllPublished);

    router.get("/:id", tutorials.findOne);

    router.put("/:id", tutorials.update);

    router.delete("/:id", tutorials.delete);

    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
}