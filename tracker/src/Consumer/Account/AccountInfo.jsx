import { HomeOutlined, IdcardOutlined } from "@ant-design/icons"
import { Avatar, Card, Col, Divider, Row, Tag } from "antd"
import styled from "styled-components"

const AccountName = styled.p`
font-size: 22px;
text-align: center;
margin-top:15px;
margin-bottom:5px
`

const Sections = styled.p`
font-size: 16px;
`
const AccountInfo = () => {
    return (
        <Card style={{borderRadius:"20px", boxShadow:"1px 1px 8px 1px rgba(0,0,0,0.25)", minHeight:"80vh"}}>
            <Row justify="center">
                <Avatar size={104} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                <Col span={24} style={{ textAlign: "center" }}>
                    <AccountName>Username</AccountName>
                    <p> Account description</p>
                </Col>
                <Divider />
                <Row >
                    <Col flex>
                        <span style={{
                            display: "inline-block",
                            alignItems: "center",
                        }}>
                            <IdcardOutlined />
                        </span>
                    </Col>
                    <Col>
                        <p>Name Surname</p>
                    </Col>
                </Row>
                <Col flex style={{ textAlign: "center" }}>
                    <Row type="flex" justify="space-around">
                        <span style={{
                            display: "inline-block",
                            alignItems: "center",
                        }}>
                            <HomeOutlined />
                        </span>
                        <p>Address null, null, null, null</p>
                    </Row>
                </Col>
            </Row>
            <Divider />
            <Col span={24}>
                <Sections>Title</Sections>
            </Col>
            <Row justify="start" gutter={[0, 16]}>
                <Tag>Some</Tag>
                <Tag>Colored</Tag>
                <Tag>Random</Tag>
                <Tag>Tags</Tag>

            </Row>
            <Divider />
            <Col span={24}>
                <Sections>Title</Sections>
            </Col>
            <Row justify="start" gutter={[0, 16]}>
                <Tag>Some</Tag>
                <Tag>Colored</Tag>
                <Tag>Random</Tag>
                <Tag>Tags</Tag>

            </Row>

        </Card>
    )
}
export default AccountInfo