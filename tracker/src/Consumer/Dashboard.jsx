import { DesktopOutlined, EditOutlined, EyeOutlined, MoreOutlined, } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Card, Col, DatePicker, Dropdown, Layout, Menu, Row, } from "antd";
import { Button } from "antd/lib/radio";
import React from "react";
import styled from "styled-components";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { statebar, statebar1, statedonut, stateradial, stateradial1 } from "./utils";


const menu = (
  <Menu style={{ borderRadius: "10px", }}

    items={[
      {
        key: '1',
        label: (
          <p>View Balance Details</p>
        ),
        icon: <EditOutlined style={{ verticalAlign: "baseline", display: "inline" }} />,
        style: { height: "35px", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }
      },
      {
        type: "divider"
      },
      {
        key: '2',
        label: (
          <p>View Account Details</p>
        ),
        icon: <EyeOutlined />,
        style: { height: "35px", alignItems: "center", justifyContent: "center", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }

      },

    ]}
  />
);


let placeholder = []
for (let a = 0; a < 4; a++)
  placeholder.push(
    <Col span={6}>
      <Card style={{ borderRadius: "20px", boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.25)", }}>
        <Row justify="space-between">
          <DesktopOutlined style={{ fontSize: 32, }} />
          <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ borderRadius: "20px", boxShadow: "0px 1px 18px 1px rgba(0,0,0,0.25)" }}>
            <MoreOutlined style={{ fontSize: 18 }} />
          </Dropdown>
        </Row>
        <Row style={{ marginTop: 10 }} justify="space-between">
          <p style={{ fontWeight: "300", fontSize: "22px", fontFamily: "" }}>KPI Name</p>
          <p style={{ fontWeight: "500", fontSize: "22px", fontFamily: "" }}>1212 €</p>
        </Row>
      </Card>
    </Col>)


const Dashboard = () => {

  return (
    <Layout
      style={{
        paddingRight: 24,
        paddingLeft: 24,
        minHeight: 280,
      }}
    >
      <h1 style={{ fontSize: "24px", }}>Welcome back, Edward 👋</h1>
      <p style={{ color: "#636e72", fontFamily: "Manrope,sanserif" }}>template p</p>
      <Row gutter={[32, 32]}>
        <Col span={16}>
          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts for any payment method" />
            <LineCard />
          </Row>
          <Row justify="center" gutter={[32, 0]} style={{marginTop:"32px"}}>

            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"13,346"}
              />
            </Col>

            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={stateradial.options} series={stateradial.series} type="radialBar" height={185} />}
                value={"17,346"}
              />
            </Col>

            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"1,346"}
              />
            </Col>

            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={stateradial.options} series={stateradial.series} type="radialBar" height={185} />}
                value={"2,345"}
              />
            </Col>


          </Row>
        </Col>
        <Col span={8}>
          <ProCard colSpan={12} bordered title="Get exclusive discounts for any payment method" extra="extra" tooltip="tooltip" >
            <div>by upgrading your plan to premium</div>
          </ProCard>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
