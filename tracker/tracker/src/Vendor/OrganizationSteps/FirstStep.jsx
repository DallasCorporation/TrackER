import { Card, Checkbox, Col, Divider, InputNumber, Row, Slider, Tooltip } from "antd"
import OrganizationCard from "../Organization/OrganizationCard"
import "../Organization/Organization.css"
import { useState } from "react"
import { ProForm, ProFormDigit, ProFormMoney, ProFormSlider, ProFormText } from '@ant-design/pro-components';
import { useEffect } from "react";

const FirstStep = ({ gas, setGas, electric, setElectric, water, setWater, distributed, setDistributed, setPrices, prices = [] }) => {

    const [solar, setSolar] = useState(false)
    const [hydro, setHydro] = useState(false)
    const [windy, setWindy] = useState(false)
    const [bio, setBio] = useState(false)
    const [geo, setGeo] = useState(false)
    const [pricesTmp, setPricesTmp] = useState(prices)
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)

    useEffect(() => {
        setPricesTmp(prices)
        let present = false
        let updatedList = pricesTmp.map(item => {
            if (item.name === name) {
                present = true
                return { ...item, price: value };
            }
            return item;
        });
        if (!present)
            setPrices((old) => [...old, { name: name, price: value }])
        else
            setPrices(updatedList);
    }, [name, prices, value])


    const setObj = (name, value) => {
        setName(name)
        setValue(value)
    }

    return (
        <div>
            <Row gutter={[48, 48]} style={{ marginTop: "42px" }} justify="center">
                <Col span={6}>
                    <div onClick={() => setGas(!gas)}>
                        <OrganizationCard title={"Gas Supplier"} description={"If your organization is providing natural gas to cities, region or country"} selected={gas} />
                    </div>
                    <Divider />
                    <div style={!gas ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <Row justify="space-between" gutter={[32, 8]}>
                                <Col span={12}>
                                    <ProFormMoney colSize={12} label="Cost at m³" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Gas Cost at m³", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney label="Supplier Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Supplier Gas Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney label="Delivery Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Gas Delivery Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormDigit label="Tax Percentage" locale="it-IT" placeholder={"% 0"} min={0} max={99} onChange={(value) => setObj("Gas Tax Percentage", value)} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={6} >
                    <div onClick={() => setElectric(!electric)}>
                        <OrganizationCard title={"Electric Supplier"} description={"If your organization is is providing electricity to cities, region or country"} selected={electric} />
                    </div>
                    <Divider />
                    <div style={!electric ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <Row justify="space-evenly" gutter={[32, 8]}>
                                <Col span={12}>
                                    <ProFormMoney fieldProps={{ precision: 2 }} label="Cost at kWh" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Electricity Cost at m³", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney fieldProps={{ precision: 2 }} label="Supplier Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Electricity Supplier Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney fieldProps={{ precision: 2 }} label="Delivery Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Electricity Delivery Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney label="Tax Percentage" customSymbol="%" placeholder={"% 0"} min={0} max={99} onChange={(value) => setObj("Electricity Tax Percentage", value)} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <div onClick={() => setWater(!water)}>
                        <OrganizationCard title={"Water Supplier"} description={"If your organization is providing water to cities, region or country"} selected={water} />
                    </div>
                    <Divider />
                    <div style={!water ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <Row justify="space-between" gutter={[32, 8]}>
                                <Col span={12}>
                                    <ProFormMoney colSize={12} label="Cost at m³" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Water Cost at m³", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney label="Supplier Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Water Supplier Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormMoney label="Delivery Cost" locale="it-IT" placeholder={"€ 0"} min={0} onChange={(value) => setObj("Water Delivery Cost", value)} />
                                </Col>
                                <Col span={12}>
                                    <ProFormDigit label="Tax Percentage" locale="it-IT" placeholder={"% 0"} min={0} max={99} onChange={(value) => setObj("Water Tax Percentage", value)} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <div onClick={() => setDistributed(!distributed)}>
                        <OrganizationCard title={"Energy Resources"}
                            description={"If your organization is selling energy resources like Solar energy, Wind energy or Hydro energy"}
                            selected={distributed} />
                    </div>
                    <Divider />
                    <div style={!distributed ? { pointerEvents: "none", opacity: "0.4", transition: "1.5s" } : { transition: "1.5s" }}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p style={{ fontSize: "16px", fontWeight: 500 }}>Cool title on devices:</p>
                            <Row justify="space-evenly" style={{ marginTop: "32px" }}>
                                <Col span={8} style={{ height: "90px" }} onClick={() => {
                                    setObj("Solar", !solar)
                                    setSolar(!solar)
                                }}>
                                    <Tooltip title="Solar Energy" color="#2db7f5">
                                        <span className={solar ? "anticon iconfontMediumSelected" : "anticon iconfontMedium"} style={{ color: solar ? "#1196db" : "black", }}>&#xe65f;</span>
                                    </Tooltip>
                                </Col>
                                <Col span={8} style={{ height: "90px" }} onClick={() => {
                                    setObj("Hydro", !hydro)
                                    setHydro(!hydro)
                                }}>
                                    <Tooltip title="Hydro Energy" color="#2db7f5">
                                        <span className={hydro ? "anticon iconfontMediumSelected" : "anticon iconfontMedium"} style={{ color: hydro ? "#1196db" : "black", }}>&#xe650;</span>
                                    </Tooltip>
                                </Col>
                                <Col span={8} style={{ height: "90px" }} onClick={() => {
                                    setObj("Wind", !hydro)
                                    setWindy(!windy)
                                }}>
                                    <Tooltip title="Windy Energy" color="#2db7f5">
                                        <span className={windy ? "anticon iconfontMediumSelected" : "anticon iconfontMedium"} style={{ color: windy ? "#1196db" : "black", }}>&#xe661;</span>
                                    </Tooltip>
                                </Col>
                                <Col span={8} style={{ height: "90px" }} onClick={() => { 
                                    setObj("Bio", !bio)
                                    setBio(!bio) }}>
                                    <Tooltip title="Biomass Energy" color="#2db7f5">
                                        <span className={bio ? "anticon iconfontMediumSelected" : "anticon iconfontMedium"} style={{ color: bio ? "#1196db" : "black", }}>&#xe645;</span>
                                    </Tooltip>
                                </Col>
                                <Col span={8} style={{ height: "90px" }} onClick={() => { 
                                    setObj("Geo", !geo)
                                    setGeo(!geo) }}>
                                    <Tooltip title="Geothermic Energy" color="#2db7f5">
                                        <span className={geo ? "anticon iconfontMediumSelected" : "anticon iconfontMedium"} style={{ color: geo ? "#1196db" : "black", }}>&#xe64b;</span>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div >
    )

}
export default FirstStep