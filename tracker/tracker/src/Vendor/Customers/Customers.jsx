import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import locale from 'antd/es/date-picker/locale/it_IT'
import { Breadcrumb, Col, Layout, PageHeader, Row } from 'antd';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import CustomerModal from '../CutomerModal';
import LoadingSpinner from '../../Components/LoadingSpinner';

const Customers = ({ organization }) => {
    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 20,
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
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_, data) =>
                <a onClick={() => {
                    setVisible(true)
                    setBuildingId(data.buildingId)
                }} key="1" >
                    See Details
                </a>
        },
    ];
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [load, setLoad] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const customers = organization.customers

    useEffect(() => {
        setData([])
        const getAllUser = async () => {
            setData([])
            await customers.map(async el =>
                await api.user.get(el.user).then(async res => {
                    await api.preference.fetchPreference(el.user).then((async res2 => {
                        await api.buildings.getBuilding(el.building).then((res3 => {
                            setData((old) => [...old, { buildingId: res3._id, name: res.name, surname: res.surname, avatar: res2.avatar, building: res3.name }])
                        }))
                    }))
                }))
            setTimeout(() => {
                setLoad(false)
            }, 1000);
        }
        getAllUser()
    }, [])

    let navigate = useNavigate()
    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            {load && <LoadingSpinner message="Fetching Customers..." />}
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Pages</Breadcrumb.Item>
                    <Breadcrumb.Item>Customers</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Organization Customers List"
                subTitle="Check all yours customers"
                onBack={() => navigate("/Dashboard")}
            />
            <Col span={24} style={{ borderRadius: 20 }}>
                <ProTable
                    columns={columns} dataSource={data}
                    cardBordered
                    cardProps={{ style: { borderRadius: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" } }}
                    options={{
                        search: false,
                    }}
                    rowKey="key"
                    locale={locale}
                    search={false} dateFormatter="string" />
            </Col>
            <CustomerModal visible={visible} buildingId={buildingId} setVisible={setVisible} />
        </Layout>
    );
}
export default Customers
