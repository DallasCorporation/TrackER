import { Button, Card, Col, Descriptions, Modal, Row } from "antd"
import { ProForm, ProFormMoney, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"

const ResourcesModal = ({ visible, setVisible, data }) => {

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
            title: 'Earnings at KWh',
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
            render: (_, data) =>
                <a onClick={() => {
                    // setVisible(true)
                    // setBuildingId(data.buildingId)
                }} key="1" >
                    See Details
                </a>
        },
    ];
    return (
        <Modal title={data.name + " resources configuration"} width={1000} visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
            <ProTable headerTitle={data.name + " Resources List"}
                dataSource={[]}
                columns={columns} search={false} dateFormatter="string"
                tableExtraRender={(_, data) =>
                (<Card>
                    <Row justify="space-between" align="middle">
                        <ProForm grid layout="vertical" rowProps={{ gutter: [32, 32], }} submitter={{
                            submitButtonProps: { style: { display: 'none', }, }, resetButtonProps: { style: { display: 'none', }, },
                        }}>
                            <ProFormText label="Name" colProps={{ span: 12 }} />
                            <ProFormSelect
                                label="Type"
                                colProps={{ span: 12 }}
                                options={[
                                    { value: "Photovoltaic Solar Power", label: "Photovoltaic Solar Power", },
                                    { value: "Concentrating Solar Power", label: "Concentrating Solar Power", },
                                    { value: "chapter2", label: "Effective when stamped2", },
                                ]}
                            />
                            <ProFormMoney label="Installation Price" colProps={{ span: 8 }} customSymbol="€" min={0} />
                            <ProFormMoney label="Earnings at KWh" colProps={{ span: 8 }} customSymbol="€" min={0} />
                            <ProFormMoney label=" Organization percentage earning at KWh" colProps={{ span: 8 }} customSymbol="€" min={0} />

                        </ProForm>
                    </Row>
                    <Row justify="end">
                        <Button type="primary" style={{ borderRadius: 20, marginTop:22 }}>Add Resources</Button>
                    </Row>
                </Card>)} />
        </Modal >
    )
}
export default ResourcesModal