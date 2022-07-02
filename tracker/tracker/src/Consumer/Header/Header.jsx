import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Row, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/user";

const Header = () => {
    const dispatch = useDispatch()
    const menu = (
        <Menu
            style={{ borderRadius: 10 }}
            items={[
                {
                    key: '1',
                    label: (
                        <div>
                            <h3>Profile Settings</h3>
                            <p>View Profile</p>
                        </div>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: '2',
                    label: (
                        <div>Explore 1</div>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <div>Settings</div>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <div>Help</div>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: '5',
                    label: (
                        <div onClick={() =>dispatch(logout())}>Logout</div>
                    ),
                },
            ]}
        />
    );
    return (
        <Row justify="center" style={{ marginTop: "15px", }}>
            <Row style={{ width: "95%", backgroundColor: "white", borderRadius: "10px", }} align="middle" justify="center">
                <Space>
                    <Dropdown overlay={menu} placement="bottomRight" overlayStyle={{ borderRadius: 10 }}>
                        <Avatar size={"default"} icon={<AntDesignOutlined />} />
                    </Dropdown>
                </Space>
            </Row>
        </Row>
    )
}

export default Header