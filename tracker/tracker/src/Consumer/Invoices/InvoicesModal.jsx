import { Col, Modal } from "antd"

const InvoicesModal = ({ data, visible, setVisible }) => {
    return (
        <Modal visible={visible} onOk={() => setVisible(!visible)} onCancel={() => setVisible(!visible)}>
            <Col span={24}>
                
            </Col>
        </Modal>
    )
}
export default InvoicesModal