// const db = require("../models");
// const Tutorial = db.tutorials;
// const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    return res.send([{data: "OK!"}]);
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    res.send([1,2,3,4,5,6]);
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while removing all tutorials."
    //     });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  };