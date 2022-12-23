import { ProForm, ProTable } from "@ant-design/pro-components"
import { Avatar, Card, Popconfirm, Row, Tooltip } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../api";


const ResourcesContent = ({  data, type, building }) => {
    const allOrganization = useSelector(state => state.allOrganization.organization)

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
            width: 200,
        },
        {
            title: 'Organization Name',
            dataIndex: 'organizationId',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 200,
            render: (_, val) => Object.values(allOrganization).find(el => el._id === val.organizationId).name
        },
        {
            title: 'Organization Logo',
            dataIndex: 'organizationId',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            width: 200,
            render: (_, val) => {
                let src = (Object.values(allOrganization).find(el => el._id === val.organizationId).icon)
                return <Avatar src={src} />
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            initialValue: 'all',
            filters: true,
            width: 200,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Installation Price',
            width: 200,
            dataIndex: 'price',
            render: (val, data) => val + " €"
        },
        {
            title: 'Saving at KWh',
            dataIndex: 'earning',
            width: 200,

            render: (val, data) => val + " €"
        },
        {
            title: 'Organization percentage earning at KWh',
            dataIndex: 'organization',
            width: 200,
            render: (val, data) => val + "%"
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            width: 150,
            render: (_, data) =>
                <Row justify="space-around" gutter={[16, 16]}>
                    <Popconfirm title="Are you sure to proceed to sign this contract?" onConfirm={() => {
                        setSelected(data)
                        setVisible(true)
                    }}>
                        <Tooltip title="See Building List">
                            <div style={{ cursor: "pointer" }}>Sign Contract<span class="anticon iconfont" style={{ marginLeft: 10, color: "blue" }}>&#x100db;</span></div>
                        </Tooltip>
                    </Popconfirm>
                </Row>
        },
    ];
    const [dataTable, setDataTable] = useState([])
    const [selected, setSelected] = useState({})
    const [visible, setVisible] = useState(false)
    const getRenewable = async () => {
        return await api.renewable.fetchAll().then(res => {
            let table = []
            res.forEach(element => {
                if (element.resourcesType === type)
                    table.push(element)
            });
            setDataTable(table)
        })
    }

    useEffect(() => {
        getRenewable()
    }, [data, type])

    return (
        <>
            <ProTable headerTitle={" Resources List"}
                dataSource={dataTable}
                request={() => getRenewable()}
                columns={columns} search={false} dateFormatter="string"
            />
        </>
    )
}
export default ResourcesContent