import { ArrowRightOutlined } from "@ant-design/icons"
import { Avatar, Col, Row, Skeleton, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import api from "../../api"
import { AvatarHover } from "../../Components/CustomComponents";
import TweenOne from "rc-tween-one"
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';



const UsersCard = ({ openModal }) => {
    const navigate = useNavigate()
    const organization = useSelector((state) => state.organization.organization)
    const allUser = useSelector((state) => state.allUser.user)
    const [users, setUsers] = useState([])
    const [bills, setBills] = useState([])
    const [avatars, setAvatars] = useState([])
    const [loading, setLoading] = useState(true)
    const [invoices, setInvoices] = useState(0)


    const getUserBills = async (id) => {
        await api.bills.getBillsAggregated(id).then(res => {
            let total = 0
            let water = 0
            let gas = 0
            let electric = 0
            if (organization.type.includes("Electric")) {
                organization.details.electric.forEach(el => {
                    if (el.name === "Electricity Cost at kWh")
                        electric += res.totalElectric * 0.0833333 / 1000 * el.price
                    if (el.name === "Electricity Supplier Cost" || el.name === "Electricity Delivery Cost")
                        electric += el.price
                    if (el.name === "Electricity Tax Percentage")
                        electric += (res.totalElectric * el.price / 100)
                });
            }
            if (organization.type.includes("Gas")) {
                organization.details.gas.forEach(el => {
                    if (el.name === "Gas Cost at m³")
                        gas += res.totalGas * 0.0454249414 / 1000 * el.price
                    if (el.name === "Supplier Gas Cost" || el.name === "Gas Delivery Cost")
                        gas += el.price
                    if (el.name === "Gas Tax Percentage")
                        gas += (res.totalGas * el.price / 100)
                });
            }
            if (organization.type.includes("Water")) {
                organization.details.water.forEach(el => {
                    if (el.name === "Water Cost at m³")
                        water += res.totalWater * 0.0001666667 * el.price
                    if (el.name === "Water Supplier Cost" || el.name === "Water Delivery Cost")
                        water += el.price
                    if (el.name === "Water Tax Percentage")
                        water += (res.totalWater * el.price / 100)
                });
            }
            total = gas + water + electric
            setInvoices(res.invoicesDays)
            setBills((bills) => [...bills, { value: Number(total).toFixed(2), id: id }])
        })
    }

    const getUserAvatar = async (id) => {
        await api.preference.getAvatar(id).then(res => setAvatars((avatars) => [...avatars, { id: id, avatar: res }]))
    }

    useEffect(() => {
        let tmp = users
        if (organization === null)
            return
        organization.customers.forEach(async element => {
            let res = allUser.find(el => el._id === element.user)
            if (!tmp.includes(res) && res !== undefined) {
                tmp.push(res)
                await Promise.all([
                    getUserBills(element.user),
                    getUserAvatar(element.user)
                ]).then(() => setLoading(false))
            }
        });
        setUsers(tmp.slice(0, 4))
    }, [organization, allUser, users])


    return (

        <Row justify="space-between" style={{ marginTop: 32 }} align="middle">
            {users.length === 0 ? <div></div> :
                users.map((el, index) =>

                    <Col span={5} style={{ textAlign: "center" }} key={index} onClick={() => openModal(el)}>
                        {loading ? <Skeleton active /> :
                            <Row>
                                <Col span={24}>
                                    <AvatarHover src={Object.values(avatars).find(ele => ele.id === el._id)?.avatar} size={120} shape="square" />
                                </Col>
                                <Col span={24}>
                                    <p style={{ fontWeight: "lighter", color: "blue", margin: 5 }}>{el.name} {el.surname}</p>
                                    <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>{bills.length > 0 ? Object.values(bills).find(ele => ele.id === el._id)?.value : 0}€</p>
                                    <p>{invoices} Invoices Days</p>
                                </Col>
                            </Row>
                        }
                    </Col>
                )}
            {users.length !== 0 &&
                <Col span={1} onClick={() => navigate("/Customers")}>
                    <TweenOne
                        animation={{
                            x: 0,
                            yoyo: true,
                            repeat: -1,
                            duration: 1000
                        }}
                        style={{ transform: 'translateX(-20px)' }}
                    >
                        <Tooltip title="See all">
                            <ArrowRightOutlined style={{ fontSize: 30, color:"blue" }} />
                        </Tooltip>
                    </TweenOne>
                </Col>}
        </Row>
    )
}
export default UsersCard