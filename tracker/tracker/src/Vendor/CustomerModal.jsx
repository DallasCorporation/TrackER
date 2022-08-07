import { Button, Col, Drawer, Modal, Row, Skeleton, Space } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import api from "../api"
import "./skeleton.css"
import ProSkeleton from '@ant-design/pro-skeleton';
import CustomersBuildingTable from "./CustomersBuildingTable"
import { useSelector } from "react-redux"
import ModalDetails from "./ModalDetails"

const CustomerModal = ({ visible, user, setVisible }) => {

    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 10,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 300,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_, data) =>
                <a onClick={() => {
                    setVisible2(true)
                    setBuilding(data)
                }} key="1" >
                    See Details
                </a>
        },
    ];

    const [buildings, setBuildings] = useState([])
    const [load, setLoad] = useState(true)
    const [visible2, setVisible2] = useState(false)
    const [bills, setBills] = useState({})
    const [building, setBuilding] = useState({})
    const fetchData = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => {
            res.all.map(el => setBuildings((old) => [...old, allBuildings.find(ele => ele._id === el.buildingId)]))
            setBills(res.all)
            setTimeout(() => {
                setLoad(false)
            }, 500);
        })
    }

    useEffect(() => {
        setBuildings([])
        fetchData()
    }, [visible, user, building])




    return (
        <Modal style={{borderRadius:20}} destroyOnClose title={user.name + " " + user.surname + " Buildings Overview"} visible={visible} width={1000} onCancel={() => setVisible(false)} footer={<Button key="back" type="primary" onClick={() => setVisible(false)}>Ok</Button>}>
            {load ?
                <Col span={24} style={{ width: "100%" }}>
                    <Skeleton.Image active={true} style={{ width: "100%", height: 300 }} />
                    <br /><br />
                    <Skeleton.Input active style={{ width: "100%" }} />
                    <ProSkeleton type="descriptions" />
                </Col>
                :
                <Row>
                    <Col span={24}>
                        <CustomersBuildingTable headerTitle={"Building List"} data={buildings} columns={columns} />
                    </Col>
                </Row>
            }
            <ModalDetails visible={visible2} setVisible={setVisible2} width={900} building={building} bills={bills} />
        </Modal>
    )
}
export default CustomerModal