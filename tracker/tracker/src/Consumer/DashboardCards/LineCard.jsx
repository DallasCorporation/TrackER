import { Button, Col, DatePicker, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
const LineCard = ({ data }) => {

    const getData = () => {
        if (data === undefined || Object.keys(data).length === 0) return []
        let series = []
        let electric = []
        let gas = []
        let water = []

        Object.values(data.aggregated).map((el) => {
            electric.push({
                x: new Date(el.date).toUTCString(),
                y: el.electric.toFixed(2)
            })
            gas.push({
                x: new Date(el.date).toUTCString(),
                y: el.gas.toFixed(2)
            })
        })
        electric = {
            name: "Electric",
            data: electric
        }
        gas = {
            name: "Gas",
            data: gas
        }
        series = [
            electric,
            gas
        ]
        return series
    }

    let state = {
        series: getData(),
        options: {
            legend: {
                position: "top",
                horizontalAlign: "center",
                align: "right"
            },
            chart: {
                autoSelected: 'selection',
                animations: {
                    enabled: true,
                    easing: 'easein',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                },
                toolbar: { show: true, },

            },
            stroke: {
                curve: 'straight',
            },
            dataLabels: {
                enabled: false
            },

            xaxis: {
                type: 'datetime',
                tooltip: {
                    enabled: false
                }
            },
            tooltip: {
                enabled: true,
                followCursor: true,
                theme: "light",
                x: {
                    show: true,
                    format: "dd-MM-yyyy HH:mm"
                },
            }

        },
    };

    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <CardTitle>
                        Visit
                    </CardTitle>
                </Col>
                <Col>
                    <DatePicker placeholder="Choose" picker="month" locale={locale} />
                </Col>
            </Row>
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </ProCard>
    )
};

export default LineCard