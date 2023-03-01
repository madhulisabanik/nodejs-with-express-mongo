module.exports = app => {
    
    const news = require("../controllers/news.controller");
    const auth = require("../middleware/auth");
    var router = require("express").Router();

    router.post("/", auth, news.create);
    
    router.put("/:id", auth, news.update);

    router.delete("/:id", auth, news.delete);

    router.get("/", news.findAll);

    app.use('/api/news', router);
};