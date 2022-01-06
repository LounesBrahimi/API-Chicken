const express = require('express');
const router = express.Router();

const { ChickenModel } = require('../models/chickenModel');


// Get the list of all chickens stocked in chicken_db
router.get('/', (req, res) => {
    ChickenModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
  });

  module.exports = router;