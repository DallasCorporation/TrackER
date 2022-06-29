import { AutoComplete, Avatar, Card, Col, Input, Layout, List, PageHeader, Row, Select } from "antd";
import React from "react";
import styled from "styled-components";


const Kpi = styled.p`
font-size:22px
`

const { Option } = Select;
const { Search } = Input;


const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
];
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
];

const BuildingTab = () => {
    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            <PageHeader
                className="site-page-header"
                title="Buildings Portfolio"
                subTitle="Browse and check your buildings"
            />
            <Card>
                <Row style={{ width: "100%" }}>
                    <Input.Group compact>
                        <Select
                            defaultValue="Address"
                            style={{ width: "35%" }}
                        >
                            <Option value="Address">Address</Option>
                            <Option value="Building">Building</Option>
                        </Select>
                        <AutoComplete
                            style={{ width: "65%" }}
                            filterOption={(inputValue, option) =>
                                option.props.children
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            dataSource={options}
                            defaultActiveFirstOption={false}
                        >
                            <Search
                                placeholder={
                                    "Search by Name"
                                }
                            />
                        </AutoComplete>
                    </Input.Group>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <Card></Card>

                    )}
                />
            </Card>
        </Layout>
    );
}
export default () => <BuildingTab />
