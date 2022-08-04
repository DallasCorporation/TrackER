import { Breadcrumb, Card, Col, Form, Input, InputNumber, Layout, PageHeader, Radio, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import EditCard from "./EditCard"

const EditPlan = () => {
    const organization = useSelector(state => state.organization.organization)
    const { gas, water, electric, resources } = organization.details
    let navigate= useNavigate()
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
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organization Plans"
                subTitle="Check and Edit your plans (changes will be available after a month to notify customers)"
                onBack={() => navigate("/Dashboard")}
            />
            <EditCard data={gas} type="g" />
            <EditCard data={electric} type="e" />
            <EditCard data={water} type="w" />
            <EditCard data={resources} type="r" />
        </Layout>
    )
}
export default EditPlan