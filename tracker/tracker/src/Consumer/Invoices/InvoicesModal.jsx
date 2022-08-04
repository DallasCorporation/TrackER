import { Col, Modal } from "antd"
import StatsCard from "../DashboardCards/StatsCard"
import { invoices } from "../utils"
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const InvoicesModal = ({ data, visible, setVisible, timespan }) => {
    return (
        <Modal visible={visible} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Col span={24}>
                <StatsCard
                    chart={<ReactApexChart options={invoices.options} series={invoices.series} type="line" />}
                />

                {
                    data.bills.forEach(el => {
                        let text = String(moment.utc(el.date)._d)
                        console.log(text.split(" "))
                    })
                };

            </Col>
        </Modal>
    )
}
export default InvoicesModal