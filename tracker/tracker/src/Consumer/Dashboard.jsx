import { Avatar, Col, Image, Layout, Row, } from "antd";
import React from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { statebar, stateradial } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import { ProCard } from "@ant-design/pro-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import TableCard from "./DashboardCards/TableCard";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DowloadCard";
import { useSelector } from "react-redux";

function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

const component = require.context('../assets/avatars/', false, /\.svg/)
const images = importAll(component);

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const buildings = useSelector((state) => state.buildings.buildings)
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
            <BannerCard name="Get exclusive discounts for any payment method" />
            <LineCard />
          </Row>
          <Row justify="center" gutter={[32, 32]} style={{ marginTop: "32px" }}>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"13,346"}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#fff9e9"}
                chart={<ReactApexChart options={stateradial('#ffcf26').options} series={stateradial('#ffcf26').series} type="radialBar" height={185} />}
                value={"17,346"}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"1,346"}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#fdeffc"}
                chart={<ReactApexChart options={stateradial("#fe9ca9").options} series={stateradial('#fe9ca9').series} type="radialBar" height={185} />}
                value={"2,345"}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "32px" }}>
            <ProCard bordered style={{
              borderRadius: "10px"
            }}>
              <Row justify="space-between" align="middle" >
                <Col span={12}>
                  <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Best Organization</h4>
                  <div>
                    <p>Highest income this month</p>
                    <p>$442.98 Highest income this month</p>
                  </div>
                </Col>
                <Col span={8} style={{marginRight:32}}>
                  <p>Name Organization Customers</p>
                  <Row justify="space-between" align="middle" gutter={[32,32]}>
                    <Avatar size={40} src={images['Avatar-1.svg']} />
                    <Avatar size={40} src={images['Avatar-2.svg']} />
                    <Avatar size={40} src={images['Avatar-3.svg']} />
                    <Avatar size={40} src={images['Avatar-4.svg']} />
                    <Avatar size={40} src={images['Avatar-5.svg']} />
                    <Avatar size={40} src={images['Avatar-6.svg']} />
                    <ArrowRightOutlined />
                  </Row>
                </Col>
              </Row>
            </ProCard>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <TableCard buildings={buildings}/>
          </Row>
        </Col>
        <Col lg={6} md={24} sx={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <ExpensiveChart />
            <DownloadCard />
            <RevenueCard />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
