const express = require('express');
const router = express.Router();

const { ChickenModel } = require('../models/chickenModel');
const ObjectID = require('mongoose').Types.ObjectId;


// Get the list of all chickens stocked in chicken_db
router.get('/', (req, res) => {
    ChickenModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
  });

// POST a new chicken to the chicken_db
router.post('/', (req, res) => {
    const newRecord = new ChickenModel ({
      name: req.body.name,
      birthday: req.body.birthday,
      weight: req.body.weight,
      steps: req.body.steps,
      isRunning: req.body.isRunning
    });
  
    newRecord.save((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error creating new data : ' + err);
    })
  });

  // UPDATE a new chicken to the chicken_db
  router.put("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknow : " + req.params.id)
    
    const updateRecord = {
      name: req.body.name,
      birthday: req.body.birthday,
      weight: req.body.weight,
      steps: req.body.steps,
      isRunning: req.body.isRunning
    };
  
    ChickenModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateRecord},
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    )
  });

  module.exports = router;