import { Col, Layout, Row, } from "antd";
import React, { useEffect } from "react";
import BannerCard from "./DashboardCards/BannerCard";
import LineCard from "./DashboardCards/LineCard";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DowloadCard";
import SeismographCard from "./DashboardCards/SeismographCard"
import { useSelector } from "react-redux";
import api from "../api";
import { useState } from "react";
import moment from "moment"
import TemperatureCard from "./DashboardCards/TemperatureCard";
import { isMobile } from "react-device-detect";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const buildings = useSelector((state) => state.buildings.buildings)
  const [bills, setBills] = useState({})
  const [solar, setSolar] = useState({})
  const [quake, setQuake] = useState({})
  const [totalRen, setTotalRen] = useState(0)
  const [solarArrayData, setSolarArrayData] = useState([])

  const getData = (data) => {
    if (data === undefined) return []
    if (Object.keys(data).length === 0) return []
    let series = []
    let electric = []
    let gas = []
    let water = []
    Object.values(data.bills).forEach((el) => {
      electric.push({
        x: moment.utc(el.date).local().format(),
        y: el.electric === undefined ? 0 : el.electric
      })
      gas.push({
        x: moment.utc(el.date).local().format(),
        y: el.gas === undefined ? 0 : el.gas
      })
      water.push({
        x: moment.utc(el.date).local().format(),
        y: el.water === undefined ? 0 : el.water
      })
    })
    electric = {
      type: 'area',
      name: "Electric in w/s",
      data: electric
    }
    gas = {
      type: 'area',
      name: "Gas in m³/s",
      data: gas
    }
    water = {
      type: 'area',
      name: "Water in ml/s",
      data: water
    }
    series = [
      electric,
      gas,
      water,
    ]
    return series
  }

  const getBills = async () => {
    await api.bills.fetchBills().then(res => {
      let totalElectric = 0
      let totalGas = 0
      let totalWater = 0
      let sumSolar = 0
      res.bills.map(bill => sumSolar += bill.solar)
      setTotalRen(sumSolar)
      setSolar({ name: "Solar", data: [sumSolar] })
      setSolarArrayData(res.bills.map(el => ({ x: el.date, y: el.solar })))
      res.bills.map(el => {
        totalElectric += Number(el.electric)
        totalGas += Number(el.gas)
        totalWater += Number(el.water)
      })
      setBills({ ...res, totalElectric, totalGas, totalWater })
    })
  }

  const getQuake = async () => {
    await api.quake.get().then(res => { setQuake(res.intensity.map(el => ({ x: el.date, y: el.value }))) })
  }

  useEffect(() => {
    getBills()
    getQuake()
    setInterval(() => {
      getBills()
      getQuake()
    }, 5000);
  }, [user, buildings])

  return (
    <Layout
      style={isMobile ? {} : {
        paddingRight: 24,
        paddingLeft: 24,
        minHeight: 280,
        marginTop: "32px"
      }}
    >
      <Row gutter={[32, 32]}>
        <Col lg={18} md={24} sx={24}>
          <h1 style={{ fontSize: "24px", }}>Welcome back, {user.name} 👋</h1>
          <p style={{ color: "#636e72", fontSize: "14px", lineHeight: "21px" }}>Your current status and analytics are here</p>

          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts for your bills" />
            <LineCard data={getData(bills)} />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard series={[solar]} total={(totalRen / 1000).toFixed(3)} data={solarArrayData} />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <SeismographCard/>
          </Row>
        </Col>
        <Col lg={6} md={24} sx={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <TemperatureCard />
            <ExpensiveChart bills={bills} />
            <DownloadCard />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
