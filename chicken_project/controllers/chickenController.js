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

  // DELETE a chicken from the chicken_db
  router.delete("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknow : " + req.params.id)
    
    ChickenModel.findByIdAndRemove(
      req.params.id,
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      })
  });

  // PATCH
  router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updatePost = await  ChickenModel.findByIdAndUpdate(_id, req.body);
        res.send(updatePost);
    } catch (error) {
        res.status(400).send(updatePost);
    }
  })


  // /chicken/run increment the variable steps
  router.get("/run", (req, res) => {

    ChickenModel.find(  (err, chikens) => {
      if (!err) {
        var newChikens = [];
        chikens.forEach(
           async function(chicken){
            const updateRecord = {
              name: chicken.name,
              birthday: chicken.birthday,
              weight: chicken.weight,
              steps: chicken.steps +1,
              isRunning: chicken.isRunning
            };
            newChikens.push(updateRecord)
           try {
            await ChickenModel.findByIdAndUpdate(
              chicken.id,
              { $set: updateRecord},
              { new: true },
              (err, docs) => {
                if (err) 
                  console.log("Update error : ");
              }
            ); 
            
           } catch (warning) {
           }
           
          });
          res.send(newChikens)
      }
      else console.log("Error to get data : ");
      });
  });

  module.exports = router;