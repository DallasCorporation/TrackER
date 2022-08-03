import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import locale from 'antd/es/date-picker/locale/it_IT'
import { Breadcrumb, Col, Layout, Row } from 'antd';
import api from '../../api';


const columns = [
    {
        dataIndex: 'index',
        valueType: 'index',
        key: 'index',
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
        title: 'Surname',
        dataIndex: 'surname',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        valueType: 'select',
    },
    {
        title: 'Building',
        dataIndex: 'building',
    },
];

const Customers = ({ organization }) => {
    const [data, setData] = useState([])
    const customers = organization.customers

    useEffect(() => {
        setData([])
        const getAllUser = async () => {
            setData([])
            await customers.map(async el => await api.user.get(el.user).then(async res => {
                await api.preference.fetchPreference(el.user).then((async res2 => {
                    await api.buildings.getBuilding(el.building).then((res3 => {
                        setData((old) => [...old, { buildingId: res3._id, name: res.name, surname: res.surname, avatar: res2.avatar, building: res3.name }])
                    }))
                }))
            }))
        }
        getAllUser()
    }, [])


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
                    <ProTable
                        columns={columns} dataSource={data}
                        cardBordered
                        cardProps={{ style: { borderRadius: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" } }}
                        options={{
                            search: true,
                        }}
                        rowKey="key"

                        locale={locale}
                        search={false} dateFormatter="string" headerTitle="Organization Customers List" />
                </Col>
            </Row>
        </Layout>
    );
}
export default Customers
