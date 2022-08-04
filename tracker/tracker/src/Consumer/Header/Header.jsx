import { Avatar, Col, Dropdown, Menu, Row, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarHover, LinkHover } from "../../Components/CustomComponents";
import { logout } from "../../reducers/user";

const Header = ({ avatar }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const type = user.type
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
                        },
                        {
                            key: '1-2',
                            label: (
                                <LinkHover to="/Profile/Security">Settings</LinkHover>
                            ),
                        },],
                    label: <h3>Profile Settings</h3>
                },
                type === "Buildings" && {
                    type: "divider",
                },
                type === "Buildings" && {
                    key: '2',
                    type: 'group',
                    children: [
                        {
                            key: '2-1',
                            label: (
                                <LinkHover to="/Building">View Building</LinkHover>
                            ),
                        },
                        {
                            key: '2-2',
                            label: (
                                <LinkHover to="/Organizations">View Organizations</LinkHover>
                            ),
                        },
                        {
                            key: '2-3',
                            label: (
                                <LinkHover to="/Invoices/Yearly">View Invoices</LinkHover>
                            ),
                        }],
                    label: <h3>Profile Actions</h3>
                },
                {
                    type: "divider",
                },
                {
                    key: '3',
                    type: 'group',
                    children: [
                        {
                            key: '3-1',
                            label: (
                                <div onClick={() => dispatch(logout())}>Logout</div>
                            ),
                        }],
                    label: <h3 >Exit Profile</h3>,
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
                        <p style={{ color: "#fea5b1", height: "32px", marginLeft: 5 }}>Check our program for 2022.</p>
                    </Col>
                </Row>
                <Space>
                    <Dropdown overlay={menu} placement="bottomRight" overlayStyle={{ borderRadius: 10 }}>
                        <Row justify="space-between" align="middle" >
                            <p style={{ color: "blue", margin: 0, marginRight: 6 }}>{user.name} {user.surname}</p>
                            <AvatarHover size={"default"} src={avatar} />
                        </Row>
                    </Dropdown>
                </Space>
            </Row>
        </Row>
    )
}

export default Header