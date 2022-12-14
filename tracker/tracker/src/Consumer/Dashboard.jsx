import { Col, Layout, Row, } from "antd";
import React, { useEffect } from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { statebar } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DowloadCard";
import SeismographCard from "./DashboardCards/SeismographCard"
import { useSelector } from "react-redux";
import api from "../api";
import { useState } from "react";
import moment from "moment"

const getData = (data) => {
  if (data === undefined) return []
  if (Object.keys(data).length === 0) return []
  let series = []
  let electric = []
  let gas = []
  let water = []
  Object.values(data.aggregated).forEach((el) => {
    electric.push({
      x: moment.utc(el.date).local().format(),
      y: el.electric === undefined ? null : el.electric
    })
    gas.push({
      x: moment.utc(el.date).local().format(),
      y: el.gas === undefined ? null : el.gas
    })
    water.push({
      x: moment.utc(el.date).local().format(),
      y: el.water === undefined ? null : el.water
    })
  })
  electric = {
    type: 'area',
    name: "Electric",
    data: electric
  }
  gas = {
    type: 'area',
    name: "Gas",
    data: gas
  }
  water = {
    type: 'area',
    name: "Water",
    data: water
  }
  series = [
    electric,
    gas,
    water,
  ]
  return series
}

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const buildings = useSelector((state) => state.buildings.buildings)
  const [bills, setBills] = useState({})
  const [gas, setGas] = useState({})
  const [water, setWater] = useState({})
  const [electric, setElectric] = useState({})
  const day = moment().subtract(31, 'days');
  const [solar, setSolar] = useState({})
  const [wind, setWind] = useState({})
  const [hydro, setHydro] = useState({})
  const [geo, setGeo] = useState({})
  const [totalRen, setTotalRen] = useState(0)


  const getBillsRenewable = async (id) => {
    await api.bills.getBillsRenewable(id).then(res => {
      let type = Object.values(buildings).filter(el => el._id === id)
      let sumSolar = 0
      let sumWind = 0
      let sumHydro = 0
      let sumGeo = 0
      type.forEach(el => el.resources.forEach(el => {
        switch (Object.keys(el)[0]) {
          case "Solar":
            sumSolar += res.totalSolar
            break;
          case "Hydro":
            sumHydro += res.totalHydro
            break;
          case "Wind":
            sumWind += res.totalWind
            break;
          case "Geo":
            sumGeo += res.totalGeo
            break;
          default:
            break
        }

      }))
      setSolar({ name: "Solar", data: [sumSolar] })
      setHydro({ name: "Hydro", data: [sumHydro] })
      setGeo({ name: "Geo", data: [sumGeo] })
      setWind({ name: "Wind", data: [sumWind] })
      setTotalRen(sumSolar + sumGeo + sumHydro + sumWind)
    })
  }

  const getBillsAggregated = async () => {
    await api.bills.getBillsAggregated(user._id).then(res => {
      setBills(res)
      let oldMoment = moment("01/01/17", "MM/D/YYYY")
      let billDates = Object.values(res.aggregated).filter(el => moment(el.date).isBetween(day, undefined))
      let water = []
      let gas = []
      let electric = []
      let sumGas = 0
      let sumWater = 0
      let sumElectric = 0
      billDates.forEach(el => {
        if (moment(el.date).isSame(oldMoment, "day")) {
          sumWater = +sumWater + +el.water
          sumElectric = +sumElectric + +el.electric
          sumGas = +sumGas + +el.gas
          oldMoment = el.date
        } else {
          water.push(Number(sumWater).toFixed(3))
          electric.push(Number(sumElectric).toFixed(3))
          gas.push(Number(sumGas).toFixed(3))
          sumWater = Number(el.water)
          sumElectric = Number(el.electric)
          sumGas = Number(el.gas)
          oldMoment = el.date
        }
      })
      electric.shift()
      gas.shift()
      water.shift()
      electric = electric.slice(-3)
      gas = gas.slice(-3)
      water = water.slice(-3)

      setWater({ name: "Water", data: water })
      setGas({ name: "Gas", data: gas })
      setElectric({ name: "Electric", data: electric })
    })
  }

  useEffect(() => {
    // if (buildings === null || buildings === undefined)
    //   return
    // let ids = Object.values(buildings).filter(el => el.resources.length !== 0).map(el => el._id)
    getBillsAggregated(user._id)
    // ids.forEach(id => getBillsRenewable(id))
  }, [user, buildings])

  return (
    <Layout
      style={{
        paddingRight: 24,
        paddingLeft: 24,
        minHeight: 280,
        marginTop: "32px"
      }}
    >
      <h1 style={{ fontSize: "24px", }}>Welcome back, {user.name} 👋</h1>
      <p style={{ color: "#636e72", fontSize: "14px", lineHeight: "21px" }}>Your current status and analytics are here</p>
      <Row gutter={[32, 32]}>
        <Col lg={18} md={24} sx={24}>
          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts for your bills" />
            <LineCard data={getData(bills)} />
          </Row>
          <Row justify="center" gutter={[32, 32]} style={{ marginTop: "32px" }}>
            <Col lg={8} md={8} sx={8} >
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar("Water", "#008ffb").options} series={[water]} type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} sx={8}>
              <StatsCard
                color={"#fff9e9"}
                chart={<ReactApexChart options={statebar("Electric", "#ffcf45").options} series={[electric]} type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} sx={8}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar("Gas", "#19e396").options} series={[gas]} type="bar" height={150} />}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard series={[solar, hydro, wind, geo]} total={(totalRen / 1000).toFixed(2)} />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <SeismographCard series={[solar, hydro, wind, geo]} total={(totalRen / 1000).toFixed(2)} />
          </Row>
        </Col>
        <Col lg={6} md={24} sx={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <ExpensiveChart bills={bills} />
            <DownloadCard />
            <RevenueCard bills={bills.aggregated} />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
