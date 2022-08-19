import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { CardTitle } from "../../Components/CustomComponents";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
const RevenueCard = ({ bills = {} }) => {
    let series = [{
        name: 'Consumption',
        data: [80, 50, 30, 40, 100, 20],
    }, {
        name: 'Production',
        data: [20, 30, 40, 80, 20, 80],
    },]

    let options = {
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
                enabled: true,
            },
            animations: {
                enabled: true,
            }
        },
        stroke: {
            width: 1
        },
        fill: {
            opacity: 0.8
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
            month = moment(el.date).format('dd');
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
            }
        })
        dataElectric.push({ x: month, y: totElectric.toFixed(2) })
        dataGas.push({ x: month, y: totGas.toFixed(2) })
        dataWater.push({ x: month, y: totWater.toFixed(2) })
        setElectric({ name: "Electric", data: dataElectric })
        setWater({ name: "Water", data: dataWater })
        setGas({ name: "Gas", data: dataGas })
    }, [bills])


    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px", }}>
            <Row justify="space-between" align="middle" >
                <CardTitle>Consumption Overview</CardTitle>
                <Col><span class="anticon iconfont" style={{ color: "blue" }} >&#x100e6;</span></Col>
            </Row>
            <Col span={24}>
                <ReactApexChart options={options} series={[electric, gas, water]} type="radar" height={350} />
            </Col>
        </ProCard>
    )
};

export default RevenueCard