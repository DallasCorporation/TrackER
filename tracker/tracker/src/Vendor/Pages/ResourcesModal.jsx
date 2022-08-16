import { Button, Card, Col, message, Modal, Popconfirm, Row, Tooltip } from "antd"
import { ProForm, ProFormMoney, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"
import api from "../../api"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RenewableDetailsModal from "./RenewableDetailsModal";
const ResourcesModal = ({ visible, setVisible, data, options, }) => {

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
            title: 'Type',
            dataIndex: 'type',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Installation Price',
            dataIndex: 'price',
        },
        {
            title: 'Saving at KWh',
            dataIndex: 'earning',
        },
        {
            title: 'Organization percentage earning at KWh',
            dataIndex: 'organization',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            width: 100,
            render: (_, data) =>
                <Row justify="space-around" gutter={[16, 16]}>
                    <Tooltip title="See Building List">
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            setShow(true)
                            setShowData(data)
                        }}>
                            <span class="anticon iconfont" style={{ color: "blue" }}>&#xe7c6;</span>
                        </div>
                    </Tooltip>
                    <Popconfirm title="Are you sure to delete this Device" onConfirm={() => deleteResources(data._id)}>
                        <Tooltip title="Delete Device">
                            <div style={{ cursor: "pointer" }}><span class="anticon iconfont" style={{ color: "red" }} >&#x100dd;</span></div>
                        </Tooltip>
                    </Popconfirm>
                </Row>
        },
    ];

    const [price, setPrice] = useState(0)
    const [earning, setEarning] = useState(0)
    const [organization, setOrganization] = useState(0)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [dataTable, setDataTable] = useState([])
    const organizationId = useSelector((state) => state.organization.organization._id)
    const [show, setShow] = useState(false)
    const [showData, setShowData] = useState({})

    const ref = useRef();


    const getResourcesList = async () => {
        await api.renewable.fetchResourcesByOrganizationId(organizationId).then(res => {
            let table = []
            res.forEach(element => {
                if (element.resourcesType === data.name)
                    table.push(element)
            });
            setDataTable(table)
        })
    }

    const deleteResources = async (id) => {
        await api.renewable.deleteResources(id).then(res => {
            message.success("Resources Deleted")
            ref.current.reloadAndRest();
        }).catch(err => message.error("Error... "))
    }

    const createResources = async (data) => {
        await api.renewable.createResources(data).then(res => {
            setDataTable((old) => [...old, data])
            ref.current.reloadAndRest();
        })
    }

    useEffect(() => {
        if (organizationId !== null)
            getResourcesList(organizationId)
    }, [organization])


    const submit = (resourcesType) => {
        let data = {
            price,
            name,
            type,
            organization,
            earning,
            organizationId,
            resourcesType: resourcesType
        }
        createResources(data)
    }

    return (
        <Modal destroyOnClose title={data.name + " resources configuration"} width={1000} visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
            <ProTable headerTitle={data.name + " Resources List"}
                dataSource={dataTable}
                request={() => getResourcesList()}
                columns={columns} search={false} dateFormatter="string"
                actionRef={ref}
                tableExtraRender={() =>
                (<Card>
                    <Row justify="space-between" align="middle">
                        <ProForm grid layout="vertical" rowProps={{ gutter: [32, 32], }} submitter={{
                            submitButtonProps: { style: { display: 'none', }, }, resetButtonProps: { style: { display: 'none', }, },
                        }}>
                            <ProFormText label="Name" placeholder="Device Name" colProps={{ span: 12 }} onChange={(value) => setName(value.target.value)} />
                            <ProFormSelect label="Type" placeholder="Device Type" colProps={{ span: 12 }} options={options} onChange={(value) => setType(value)} />
                            <ProFormMoney label="Installation Price" placeholder="Device Installation Price" colProps={{ span: 8 }} customSymbol="€" min={0} onChange={(value) => setPrice(value)} />
                            <ProFormMoney label="Saving at KWh" placeholder="Device Customer Earning at kWh" colProps={{ span: 8 }} customSymbol="€" min={0} onChange={(value) => setEarning(value)} />
                            <ProFormMoney label="Organization percentage earning at KWh" placeholder="Device Organization Percentage at kWh" colProps={{ span: 8 }} customSymbol="%" min={0} onChange={(value) => setOrganization(value)} />
                        </ProForm>
                    </Row>
                    <Row justify="end">
                        <Button type="primary" style={{ borderRadius: 20, marginTop: 22 }} onClick={() => submit(data.name)}>Add Resources</Button>
                    </Row>
                </Card>)} />
            <RenewableDetailsModal filter={data.name} data={showData} visible={show} setVisible={setShow} />
        </Modal >
    )
}
export default ResourcesModal