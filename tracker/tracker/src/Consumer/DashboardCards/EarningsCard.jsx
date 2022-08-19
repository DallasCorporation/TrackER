import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { stacked } from "../utils";
import { useEffect } from "react";
const EarningsCard = ({ series, total = 0 }) => {
  useEffect(() => {
  }, [series])

  return (
    <ProCard bordered style={{
      borderRadius: "10px"
    }}>
      <Row align="middle" justify="space-between">
        <Col lg={4} md={4} xs={24}>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Renewable Production</h4>
          <div>
            <b style={{ fontSize: 22 }}>{total} kW</b>
          </div>
        </Col>
        <Col lg={20} md={20} xs={24} >
          <ReactApexChart options={stacked.options} series={series} type="bar" height={150} />
        </Col>
      </Row>
    </ProCard>
  )
};

export default EarningsCard

