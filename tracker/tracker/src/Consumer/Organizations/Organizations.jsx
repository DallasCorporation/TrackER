import { Breadcrumb, Layout, Row, Button, Progress, Space, Tag, Col, Slider, Avatar, Tooltip, Badge, PageHeader } from "antd"
import { ProList } from '@ant-design/pro-components';
import { useState } from 'react';
import TypeCard from "./TypeCard";
import { useNavigate } from "react-router-dom";
const Organizations = ({ allOrganization, allUser }) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const navigate= useNavigate()
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
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organizations"
                subTitle="Check all registered organization of our platform"
                onBack={() => navigate("/Dashboard")}
            />
            <Row style={{ marginTop: 12 }}>
                <Col span={24}>
                    <ProList rowKey="title" headerTitle="Registered Organization"
                        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    if (expandedRowKeys.includes(rowIndex))
                                        setExpandedRowKeys([])
                                    else
                                        setExpandedRowKeys([rowIndex])
                                }, // click row
                                onDoubleClick: event => { }, // double click row
                                onContextMenu: event => { }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }}
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
                                    const { electric, water, gas, resources } = data.details
                                    let owner = allUser.find(el =>
                                        el._id === data.userId
                                    )
                                    return (
                                        <Col span={24} style={{ marginBottom: 32 }}>
                                            <Row gutter={[64, 64]} justify="center" align="middle">
                                                <Tooltip placement="bottom" title={data.name + " Logo"}>
                                                    <Avatar size={240} src={data.icon} style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)" }} />
                                                </Tooltip>
                                                <Col span={14} style={{ marginLeft: 22 }}>
                                                    <p style={{ fontSize: 17 }}>Owner: {owner.name + " " + owner.surname} </p>
                                                    <Row>
                                                        <p style={{ fontSize: 17 }}>Created at: {new Date(data.createAt).toLocaleDateString()}</p>
                                                        <p style={{ fontSize: 17, marginLeft: 32 }}>Total Customers: {data.customers.length}</p>
                                                    </Row>
                                                    <Slider value={data.customers.length} marks={{ 0: 'Small', 25: 'Medium', 70: 'Large', }} />
                                                </Col>
                                                {electric.length > 0 &&
                                                    <Col span={12}>
                                                        <TypeCard title="Electric Plan" data={electric} />
                                                    </Col>
                                                }

                                                {gas.length > 0 &&
                                                    <Col span={12}>
                                                        <TypeCard title="Gas Plan" data={gas} />
                                                    </Col>
                                                }
                                                {water.length > 0 &&
                                                    <Col span={12}>
                                                        <TypeCard title="Water Plan" data={water} />
                                                    </Col>
                                                }
                                                {resources.length > 0 &&
                                                    <Col span={12}>
                                                        <TypeCard title="Energy Resources Cost" data={water} />
                                                    </Col>
                                                }
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