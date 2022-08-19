import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { stacked } from "../utils";
const EarningsCard = ({...props}) => {
    return (
        <ProCard bordered style={{
            borderRadius: "10px"
          }}>
            <Row align="middle" justify="space-between">
              <Col lg={4} md={4} xs={24}>
                <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Earnings</h4>
                <div>
                  <p>This month</p>
                  <p>$6.340.42</p>
                </div>
              </Col>
              <Col lg={20} md={20} xs={24} >
                <ReactApexChart options={stacked.options} series={stacked.series} type="bar" height={125} />
              </Col>
            </Row>
          </ProCard>
    )
};

export default EarningsCard

