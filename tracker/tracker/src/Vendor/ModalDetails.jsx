import { Col, Modal, Row } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"
import MapboxMap from "../Consumer/Building/MapboxMap";


let options = {
    chart: {
        type: 'bar',
        height: 350,
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '90%',
            endingShape: 'rounded'
        },
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy"
        },
    },
}

let radialOption = {
    labels: ['Water Total Production', 'Gas Total Production', 'Electricity Total Production',],
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        align: "center"
    },
    chart: {
        type: 'donut',
    },
    dataLabels: {
        enabled: false
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                labels: {
                    show: true,
                }
            },
        },
        value: {
            show: true,
            formatter: function (val) { return val.toFixed(2) }
        },
    },
    yaxis: {
        labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (val) => { return val.toFixed(2) },

        },
    }
};

const ModalDetails = ({ visible = false, setVisible, building, bills, }) => {
    const [pieBills, setPieBills] = useState([{}])
    const [data, setData] = useState([])

    const fetchDataSecondModal = (buildingId) => {
        let water = []
        let gas = []
        let electric = []
        let oldMoment = moment('01/23/17', 'MM/D/YYYY')

        if (bills && Object.keys(bills).length === 0 && Object.getPrototypeOf(bills) === Object.prototype) { }
        else
            bills.map(res => {
                if (res.buildingId !== buildingId) return
                let sumWater = 0
                let sumElectric = 0
                let sumGas = 0
                let totalElectric = 0
                let totalGas = 0
                let totalWater = 0
                res.bills.map(el => {
                    totalElectric += el.electric
                    totalGas += el.gas
                    totalWater += el.water
                    if (moment(el.date).isSame(oldMoment, 'day')) {
                        sumWater += el.water
                        sumElectric += el.electric
                        sumGas += el.gas
                        oldMoment = el.date
                    } else {
                        water.push({ x: el.date, y: parseFloat(sumWater.toFixed(2)) })
                        electric.push({ x: el.date, y: parseFloat(sumElectric.toFixed(2)) })
                        gas.push({ x: el.date, y: parseFloat(sumGas.toFixed(2)) })
                        sumWater = el.water
                        sumElectric = el.electric
                        sumGas = el.gas
                        oldMoment = el.date
                    }
                })
                setPieBills([parseFloat(totalWater.toFixed(2)), parseFloat(totalGas.toFixed(2)), parseFloat(totalElectric.toFixed(2))])
                setData([{ name: "Water", data: water }, { name: "Gas", data: gas }, { name: "Electric", data: electric }])
            })
    }

    useEffect(() => {
        if (building === null || building === undefined)
            return
        fetchDataSecondModal(building._id)
    }, [building, bills])

    return (
        <Modal destroyOnClose visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)} width={900} title={building.name + " Consume Overview"}>
            <div>
                <Col span={24}>
                    <div style={{ height: 300 }}>
                        <MapboxMap lat={building.lat} lng={building.long} />
                    </div>
                    <Row style={{ marginTop: 22 }} gutter={[16, 16]} justify="space-between" align="middle">
                        <Col span={24}>
                            <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Name: <b>{building.address}</b></p>
                            <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Contact Name: <b>{building.contact}</b></p>
                            <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Type: <b>{building.type}</b></p>
                            <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Size: <b>{building.sqft} sqmt</b></p>
                            <p style={{ fontSize: "15px", fontWeight: 500 }}>Created At: <b>{new Date(building.date).toLocaleString()}</b></p>
                        </Col>
                        <Col span={24}>
                            <ReactApexChart options={options} series={data} type="bar" height={350} />
                        </Col>

                        <Col span={12}>
                            <ReactApexChart options={radialOption} series={pieBills} type="donut" />
                        </Col>

                    </Row>

                </Col>
            </div>
        </Modal>
    )
}
export default ModalDetails