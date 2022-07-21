import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';
import locale from 'antd/es/date-picker/locale/it_IT'
import { Breadcrumb, Col, Layout, Row } from 'antd';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Name',
        dataIndex: 'status',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            close: { text: '关闭', status: 'Default' },
            running: { text: '运行中', status: 'Processing' },
            online: { text: '已上线', status: 'Success' },
            error: { text: '异常', status: 'Error' },
        },
    },
    {
        title: 'Building',
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
    },
    {
        title: 'Contract Type',
        key: 'since2',
        dataIndex: 'createdAt',
        valueType: 'date',
        hideInSetting: true,
    },
];

const Customers = ({ organization }) => {
    const [columnsStateMap, setColumnsStateMap] = useState({
        name: {
            show: false,
            order: 2,
        },
    });

    const customers = organization.customers
    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Pages</Breadcrumb.Item>
                    <Breadcrumb.Item>Customers</Breadcrumb.Item>
                </Breadcrumb>
                <Col span={24} style={{ borderRadius: 20 }}>
                    <ProTable columns={columns} dataSource={customers}
                        cardBordered
                        cardProps={{style :{ borderRadius: "20px",  boxShadow: "0 2px 2px rgba(0,0,0,0.2)" }}}
                        options={{
                            search: true,
                        }}
                        rowKey="key"
                        columnsState={{
                            value: columnsStateMap,
                            onChange: setColumnsStateMap,
                        }}
                        locale={locale}
                        search={false} dateFormatter="string" headerTitle="Organization Customers List" />
                </Col>
            </Row>
        </Layout>
    );
}
export default Customers
