import { Modal, Tabs } from "antd"
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
const { TabPane } = Tabs;

const InvoicesModal = ({ data, visible, setVisible, timespan }) => {
    let elec = []
    let gas = []
    let water = []
    const [gasDetail, setGas] = useState({})
    const [waterDetail, setWater] = useState({})
    const [electricDetail, setElectric] = useState({})


    data.bills?.forEach(el => {
        const week = moment().subtract(7, 'days');
        const month = moment().subtract(1, 'months');
        const year = moment().subtract(1, 'years');
        switch (timespan) {
            case "Weekly":
                if (moment(el.date).isBetween(week, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            case "Monthly":
                if (moment(el.date).isBetween(month, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            case "Yearly":
                if (moment(el.date).isBetween(year, undefined, 'day')) {
                    elec.push([moment.utc(el.date).local().format(), el.electric])
                    gas.push([moment.utc(el.date).local().format(), el.gas])
                    water.push([moment.utc(el.date).local().format(), el.water])
                }
                break;
            default:

        }
    })

    return (
        <Modal destroyOnClose visible={visible} width={1200} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
                <TabPane tab="Electric" key="1">
                    <ElectricInvoices bills={data} cost={electricDetail} filtered={elec} />
                </TabPane>
                <TabPane tab="Gas" key="2">
                    <GasInvoices bills={data} cost={gasDetail} filtered={gas} />
                </TabPane>
                <TabPane tab="Water" key="3">
                    <WaterInvoices bills={data} cost={waterDetail} filtered={water} />
                </TabPane>
            </Tabs>
        </Modal>
    )
}
export default InvoicesModal