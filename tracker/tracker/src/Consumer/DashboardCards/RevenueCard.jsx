import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { CardTitle } from "../../Components/CustomComponents";
const RevenueCard = ({...props}) => {
    let state = {
        series: [{
            name: 'Consumption',
            data: [80, 50, 30, 40, 100, 20],
        }, {
            name: 'Production',
            data: [20, 30, 40, 80, 20, 80],
        },],
        options: {
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
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',]
            },

        },
    };


    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px",  }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <Row align="middle">
                        <CardTitle>
                            Revenue
                        </CardTitle>
                        <p style={{fontSize:"12px", color:"#636e72", marginLeft:"6px"}}> Last week</p>
                    </Row>
                </Col>
                <Col>
                    <p>
                        icon select
                    </p>
                </Col>
            </Row>
            <ReactApexChart options={state.options} series={state.series} type="radar" height={350} />
        </ProCard>
    )
};

export default RevenueCard