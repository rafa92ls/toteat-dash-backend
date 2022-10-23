module.exports = (app) => {
    const login = require("../controllers/login.controller.js");

    var router = require("express").Router();

    router.post("/", login.login);

    router.post("/", login.logout);

    app.use('/api/login', router);
};