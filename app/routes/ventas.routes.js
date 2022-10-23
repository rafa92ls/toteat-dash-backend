module.exports = (app, verification) => {
    const ventas = require("../controllers/ventas.controller.js");

    var router = require("express").Router();

    router.post("/", ventas.create);

    router.get("/", ventas.findAll);

    router.get("/:id", ventas.findOne);

    router.delete("/", ventas.deleteAll);

    app.use('/api/ventas', verification, router);
};