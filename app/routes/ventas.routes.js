module.exports = (app, verification) => {
    const ventas = require("../controllers/ventas.controller.js");

    var router = require("express").Router();

    router.post("/", ventas.create);

    router.get("/", ventas.findAll);

    router.get("/productos", ventas.productos);
    router.get("/productos/fechas/:fecha1/:fecha2", ventas.productosPorFecha);

    app.use('/api/ventas', verification, router);
};