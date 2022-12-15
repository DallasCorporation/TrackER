import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { CardTitle } from "../../Components/CustomComponents";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
const RevenueCard = ({ bills = {} }) => {

    let options = {
        noData: {
            text: "You have no data...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
        colors: ["#ffcf45", "#19e396", "#008ffb"],
        chart: {
            type: 'radar',
            dropShadow: {
                enabled: true,
            },
            animations: {
                enabled: true,
            },
            toolbar: { show: false, },
        },
        stroke: {
            width: 1
        },
        fill: {
            opacity: 0.4
        }, yaxis: {
            show: false,
        },
    }

    const [electric, setElectric] = useState({})
    const [gas, setGas] = useState({})
    const [water, setWater] = useState({})
    useEffect(() => {
        if (Object.keys(bills).length === 0)
            return
        let date = null;
        let dataGas = []
        let dataWater = []
        let dataElectric = []
        let totElectric = 0
        let totGas = 0
        let totWater = 0
        let month
        Object.values(bills).map(el => {
            month = moment(el.date).format('DD MMM');
            if (moment(el.date).isSame(date, 'day')) {
                totElectric += Number(el.electric)
                totWater += Number(el.water)
                totGas += Number(el.gas)
            }
            else {
                dataElectric.push({ x: month, y: totElectric.toFixed(2) })
                dataGas.push({ x: month, y: totGas.toFixed(2) })
                dataWater.push({ x: month, y: totWater.toFixed(2) })
                date = el.date
                totElectric = 0
                totGas = 0
                totWater = 0
            }
        })
        setElectric({ name: "Electric", data: dataElectric })
        setWater({ name: "Water", data: dataWater })
        setGas({ name: "Gas", data: dataGas })
    }, [bills])

    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px",  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",}}>
            <Row justify="space-between" align="middle" >
                <CardTitle>Consumption Overview</CardTitle>
                <Col><span class="anticon iconfont" style={{ color: "blue" }} >&#x100e6;</span></Col>
            </Row>
            <Col span={24}>
                <Row justify="center">
                    {Object.keys(bills).length <= 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <ReactApexChart options={options} series={[electric, gas, water]} type="radar" height={390} />}
                </Row>
            </Col>
        </ProCard>
    )
};

export default RevenueCard