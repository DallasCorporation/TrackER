const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const dbo = require("../db/conn");
const billsModel = require('../models/billsModel');
const Building = require('../models/buildingModel');
const { aggregate } = require('../models/organizationModel');
const Organization = require('../models/organizationModel');

const addData = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  const exist = await billsModel.findOne({ buildingId: req.params.id })
  if (exist) {
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

const getBillsAggregatedFiltered = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("bills")
    .find({}).toArray(async function (err, result) {
      if (err) throw err;
      let data = {}
      const goal = await Building.find({ userId: ObjectId(req.params.id) })
      if (goal) {
        let orgIds = []
        const aggregated = {}
        let res = goal.map((el) => {
          orgIds.push({ id: el._id, organizationId: el.organizationId })
          return el._id.toString()
        })
        const res2 = result.filter(r => res.includes(r.buildingId.toString()))
        let electric = 0
        let gas = 0
        let water = 0
        await Promise.all(res2.map(async el => {
          let obj = orgIds.find(o => o.id.toString() === el.buildingId.toString());
          const goal2 = await Organization.findById((obj.organizationId))
          if (goal2)
            el.bills.map(bill => {
              if (aggregated.hasOwnProperty(bill.date)) {
                var existing = aggregated[bill.date];
                aggregated[bill.date] = {
                  date: existing.date,
                  ...(goal2.type.includes("Electric")) && { electric: parseFloat(existing.electric + bill.electric).toFixed(2) },
                  ...(goal2.type.includes("Gas")) && { gas: parseFloat(existing.gas + bill.gas).toFixed(2) },
                  ...(goal2.type.includes("Water")) && { water: parseFloat(existing.water + bill.water).toFixed(2) },
                }
              } else {
                aggregated[bill.date] = {
                  date: bill.date,
                  ...(goal2.type.includes("Electric")) && { electric: parseFloat(bill.electric).toFixed(2) },
                  ...(goal2.type.includes("Gas")) && { gas: parseFloat(bill.gas).toFixed(2) },
                  ...(goal2.type.includes("Water")) && { water: parseFloat(bill.water).toFixed(2) },
                };
              }
              electric += bill.electric
              gas += bill.gas
              water += bill.water
            })
        }))
        data = {
          totalElectric: parseFloat(electric.toFixed(2)),
          totalGas: parseFloat(gas.toFixed(2)),
          totalWater: parseFloat(water.toFixed(2)),
          aggregated,
          all: res2
        }
      }
      res.status(200).json(data)
    });
})

module.exports = {
  addData,
  getBills,
  getBillsAggregatedFiltered
}
