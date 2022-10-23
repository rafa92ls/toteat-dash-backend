const axios = require('axios')


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
    const { data, status} = await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')

    const datesH = data.filter(el => {
      return el.date_closed === '2019-03-18 15:40:47'
    })
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

exports.findOne = (req, res) => {
  const id = req.params.id;
};

exports.deleteAll = (req, res) => {
};