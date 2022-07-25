const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const dbo = require("../db/conn");
const billsModel = require('../models/billsModel');

const addData = asyncHandler(async (req, res) => {
    const bills = await billsModel.create({
        buildingId: ObjectId(req.params.id),
        electric: req.body.electric,
        gas: req.body.gas,
        water: req.body.water,
        resources: req.body.resources,
      })
    
      if (bills) {
        res.status(201).json({
            bills
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

module.exports = {
    addData
}
