import { Col, Modal } from "antd"
import StatsCard from "../DashboardCards/StatsCard"
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const InvoicesModal = ({ data, visible, setVisible, timespan }) => {
    const elec = []
    const gas = []
    const water = []

    data.bills?.forEach(el => {
        let tmp = moment(el.date)
        const week = moment().subtract(7, 'days');
        const month = moment().subtract(1, 'months');
        const year = moment().subtract(1, 'years');

        switch (timespan) {
            case "Weekly":
                if (tmp.isBetween(week, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            case "Monthly":
                if (tmp.isBetween(month, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            case "Yearly":
                if (tmp.isBetween(year, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            default:

        }

    })


    const series = [{ name: "Electric", data: elec }, { name: "Gas", data: gas }, { name: "Water", data: water }]
    const options = {
        legend: {
            position: "top",
            horizontalAlign: "center",
            align: "right"
        },
        chart: {
            id: 'area-datetime',
            type: 'area',
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
            curve: 'smooth',
            width: 2,
            lineCap: 'butt',
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

    }

    return (
        <Modal visible={visible} width={1000} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Col span={24}>
                <StatsCard
                    chart={<ReactApexChart options={options} series={series} type="line" />}
                />
            </Col>
        </Modal>
    )
}
export default InvoicesModal