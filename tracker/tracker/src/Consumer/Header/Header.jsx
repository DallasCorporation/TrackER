import { Avatar, Col, Dropdown, Menu, Row, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarHover, LinkHover } from "../../Components/CustomComponents";
import { logout } from "../../reducers/user";

const Header = ({avatar}) => {
    const dispatch = useDispatch()
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
                                <LinkHover to="/Profile/Edit">View Profile</LinkHover>
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
                            <LinkHover to="/Profile/Security">Settings</LinkHover>
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
            <Row style={{ fontWeight: 500, width: "95%", backgroundColor: "white", borderRadius: "10px", paddingRight: 30, paddingLeft: 30, height: 50 }} align="middle" justify="space-between">
                <Row align="middle">
                    <Col style={{ borderRadius: 10, height: 40, width: 40, background: "#ebfafa", textAlign: "center", marginRight: 5 }}>
                        <span class="anticon iconfont" style={{ color: "blue", verticalAlign: "baseline" }} >&#x100e8;</span>
                    </Col>
                    <Col>
                        <p style={{ height: "32px" }}> Do you know the latest update of our 2022? 🎉  </p>
                    </Col>
                    <Col>
                        <p style={{ color: "#fea5b1", height: "32px", marginLeft: 5 }}>Our roadmap is alive for future updates.</p>
                    </Col>
                </Row>
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