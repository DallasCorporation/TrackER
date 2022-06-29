import { Button, Col, DatePicker, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
const StatsCard = ({ chart, value, title }) => (

    <ProCard bordered style={{ borderRadius: "10px" }}>
        <Row justify="space-between" align="middle" >
            <Col>
                <Row align="middle" justify="center">
                    {chart}
                </Row>
                <div align="center">
                    <h3>{value}</h3>
                    <p>{title}</p>
                </div>
            </Col>
        </Row>
    </ProCard>
);

export default StatsCard