const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const dbo = require("../db/conn");
const billsModel = require('../models/billsModel');
const Building = require('../models/buildingModel');

const addData = asyncHandler(async (req, res) => {
  const exist = await billsModel.findOne({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })
  let date = new Date().toLocaleString('it-IT')
  if (exist) {
    billsModel.findOneAndUpdate(
      { "buildingId": ObjectId("62ed1f97d158cb42b69e5356") },
      {
        "$push": {
          "bills": {
            electric: req.body.electric,
            gas: req.body.gas,
            water: req.body.water,
            solar: req.body.solar,
            date
          }
        }
      }, { new: true }).then(result => {
        if (result) {
          res.status(201).json({
            result
          })
        } else {
          res.status(400)
          throw new Error('Invalid user data')
        }
      })
  }
  else {
    const bills = await billsModel.create({
      buildingId: ObjectId("62ed1f97d158cb42b69e5356"),
      bills: [
        {
          electric: req.body.electric,
          gas: req.body.gas,
          water: req.body.water,
          solar: req.body.solar,
          date
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

const getBuildingBills = asyncHandler(async (req, res) => {
  const goal = await billsModel.findOne({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })

  if (!goal) {
    res.status(400).json([])
    throw new Error('Bill Not found')
  }
  res.json(goal);
})

const getBillsAggregatedFiltered = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  let days = 0

  db_connect
    .collection("bills")
    .find({}).toArray(async function (err, result) {
      if (err) throw err;
      let data = {}
      if (req.params.id === "undefined") return res.status(400).json(data);

      const goal = await Building.find({ userId: ObjectId(req.params.id) })
      let electric = 0
      let gas = 0
      let water = 0
      let allDay = []
      if (goal) {
        let orgIds = []
        const aggregated = {}
        let res = goal.map((el) => {
          orgIds.push({ id: el._id, organizationId: el.organizationId })
          return el._id.toString()
        })
        const res2 = result.filter(r => res.includes(r.buildingId.toString()))
        // await Promise.all(res2.map(async el => {
        //   let obj = orgIds.find(o => o.id.toString() === el.buildingId.toString());
        //   const goal2 = await Organization.findById((obj.organizationId))
        //   if (goal2)
        //     el.bills.map(bill => {
        //       if (hasCountedDay(allDay, bill.date))
        //         days++
        //       if (aggregated.hasOwnProperty(bill.date)) {
        //         let existing = aggregated[bill.date];
        //         aggregated[bill.date] = {
        //           date: existing.date,
        //           ...(goal2.type.includes("Electric")) && { electric: parseFloat(existing.electric + bill.electric).toFixed(2) },
        //           ...(goal2.type.includes("Gas")) && { gas: parseFloat(existing.gas + bill.gas).toFixed(2) },
        //           ...(goal2.type.includes("Water")) && { water: parseFloat(isNaN(existing.water) ? 0 + bill.water : existing.water + bill.water).toFixed(2) },
        //         }
        //       } else {
        //         aggregated[bill.date] = {
        //           date: bill.date,
        //           ...(goal2.type.includes("Electric")) && { electric: parseFloat(bill.electric).toFixed(2) },
        //           ...(goal2.type.includes("Gas")) && { gas: parseFloat(bill.gas).toFixed(2) },
        //           ...(goal2.type.includes("Water")) && { water: isNaN(bill.water) ? 0 : parseFloat(bill.water).toFixed(2) },
        //         };
        //       }
        //       electric += goal2.type.includes("Electric") ? bill.electric : 0
        //       gas += goal2.type.includes("Gas") ? bill.gas : 0
        //       water += goal2.type.includes("Water") ? bill.water : 0
        //     })
        // }))
        data = {
          totalElectric: parseFloat(electric.toFixed(2)),
          totalGas: parseFloat(gas.toFixed(2)),
          totalWater: parseFloat(water.toFixed(2)),
          aggregated,
          all: res2,
          invoicesDays: days
        }
      }
      res.status(200).json(data)
    });
})


const getBillsByOrganizationId = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("bills")
    .find({ organizationId: ObjectId(req.params.id) }).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})


const getBillsRenewableOnly = asyncHandler(async (req, res) => {
  const bills = await billsModel.findOne({ buildingId: (req.params.id) })
  let totalSolar = 0, totalWind = 0, totalGeo = 0, totalHydro = 0
  if (!bills) {
    res.status(400).json({ renewable: [], totalSolar: 0, totalWind: 0, totalGeo: 0, totalHydro: 0 })
    throw new Error('Bills not found')
  }

  let renewable = Object.values(bills.bills).map(el => {
    if (el.resources.length > 0) {
      el.resources.map(ele => {
        totalSolar += Object.keys(ele).includes("Solar") ? parseFloat(Object.values(ele)) : 0
        totalGeo += Object.keys(ele).includes("Geo") ? parseFloat(Object.values(ele)) : 0
        totalWind += Object.keys(ele).includes("Wind") ? parseFloat(Object.values(ele)) : 0
        totalHydro += Object.keys(ele).includes("Hydro") ? parseFloat(Object.values(ele)) : 0
      })
      return { date: el.date, resources: el.resources }
    }
  }).filter(el => el !== undefined)

  totalSolar = Number(totalSolar.toFixed(2))
  totalWind = Number(totalWind.toFixed(2))
  totalGeo = Number(totalGeo.toFixed(2))
  totalHydro = Number(totalHydro.toFixed(2))

  res.status(200).json({ renewable, totalSolar, totalWind, totalGeo, totalHydro })
})

module.exports = {
  addData,
  getBills,
  getBillsAggregatedFiltered,
  getBillsByOrganizationId,
  getBuildingBills,
  getBillsRenewableOnly
}
