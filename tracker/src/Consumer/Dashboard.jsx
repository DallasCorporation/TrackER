import { Card, Col, Layout, Row, Statistic } from "antd";
import React from "react";
import Chart from "./Chart";
import LineKpiChart from "./Charts/LineKpiChart";
import GlobalMap from "./GlobalMap";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function onFinish() {
  console.log('finished!');
}

function onChange(val) {
  if (4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
}

const Dashboard = () => {
  return (
    <Layout
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Card title" bordered={false} >
            <Row>
              <Col span={6}>
                <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
              </Col>
              <Col span={6}>
                <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
              </Col>
              <Col span={6}>
                <Countdown title="Day Level" value={deadline} />
              </Col>
              <Col span={6}>
                <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
              </Col>
            </Row>
            <GlobalMap style={{marginTop:"22px"}}/>
          </Card>
        </Col>
        <Col span={6}>
          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Card title" bordered={false} >
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
    </Layout>
  );
}
export default () => <Dashboard />
