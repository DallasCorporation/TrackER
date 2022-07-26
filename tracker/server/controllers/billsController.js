const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const dbo = require("../db/conn");
const billsModel = require('../models/billsModel');

const addData = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  const exist = await billsModel.findOne({ buildingId: req.params.id })
  if (exist) {
    console.log(exist)
    billsModel.updateOne(
      { "buildingId": req.params.id },
      {
        "$push": {
          "bills": {
            electric: req.body.electric,
            gas: req.body.gas,
            water: req.body.water,
            resources: req.body.resources,
            date: req.body.date
          }
        }
      }
      , function (err, count) {
        console.log('Updated ' + count + ' document');
      })
  }
  else {
    const bills = await billsModel.create({
      buildingId: ObjectId(req.params.id),
      bills: [
        {
          electric: req.body.electric,
          gas: req.body.gas,
          water: req.body.water,
          resources: req.body.resources,
          date: req.body.date
        }
      ]
    })
    if (bills) {
      res.status(201).json({
        bills
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

const getBills = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
      .collection("bills")
      .find({}).toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
      });
})

module.exports = {
  addData,
  getBills
}
