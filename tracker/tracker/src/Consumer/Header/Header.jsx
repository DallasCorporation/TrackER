import { Avatar, Dropdown, Menu, Row, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarHover, LinkHover } from "../../Components/CustomComponents";
import { logout } from "../../reducers/user";

const Header = () => {
    const dispatch = useDispatch()
    const avatar = useSelector((state) => state.preference.preference.avatar)
    const menu = (
        <Menu
            style={{ borderRadius: 10 }}
            items={[
                {
                    key: '1',
                    type: 'group',
                    children: [
                        {
                            key: '1-1',
                            label: (
                                <div>
                                    <LinkHover to="/Profile/Edit">View Profile</LinkHover>
                                </div>
                            ),
                        },],
                    label: <h3>Profile Settings</h3>
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
                        <div onClick={() => dispatch(logout())}>Logout</div>
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
                        <AvatarHover size={"default"} src={avatar} />
                    </Dropdown>
                </Space>
            </Row>
        </Row>
    )
}

export default Header