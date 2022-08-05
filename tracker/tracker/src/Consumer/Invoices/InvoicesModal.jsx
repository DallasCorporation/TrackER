import { Col, Modal } from "antd"
import StatsCard from "../DashboardCards/StatsCard"
import { invoices } from "../utils"
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const InvoicesModal = ({ data, visible, setVisible, timespan }) => {
    const elec = []
    const gas = []
    const water = []
    
    const series = [{name:"Electric", data:elec}, {name:"Gas", data:gas}, {name:"Water", data:water}]
    return (
        <Modal visible={visible} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Col span={24}>
                {
                    data.bills?.forEach(el => {
                        let tmp = moment(el.date)
                        const week = moment().subtract(7, 'days');
                        const month = moment().subtract(1, 'months');
                        const year = moment().subtract(1, 'years');

                        switch (timespan) {
                            case "Weekly":
                                if (tmp.isBetween(week, undefined, 'day')) {
                                    elec.push(el.electric)
                                    gas.push(el.gas)
                                    water.push(el.water)
                                }
                                break;
                            case "Monthly":
                                if (tmp.isBetween(month, undefined, 'day')) {
                                    elec.push(el.electric)
                                    gas.push(el.gas)
                                    water.push(el.water)
                                }
                                break;
                            case "Yearly":
                                if (tmp.isBetween(year, undefined, 'day')) {
                                    elec.push(el.electric)
                                    gas.push(el.gas)
                                    water.push(el.water)
                                }
                                break;
                            default:
                           
                        }

                    })
                };
                <StatsCard
                    chart={<ReactApexChart options={invoices.options} series={series} type="line" />}
                />
            </Col>
        </Modal>
    )
}
export default InvoicesModal