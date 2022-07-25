import { Breadcrumb, Card, Col, Form, Input, InputNumber, Layout, Radio, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import EditCard from "./EditCard"

const EditPlan = () => {
    const organization = useSelector(state => state.organization.organization)
    const { gas, water, electric, resources } = organization.details
    return (
        <Layout
            style={{
                paddingRight: 24,
                paddingLeft: 24,
                minHeight: 280,
                marginTop: "32px"
            }}
        >
            <Row gutter={[16, 16]} >

                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Pages</Breadcrumb.Item>
                    <Breadcrumb.Item>Edit Organization Plan</Breadcrumb.Item>
                </Breadcrumb>
                <EditCard data={gas} type="g"/>
                <EditCard data={electric} type="e"/>
                <EditCard data={water} type="w"/>
                <EditCard data={resources} type="r"/>
            </Row>
        </Layout>
    )
}
export default EditPlan