const axios = require('axios')
const _ = require('lodash')
const dataJson = require('../ventas.json')

exports.categorias = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }
    let productosTotales = []
    for (const inputs of data) {
      productosTotales = productosTotales.concat(inputs.products)
    }

    const productosCategorias = agruparDatos(productosTotales, 'category')

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      const productosNombre = agruparDatos(products, 'name')

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

exports.categoriasPorFecha = async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.fecha1)
    const fechaFinal = new Date(req.params.fecha2)

    if (!fechaInicio.getDate() || !fechaFinal.getDate()) {
      return res.status(400).send({
        message: 'Error en las fechas ingresadas'
      });
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      return res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    let productosTotales = []
    for (const inputs of data) {
      const products = []
      for (const prodDetail of inputs.products) {
        const fechaProd = new Date(inputs.date_closed.split(' ')[0])
        if (fechaInicio <= fechaProd && fechaFinal >= fechaProd) {
          prodDetail.fecha = inputs.date_closed.split(' ')[0]
          products.push(prodDetail)
        }
      }
      productosTotales = productosTotales.concat(products)
    }

    const productosCategorias = agruparDatos(productosTotales, 'category')

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      const productosNombre = agruparDatos(products, 'name')

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
}

exports.zonas = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    const productosZonas = agruparDatos(data, 'zone')

    let productosTotales = {}
    for (const [key, zones] of Object.entries(productosZonas)) {
      let prodZona = []
      for (const zone of zones) {
        prodZona = prodZona.concat(zone.products)
      }

      const productosCategorias = agruparDatos(prodZona, 'category')

      const resp = {}
      for (const [key, products] of Object.entries(productosCategorias)) {
        const productosNombre = agruparDatos(products, 'name')

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
      productosTotales[key] = resp
    }

    res.send(productosTotales)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error
    });
  }
}

exports.zonasPorFecha = async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.fecha1)
    const fechaFinal = new Date(req.params.fecha2)

    if (!fechaInicio.getDate() || !fechaFinal.getDate()) {
      return res.status(400).send({
        message: 'Error en las fechas ingresadas'
      });
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    const productosZonas = agruparDatos(data, 'zone')

    let productosTotales = {}
    for (const [key, zones] of Object.entries(productosZonas)) {

      let prodZona = []
      for (const zone of zones) {
        const products = []
        for (const prod of zone.products) {
          const fechaProd = new Date(zone.date_closed.split(' ')[0])
          if (fechaInicio <= fechaProd && fechaFinal >= fechaProd) {
            prod.fecha = zone.date_closed.split(' ')[0]
            products.push(prod)
          }
        }
        prodZona = prodZona.concat(products)
      }

      const productosCategorias = agruparDatos(prodZona, 'category')

      const resp = {}
      for (const [key, products] of Object.entries(productosCategorias)) {
        const productosNombre = agruparDatos(products, 'name')

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
      productosTotales[key] = resp
    }

    res.send(productosTotales)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error
    });
  }
}

exports.meseros = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    const productosZonas = agruparDatos(data, 'waiter')

    let productosTotales = {}
    for (const [key, zones] of Object.entries(productosZonas)) {
      let prodZona = []
      for (const zone of zones) {
        prodZona = prodZona.concat(zone.products)
      }

      const productosCategorias = agruparDatos(prodZona, 'category')

      const resp = {}
      for (const [key, products] of Object.entries(productosCategorias)) {
        const productosNombre = agruparDatos(products, 'name')

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
      productosTotales[key] = resp
    }

    res.send(productosTotales)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error
    });
  }
}

exports.cajeros = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    const productosZonas = agruparDatos(data, 'cashier')

    let productosTotales = {}
    for (const [key, zones] of Object.entries(productosZonas)) {
      let prodZona = []
      for (const zone of zones) {
        prodZona = prodZona.concat(zone.products)
      }

      const productosCategorias = agruparDatos(prodZona, 'category')

      const resp = {}
      for (const [key, products] of Object.entries(productosCategorias)) {
        const productosNombre = agruparDatos(products, 'name')

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
      productosTotales[key] = resp
    }

    res.send(productosTotales)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error
    });
  }
};

exports.mediosPago = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }


    let productosTotales = []
    let totalTest = 0
    for (const inputs of data) {
      totalTest += inputs.total
      productosTotales = productosTotales.concat(inputs.payments)
    }

    const productosCategorias = agruparDatos(productosTotales, 'type')

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {

      let amountTotal = 0
      for (const payment of products) {
        amountTotal += payment.amount
      }

      resp[key] = amountTotal
    }
    res.send(resp)

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

exports.productos = async (req, res) => {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }
    let productosTotales = []
    for (const inputs of data) {
      productosTotales = productosTotales.concat(inputs.products)
    }

    const productosCategorias = agruparDatos(productosTotales, 'name')

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      let amountTotal = 0
      let quantityTotal = 0
      for (const payment of products) {
        amountTotal += payment.price
        quantityTotal += payment.quantity
      }
      resp[key] = { amountTotal, quantityTotal }
    }
    res.send(resp)

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
}

exports.productosPorFecha = async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.fecha1)
    const fechaFinal = new Date(req.params.fecha2)

    if (!fechaInicio.getDate() || !fechaFinal.getDate()) {
      return res.status(400).send({
        message: 'Error en las fechas ingresadas'
      });
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      return res.status(500).send({
        message: 'Error en el Servidor'
      });
    }

    let productosTotales = []
    for (const inputs of data) {
      const products = []
      for (const prodDetail of inputs.products) {
        const fechaProd = new Date(inputs.date_closed.split(' ')[0])
        if (fechaInicio <= fechaProd && fechaFinal >= fechaProd) {
          prodDetail.fecha = inputs.date_closed.split(' ')[0]
          products.push(prodDetail)
        }
      }
      productosTotales = productosTotales.concat(products)
    }

    const productosCategorias = agruparDatos(productosTotales, 'name')

    const resp = {}
    for (const [key, products] of Object.entries(productosCategorias)) {
      let amountTotal = 0
      let quantityTotal = 0
      for (const payment of products) {
        amountTotal += payment.price
        quantityTotal += payment.quantity
      }
      resp[key] = { amountTotal, quantityTotal }
    }
    res.send(resp)

  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
}

exports.ventaPorId = async (req, res) => {
  try {
    const {
      id,
      mesero,
      cajero,
      fecha,
      mesa,
      zona
    } = req.query;

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000)
    const { data, status } = {data: dataJson, status: 200} //await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    if (status !== 200) {
      res.status(500).send({
        message: 'Error en el Servidor'
      });
    }
    var resp = data
    if(id)
      resp = _.filter(resp, el => el.id.includes(id))
    if(mesero)
      resp = _.filter(resp, el => el.waiter.includes(mesero))
    if(cajero)
      resp = _.filter(resp, el => el.cashier.includes(cajero))
    if(fecha)
      resp = _.filter(resp, el => el.date_closed.includes(fecha))
    if(mesa)
      resp = _.filter(resp, el => el.table == mesa)
    if(zona)
      resp = _.filter(resp, el => el.zone == zona)
    res.send(resp)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error
    });
  }
}

const agruparDatos = (datos, campo) => {
  try {
    const result =
      _.mapValues(
        _.groupBy(datos, campo),
        el => el.map(el2 => _.omit(el2, campo)
        )
      )
    return result
  } catch (error) {
    return []
  }
}