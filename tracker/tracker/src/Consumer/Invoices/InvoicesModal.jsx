import { Modal, Tabs } from "antd"
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ElectricInvoices from "./ElectricInvoices";
import GasInvoices from "./GasInvoices";
import WaterInvoices from "./WaterInvoices";
const { TabPane } = Tabs;

const InvoicesModal = ({ data, visible, setVisible, timespan, building }) => {
    let elec = []
    let gas = []
    let water = []
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
            elec = []
            gas = []
            water = []
        }
    }, [allOrganization, building])


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

    // if (Object.values(electricDetail).length !== 0 && Object.values(gasDetail).length !== 0 && Object.values(waterDetail).length !== 0 
    // && elec.length !== 0 && gas.length !== 0 && water.length !== 0) {
        return (
            <Modal visible={visible} width={1200} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
                <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
                    <TabPane tab="Electric" key="1">
                        <ElectricInvoices cost={electricDetail} filtered={elec}/>
                    </TabPane>
                    <TabPane tab="Gas" key="2">
                        <GasInvoices cost={gasDetail} filtered={gas}/>
                    </TabPane>
                    <TabPane tab="Water" key="3">
                        <WaterInvoices cost={waterDetail} filtered={water}/>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }

// }
export default InvoicesModal