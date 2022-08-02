import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import "./Modal.css";
import Button from "./Button";

const Modal = NiceModal.create(
  ({ title, subtitle, action, bgColor, note = "" }) => {
    const [input, setInput] = useState(note);
    const modal = useModal();
    return (
        <Modal title="Edit Building" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
        <p>Building Name</p>
        <Input></Input>
        <p style={{ marginTop: "22px" }}>Contact Name</p>
        <Input></Input>
        <p style={{ marginTop: "22px" }}>Address</p>
        <Input></Input>
        <p style={{ marginTop: "22px" }}>Building Type</p>
        <Input></Input>
    </Modal>
    )});

    export default Modal;