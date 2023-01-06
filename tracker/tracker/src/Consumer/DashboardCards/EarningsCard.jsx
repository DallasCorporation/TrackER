import { Col, Row, Empty, Statistic } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { IconFont } from "../utils";

let options = {
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 2,
  },
  xaxis: {
    labels: {
      format: 'dd-MM-yyyy HH:mm',
    },
    type: 'datetime',
  },
  tooltip: {
    enabled: true,
    followCursor: true,
    theme: "light",
    x: {
      show: true,
      format: "dd-MM-yyyy HH:mm"
    },
  },
  colors: ["#19e396"],
}
const EarningsCard = ({ total = 0, data }) => {

  const [series, setSeries] = useState([])
  useEffect(() => {
    if (data !== undefined) {
      setSeries([{
        name: 'Energy production',
        data: data
      }])
    }
  }, [data])


  return (
    <ProCard bordered style={{
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}>
      <Row align="middle" justify="space-between">
        <Col>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Renewable Production</h4>
        </Col>
        <Col>
          <IconFont type="i-solar-panels" color="#1196db" style={{ fontSize: 40, color: "#1196db" }} />
        </Col>
      </Row>
      <Row justify="start" align="middle">
        <Col span={12}>
          <Statistic value={total} title={"Total Power generated"} suffix="kW" precision={2} />
        </Col>
        <Col span={12}>
          <Statistic value={total / 3600} title={"Total Energy generated"} suffix="kWh" precision={2} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} >
          {
            total <= 0 ?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              :
              <ReactApexChart options={options} series={series} type="area" height={350} />
          }
        </Col>
      </Row>
    </ProCard>
  )
};

export default EarningsCard

