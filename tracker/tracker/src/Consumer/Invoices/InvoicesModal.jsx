import { Modal, Tabs } from "antd"
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
const { TabPane } = Tabs;

const InvoicesModal = ({ data, visible, setVisible, timespan, building }) => {
    const elec = []
    const gas = []
    const water = []
    const allOrganization = useSelector((state) => state.allOrganization.organization)
    const [gasDetail, setGas] = useState({})
    const [waterDetail, setWater] = useState({})
    const [electricDetail, setElectric] = useState({})

    useEffect(() => {
        let organizationDetail = Object.values(allOrganization).find(el => el._id === building.organizationId)
        if (organizationDetail !== undefined) {
            setGas(organizationDetail.details.gas)
            setWater(organizationDetail.details.water)
            setElectric(organizationDetail.details.electric)
        }

    }, [allOrganization, building])


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

    console.log(data, electricDetail)

    if (Object.values(electricDetail).length !== 0 && Object.values(gasDetail).length !== 0 && Object.values(waterDetail).length !== 0) {
        return (
            <Modal visible={visible} width={1200} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Electric" key="1">
                        <ElectricInvoices bills={data}></ElectricInvoices>
                    </TabPane>
                    <TabPane tab="Gas" key="2">
                        <GasInvoices bills={data} cost={gasDetail}></GasInvoices>
                    </TabPane>
                    <TabPane tab="Water" key="3">
                        <WaterInvoices bills={data} cost={waterDetail}></WaterInvoices>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }

}
export default InvoicesModal