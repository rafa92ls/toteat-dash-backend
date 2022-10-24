const axios = require('axios')
const _ = require('lodash')

exports.create = (req, res) => {
  return res.send([{ data: "OK!" }]);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
};

exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { data, status } = await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    const datesH = data.filter(el => {
      return el.date_closed === '2019-03-10 14:42:28'
    })
    // const zonas = []
    // for(inputs of data) {
    //   if (!zonas.includes(inputs.waiter)) {
    //     zonas.push(inputs.waiter)
    //   }
    // }
    res.send(datesH);
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while removing all tutorials."
    //     });

  } catch (error) {
    console.log('ERROR!!', error)
    res.status(500).send({
      message: error
    });
  }
};

exports.productos = async (req, res) => {
  try {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { data, status } = await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }
    let productosTotales = []
    for (const inputs of data) {
      productosTotales = productosTotales.concat(inputs.products)
    }

    const productosCategorias =
      _.mapValues(
        _.groupBy(productosTotales, 'category'),
        el => el.map(el2 => _.omit(el2, 'category'))
      )

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      const productosNombre =
        _.mapValues(
          _.groupBy(products, 'name'),
          el => el.map(el2 => _.omit(el2, 'name'))
        )

      for (const [key2, infoProd] of Object.entries(productosNombre)) {
        let priceTotal = 0
        let quantityTotal = 0
        for (priceQty of infoProd) {
          priceTotal += priceQty.price
          quantityTotal += priceQty.quantity
        }
        productosNombre[key2] = { priceTotal, quantityTotal }
      }
      resp[key] = productosNombre
    }
    res.send(resp)

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

exports.productosPorFecha = async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.fecha1)
    const fechaFinal = new Date(req.params.fecha2)
    
    const { data, status } = await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    let productosTotales = []
    for (const inputs of data) {
      const products = []
      for (const prodDetail of inputs.products) {
        const fechaProd = new Date(inputs.date_closed.split(' ')[0])
        if(fechaInicio <= fechaProd && fechaFinal >= fechaProd) {
          prodDetail.fecha = inputs.date_closed.split(' ')[0]
          products.push(prodDetail)
        }
      }
      productosTotales = productosTotales.concat(products)
    }

    const productosCategorias =
      _.mapValues(
        _.groupBy(productosTotales, 'category'),
        el => el.map(el2 => _.omit(el2, 'category'))
      )

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      const productosNombre =
        _.mapValues(
          _.groupBy(products, 'name'),
          el => el.map(el2 => _.omit(el2, 'name'))
        )

      for (const [key2, infoProd] of Object.entries(productosNombre)) {
        let priceTotal = 0
        let quantityTotal = 0
        for (priceQty of infoProd) {
          priceTotal += priceQty.price
          quantityTotal += priceQty.quantity
        }
        productosNombre[key2] = { priceTotal, quantityTotal }
      }
      resp[key] = productosNombre
    }
    res.send(productosTotales)

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};