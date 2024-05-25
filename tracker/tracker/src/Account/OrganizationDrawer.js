import { InboxOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, message, Row, Spin } from "antd";
import ImgCrop from 'antd-img-crop';
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { AccountSubTitle } from "../Components/CustomComponents";
import { fetchOrganization } from "../reducers/organization";
import { updatePreference } from "../reducers/preference";

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const OrganizationDrawer = ({ user, visible, onClose }) => {
    const uploadImage = async (file) => { // file from <input type="file"> 
        const data = new FormData();
        data.append("file", file.file);
        data.append("upload_preset", "lazkktrh");
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/dgfnyulqh/image/upload`,
            {
                method: "POST",
                body: data,
            }
        );
        const img = await res.json();
        if (img) {
            file.onSuccess(img);
            setCurrent(img.secure_url)
        }
        else {
            file.onError(img);
        }
    }


    const userPreference = useSelector((state) => state.preference.preference)
    const organization = useSelector((state) => state.organization.organization)
    const [current, setCurrent] = useState(userPreference.avatar)
    const dispatch = useDispatch()
    const confirm = async () => {
        await api.preference.updatePreference(user._id, { avatar: current }).then(data => dispatch(updatePreference(data)))
        await api.organization.update(organization._id, { icon: current }).then(data => dispatch(fetchOrganization(data)))
        message.success("Avatar updated correctly")
        onClose()
    }

    return (
        <Drawer title="Change Organization Logo" size="large" placement="right" visible={visible} onClose={() => onClose()}>
            <Row justify="center">
                <Avatar size={200} src={current} />
            </Row>
            <AccountSubTitle style={{ textAlign: "center", marginTop: 10 }}>Organization Logo Preview</AccountSubTitle>
            <Card style={{ borderRadius: 20, marginTop: 20, boxShadow: "0 2px 2px #022cf7", }}>
                <ImgCrop shape="round"
                    minZoom={0}
                    rotate
                    quality={1}
                    grid>
                    <Dragger {...props}
                        iconRender={(data) => data.status === "done" ? null : <Spin />}
                        style={{ minHeight: 200, borderColor: "blue" }}
                        customRequest={(data) => uploadImage(data)}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint" style={{ marginTop: 22 }}>
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </ImgCrop>
            </Card>
            <Row justify="end" style={{ marginTop: 60 }}>
                <Button type="ghost" onClick={() => onClose()}>Cancel</Button>
                <Button style={{ marginLeft: 20 }} type="primary" onClick={() => confirm()}>Change</Button>
            </Row>
        </Drawer>
    )
}
export default OrganizationDrawer;