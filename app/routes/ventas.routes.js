module.exports = (app, verification) => {
    const ventas = require("../controllers/ventas.controller.js")

    var router = require("express").Router()

    router.get("/categorias", ventas.categorias)
    router.get("/categorias/fechas/:fecha1/:fecha2", ventas.categoriasPorFecha)

    router.get("/productos", ventas.productos)
    router.get("/productos/fechas/:fecha1/:fecha2", ventas.productosPorFecha)

    router.get("/zonas", ventas.zonas)
    router.get("/zonas/fechas/:fecha1/:fecha2", ventas.zonasPorFecha)

    router.get("/meseros", ventas.meseros)
    router.get("/cajeros", ventas.cajeros)

    router.get("/medios-pago", ventas.mediosPago)

    router.get("/buscar", ventas.ventaPorId)

    app.use('/api/ventas', verification, router)
};