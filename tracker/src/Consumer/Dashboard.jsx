import { ArrowDownOutlined, ArrowUpOutlined, DesktopOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Statistic } from "antd";
import React from "react";
import styled from "styled-components";
import Chart from "./Chart";
import LineKpiChart from "./Charts/LineKpiChart";
import LiquidChart from "./Charts/LiquidChart";
import RingKpi from "./Charts/RingKpi";
import GlobalMap from "./GlobalMap";
import MapKpi from "./Kpi/MapKpi";

let placeholder = []
for (let a = 0; a < 4; a++)
  placeholder.push(
    <Col span={6}>
      <Card style={{ borderRadius: "20px", boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.25)", height: "auto" }}>
        <Row justify="space-between">
          <DesktopOutlined style={{ fontSize: 32, }} />
          <DesktopOutlined style={{ fontSize: 32, }} />
        </Row>
        <Row style={{ marginTop: 10 }}>
          <p style={{ fontWeight: "500", fontSize: "22px", fontFamily: "" }}>1212 €</p>
        </Row>
      </Card>
    </Col>)


const Dashboard = () => {
  return (
    <Layout
      style={{
        padding: 24,
        minHeight: 280,
      }}
    >
      {/* <Row justify="space-between" gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Global Load Profile" bordered={false} >
            <MapKpi />
            <GlobalMap />
          </Card>
        </Col>
        <Col span={6}>
          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Card title" bordered={false}  >
                <LineKpiChart />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Efficiency" bordered={false} >
                <Chart />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[32, 16]} style={{ marginTop: 16 }}>
        <Col span={10}>
          <Card title="Card title" bordered={false} >
            <Row justify="space-between" gutter={[16, 16]}>

              <RingKpi color="#fab12b" value={0.7} label="Energy" />
              <RingKpi color="#67e0d1" value={0.9} label="Water" />
              <RingKpi color="#3fc563" value={0.1} label="Gas" />
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="Efficiency" bordered={false} >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Gas Consumption last week"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Electrics consumption"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="Water Consumption" bordered={false}  >
            <LiquidChart />
          </Card>
        </Col>
      </Row> */}
      <div>

        <p>Welcome back NAME </p>
        <Row gutter={[32, 32]}>
          {placeholder.map((e) => e)}
        </Row>
        <Row style={{ marginTop: "32px" }} justify="space-between" gutter={[32,32]}>
          <Col span={8}>
            <Card style={{ borderRadius: "20px", boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.25)", height: "auto" }}>
              <Row justify="space-between">
                <DesktopOutlined style={{ fontSize: 32, }} />
                <DesktopOutlined style={{ fontSize: 32, }} />
              </Row>
              <Row style={{ marginTop: 10 }}>
                <p style={{ fontWeight: "500", fontSize: "22px", fontFamily: "" }}>1212 €</p>
              </Row>
            </Card>
            <Card style={{ marginTop: "22px", borderRadius: "20px", boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.25)", height: "auto" }}>
              <Row justify="space-between">
                <DesktopOutlined style={{ fontSize: 32, }} />
                <DesktopOutlined style={{ fontSize: 32, }} />
              </Row>
              <Row style={{ marginTop: 10 }}>
                <p style={{ fontWeight: "500", fontSize: "22px", fontFamily: "" }}>1212 €</p>
              </Row>
            </Card>
          </Col>
          <Col span={16} flex>
          <Card bordered={false}  style={{borderRadius: "20px"}}>
                <LineKpiChart />
              </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
export default () => <Dashboard />
