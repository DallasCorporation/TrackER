import { Modal, Tabs } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
import api from "../../api";
const { TabPane } = Tabs;

const InvoicesModal = ({ data, visible, setVisible, timespan }) => {
    let elec = []
    let gas = []
    let water = []
    const [gasDetail, setGas] = useState({})
    const [waterDetail, setWater] = useState({})
    const [electricDetail, setElectric] = useState({})

    const fetchDetailedConsumptions = async () => {
        await api.organization.fetchCost().then((res) => {
            setElectric(res.details.electric)
            setWater(res.details.water)
            setGas(res.details.gas)
        })
    }

    useEffect(() => {
        fetchDetailedConsumptions()
    }, [data])

    function isDateInThisWeek(date) {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    function isDateInThisMonth(date) {
        const todayObj = new Date();
        return todayObj.getMonth() === date.getMonth()
    }
    function isDateInThisYear(date) {
        const todayObj = new Date();
        return todayObj.getFullYear() === date.getFullYear()
    }


    data.bills?.forEach(el => {

        let date = new Date(el.date)
        switch (timespan) {
            case "Weekly":
                if (isDateInThisWeek(new Date(el.date))) {
                    elec.push([moment.utc(date).local().format(), el.electric])
                    gas.push([moment.utc(date).local().format(), el.gas])
                    water.push([moment.utc(date).local().format(), el.water])
                }
                break;
            case "Monthly":
                if (isDateInThisMonth(new Date(el.date))) {
                    elec.push([moment.utc(date).local().format(), el.electric])
                    gas.push([moment.utc(date).local().format(), el.gas])
                    water.push([moment.utc(date).local().format(), el.water])
                }
                break;
            case "Yearly":
                if (isDateInThisYear(new Date(el.date))) {
                    elec.push([moment.utc(date).local().format(), el.electric])
                    gas.push([moment.utc(date).local().format(), el.gas])
                    water.push([moment.utc(date).local().format(), el.water])
                }
                break;
            default:
                break
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