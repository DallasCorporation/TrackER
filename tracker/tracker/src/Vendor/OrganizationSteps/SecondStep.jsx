import { InboxOutlined } from "@ant-design/icons"
import { Card, Col, Divider, message, Row, Upload } from "antd"
import TextArea from "antd/lib/input/TextArea"
import Dragger from "antd/lib/upload/Dragger"
import { useState } from "react"
import { useCallback } from "react"

const SecondStep = ({ name, setDescription, description="" }) => {
    const [image, setImage] = useState()
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }


        return isJpgOrPng
    };

    return (
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 2px rgba(0,0,0,0.2)", textAlign: "center", justifyContent: "center" }}>
            <p style={{ fontSize: 18, textAlign: "center" }}>Organization Name: <b>{name}</b></p>
            <Row justify="center" style={{ textAlign: "center" }} align="middle">
                <Col span={18} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Row justify="space-between">
                            <p>Upload Organization Logo</p>
                            <p>Info Icon</p>
                        </Row>
                        <Dragger style={{ borderRadius: 20 }} beforeUpload={beforeUpload} action={""}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload your organization logo</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Col>
                    <Divider />
                    <Col span={24} style={{ marginTop: 22 }}>
                        <Row justify="space-between">
                            <p>Organization Description</p>
                            <p>Info Icon</p>
                        </Row>
                        <TextArea showCount maxLength={200} title="Description" rows={4} defaultValue={description} onChange={(val) => setDescription(val.target.value)} />
                    </Col>
                </Col>
            </Row>
        </Card>
    )
}
export default SecondStep