import { EditOutlined, SettingOutlined, SolutionOutlined } from "@ant-design/icons"
import { Checkbox, Col, Collapse, message, Modal, PageHeader, Row } from "antd"
import { useState } from "react"
import api from "../../../api"
import { eula, privacy } from "./utils"

const ContractModal = ({ visible, setVisible, data, buildingId }) => {

    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)

    const check = async () => {
        if (check1 && check2) {
            setVisible(false)
            let obj = {}
            obj[data.resourcesType] = data._id
            switch (data.resourcesType) {
                case "Solar":
                    obj = { "Solar": data._id }
                    break;
                case "Wind":
                    obj = { "Wind": data._id }
                    break;
                case "Hydro":
                    obj = { "Hydro": data._id }
                    break;
                case "Geo":
                    obj = { "Geo": data._id }
                    break;
                default:
                    break;
            }
            await api.buildings.updateBuildingResources(buildingId, { resource: obj })
            await api.renewable.updateResourcesBuildings(data._id, { building: buildingId }).then(() => message.success("Devices Request Submitted!"))
        }
        else
            message.error("You have to accept both condition to submit this request")
    }

    const getExtra = (type = false) => (
        type ?
            <EditOutlined
                style={{ fontSize: 40, color: "blue" }}
                onClick={(event) => { event.stopPropagation(); }}
            />
            :
            <SolutionOutlined
                style={{ fontSize: 40, color: "blue" }}
                onClick={(event) => { event.stopPropagation(); }}
            />
    );

    return (
        <Modal width={900} visible={visible} onOk={() => { check() }} onCancel={() => setVisible(false)} destroyOnClose>
            <PageHeader
                title="Contract Rules"
                subTitle="Read and check the contract"
            />
            <Collapse defaultActiveKey={['1', "2"]} expandIconPosition="right" bordered={false}>
                <Collapse.Panel header={<h1>Terms of Service</h1>} key="1" extra={getExtra(true)}>
                    <Col span={24} style={{ overflow: "auto" }}>
                        {eula}
                        <Row justify="end" span={24} style={{ marginTop: 32 }}>
                            <Checkbox onChange={(e) => setCheck1(e.target.checked)}>
                                <p style={{ fontSize: 16 }}>I accept the <b>Terms of Service</b></p>
                            </Checkbox>
                        </Row>
                    </Col>
                </Collapse.Panel>
                <Collapse.Panel header={<h1>Privacy Policy</h1>} key="2" extra={getExtra()}>
                    <Col span={24} style={{ overflow: "auto" }}>
                        {privacy}
                        <Row justify="end" span={24} style={{ marginTop: 32 }}>
                            <Checkbox onChange={(e) => setCheck2(e.target.checked)}><p style={{ fontSize: 16 }}>I agree to the <b>Privacy Policy</b></p></Checkbox>
                        </Row>
                    </Col>
                </Collapse.Panel>
            </Collapse>

        </Modal>
    )
}
export default ContractModal