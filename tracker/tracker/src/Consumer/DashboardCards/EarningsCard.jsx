import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";

let options = {
  chart: {
    height: 350,
    type: 'heatmap',
  },
  dataLabels: {
    enabled: false
  },
 
  
  colors: ["#ffcf26"],
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
        <Col lg={6} md={6} xs={24}>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Renewable Production</h4>
          <div>
            <b style={{ fontSize: 22 }}>{total} kW</b>
          </div>
        </Col>
        <Col lg={18} md={18} xs={24} >
          {
            total <= 0 ?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              :
              <ReactApexChart options={options} series={series} type="heatmap" height={350} />
            // <ReactApexChart options={linear('Consumed Gas', "m³", "#00cbc8").options} series={val} type="area" height={150} />
          }
        </Col>
      </Row>
    </ProCard>
  )
};

export default EarningsCard

