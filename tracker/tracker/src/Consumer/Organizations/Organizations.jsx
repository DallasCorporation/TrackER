import { Breadcrumb, Layout, Row, Button, Progress, Space, Tag, Col, Slider, Avatar } from "antd"
import { ProList } from '@ant-design/pro-components';
import { useState } from 'react';
import { AntDesignOutlined } from "@ant-design/icons";
const Organizations = ({ allOrganization }) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            {/* {show && <LoadingSpinner message={"Deleting..."}></LoadingSpinner>} */}
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Organizations</Breadcrumb.Item>
                </Breadcrumb>
            </Row>

            <Row style={{ marginTop: 32 }}>
                <Col span={24}>
                    <ProList rowKey="title" headerTitle="Registered Organization"
                        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                        dataSource={allOrganization}
                        itemLayout="vertical"
                        size="large"
                        split
                        metas={{
                            title: {
                                render: (_, data) => (
                                    <Row align="middle">
                                        <Col style={{ width: 220 }}>
                                            {data.name}
                                        </Col>
                                        <Col >
                                            <Space size={0}>
                                                {data.type.includes("Electric") && <Tag icon={<span class="anticon iconfontTag" >&#xe61d;</span>} color="gold">Electric</Tag>}
                                                {data.type.includes("Gas") && <Tag icon={<span class="anticon iconfontTag" >&#xe657;</span>} color="#5B90F6">Gas</Tag>}
                                                {data.type.includes("Water") && <Tag icon={<span class="anticon iconfontTag" >&#xe730;</span>} color="blue">Water</Tag>}
                                                {data.type.includes("Distributed") && <Tag icon={<span class="anticon iconfontTag" >&#xe927;</span>} color="green">Energy Resources</Tag>}
                                            </Space>
                                        </Col>
                                    </Row>
                                ),
                            },
                            subTitle: {
                                dataIndex: 'description'
                            },


                            content: {
                                render: (_, data) => {
                                    const {energy, water, gas, resources}= data.details
                                    return (
                                        <Col span={24} >
                                            <Row gutter={[64, 64]} justify="center" align="middle">
                                                <Avatar size={240} src={data.icon} />
                                                <Col span={14} style={{ marginLeft: 22 }}>
                                                    <Row>
                                                        <p style={{ fontSize: 17 }}>Created at: {new Date(data.createAt).toLocaleDateString()}</p>
                                                        <p style={{ fontSize: 17, marginLeft: 32 }}>Total Customers: {data.customers.length}</p>
                                                    </Row>
                                                    <Slider value={data.customers.length} marks={{ 0: 'Small', 25: 'Medium', 70: 'Large', }} />
                                                </Col>
                                                {gas &&
                                                <Col span={12}>
                                                    <Progress percent={80} />
                                                </Col>
                                                }

                                                <Col span={12}>
                                                    <div>Customers: {data.customers.length}</div>
                                                    <Progress percent={80} />
                                                </Col>


                                                <Col span={12}>
                                                    <div>Customers: {data.customers.length}</div>
                                                    <Progress percent={80} />
                                                </Col>

                                                <Col span={12}>
                                                    <div>Customers: {data.customers.length}</div>
                                                    <Progress percent={80} />
                                                </Col>
                                            </Row>
                                        </Col>)
                                }
                            },
                        }} />
                </Col>
            </Row>
        </Layout>
    )
}
export default Organizations