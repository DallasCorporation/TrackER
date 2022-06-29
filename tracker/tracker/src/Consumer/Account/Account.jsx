
import { PieChartOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components"
import { Avatar, Col, Divider, Layout, Menu, Row } from "antd"
import { useLocation } from "react-router-dom";
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"


const Account = ({ updateRoute }) => {
    function getItem(label, key, icon, children, type, style) {
        return {
            key,
            icon,
            children,
            label,
            type,
            style
        };
    }
    const items = [
        getItem('Personal Information', '/Profile/Edit', <PieChartOutlined />,),
        getItem('Notification', '/Profile/Notification', <PieChartOutlined />),
        getItem('Security Settings', '/Profile/Security', <PieChartOutlined />),
        getItem('Change Password', '/Profile/Password', <PieChartOutlined />),
    ];
    const location = useLocation()
    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]}>
                <ProCard style={{ borderRadius: "10px" }}>
                    <Row>
                        <Col span={4}>
                            <Col style={{textAlign:"center"}}>
                                <Avatar size={120} />
                                <h2 style={{marginTop:22, marginBottom:2}}>Dolores Bianca </h2>
                                <p>dolores@gmail.com</p>
                            </Col>
                            <Menu
                                onClick={(el) => updateRoute(el.key)}
                                mode="inline"
                                items={items}
                                defaultSelectedKeys={['/']}
                                selectedKeys={[location.pathname]}
                            />
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ width: "100%" }} />
                        </Col>
                        <Col span={19}>
                            <AccountTitle>Personal Information</AccountTitle>
                            <GreyParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.</GreyParagraph>
                            <Divider />
                            <AccountSubTitle>About</AccountSubTitle>
                            <GreyParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi. Suspendisse velit mi, pretium non euismod vitae Suspendisse velit mi, pretium non euismod vitae</GreyParagraph>
                            <Divider />
                            <AccountSubTitle>Contact</AccountSubTitle>
                            <Divider />
                            <AccountSubTitle>Preference</AccountSubTitle>
                        </Col>
                    </Row>
                </ProCard>
            </Row>
        </Layout>
    )
}
export default Account