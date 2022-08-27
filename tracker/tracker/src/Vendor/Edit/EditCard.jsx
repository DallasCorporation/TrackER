import { Button, Card, Col, InputNumber, message, Popover, Row, Tooltip } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api"
import { PlanParagraph, PlanTitle } from "../../Components/CustomComponents"
import LoadingSpinner from "../../Components/LoadingSpinner"
import { fetchOrganization } from "../../reducers/organization"

const EditCard = ({ data, type }) => {
    const [edit, setEdit] = useState(true)
    const [load, setLoad] = useState(false)
    const organization = useSelector(state => state.organization.organization)
    const [price, setPrices] = useState(organization.details)
    const dispatch = useDispatch()

    const editPrice = (value, name, type) => {
        if (type === "g") {
            const newObj = price.gas.map(obj =>
                obj.name === name
                    ? { ...obj, price: value }
                    : obj
            )
            setPrices({ ...price, gas: newObj })
        }

        if (type === "e") {
            const newObj = price.electric.map(obj =>
                obj.name === name
                    ? { ...obj, price: value }
                    : obj
            )
            setPrices({ ...price, electric: newObj })
        }


        if (type === "w") {
            const newObj = price.water.map(obj =>
                obj.name === name
                    ? { ...obj, price: value }
                    : obj
            )
            setPrices({ ...price, water: newObj })
        }


        if (type === "r") {
            const newObj = price.resources.map(obj =>
                obj.name === name
                    ? { ...obj, price: value }
                    : obj
            )
            setPrices({ ...price, resources: newObj })
        }
    }

    const editPlan = () => {
        if (!edit) {
            let data = { ...organization, details: price }
            setLoad(true)
            api.organization.update(organization._id, data).then((res) => {
                dispatch(fetchOrganization(res))
                setTimeout(() => {
                    setLoad(false)
                    message.success("Organization Plan Updated")
                }, 3000);
            }
            ).catch(e => message.success("Error on Update"))
        }
        setEdit(!edit)
    }

    return (
        data.length > 0 &&
        <Col span={24} style={{ marginTop: 22 }}>
            {load && <LoadingSpinner message="Updating Organization" />}
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} gutter={[0, 8]}>
                <Row align="middle" justify="space-between">
                    {type === "g" && <PlanTitle>Organization Gas Plan</PlanTitle>}
                    {type === "e" && <PlanTitle>Organization Energy Plan</PlanTitle>}
                    {type === "w" && <PlanTitle>Organization Water Plan</PlanTitle>}
                    {/* {type === "r" && <PlanTitle>Organization Energy Resources Plan</PlanTitle>} */}
                    <Tooltip title="Edit your Plan">
                        <div>
                            <span class="anticon iconfont" style={{ cursor: "pointer" }} >&#x100e9;</span>
                        </div>
                    </Tooltip>
                </Row>
                <Row justify="space-between" align="middle" gutter={[64, 64]} style={{ marginTop: 32 }}>
                    <Col md={3} xs={24} sm={24} style={{ textAlign: "center" }}>
                        {type === "g" && <span class="anticon iconfontLarge" style={{ color: "#19e396" }} >&#xe657;</span>}
                        {type === "e" && <span class="anticon iconfontLarge" style={{ color: "#ffd901" }}>&#xe61d;</span>}
                        {type === "w" && <span class="anticon iconfontLarge" style={{ color: "#1984f5" }} >&#xe730;</span>}
                        {/* {type === "r" && <span class="anticon iconfontLarge" >&#xe927;</span>} */}
                    </Col>
                    <Col md={21} xs={24} sm={24}>
                        <Row gutter={[16, 32]}>
                            {data.map(el =>
                                <Col md={12} sm={24} xs={24}>
                                    <Row justify="space-between" align="middle">
                                        <Col md={10} xs={12} sm={12}>
                                            <PlanParagraph>{el.name}</PlanParagraph>
                                        </Col>
                                        <Col md={14} xs={12} sm={12}>
                                            <InputNumber onChange={(value) => editPrice(value, el.name, type)} disabled={edit} min={0} placeholder={el.price} addonAfter={el.name.includes("Percentage") ? "%" : "€"} />
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row align="middle" justify="center" style={{ marginTop: 32 }}>
                    <Button type="primary" size="large" style={{ borderRadius: 10 }} onClick={() => editPlan()}>{!edit ? "Confirm Plan" : "Edit Plan"}</Button>
                </Row>
            </Card>
        </Col>
    )
}

export default EditCard