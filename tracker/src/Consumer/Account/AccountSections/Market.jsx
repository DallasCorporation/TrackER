import { Card, Avatar, Col, Row, Tooltip } from 'antd';

const { Meta } = Card;

const obj = [
    {
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Vendor Service",
        description: "Vendor description",
        time: "A few moments ago"

    },  {
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Vendor Service",
        description: "Vendor description",
        time: "A few moments ago"

    },  {
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Vendor Service",
        description: "Vendor description",
        time: "A few moments ago"

    },  {
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "Vendor Service",
        description: "Vendor description",
        time: "A few moments ago"

    },
]

const renderFooter = (time) => {
    return (
        <Row justify='space-between' gutter={[48, 0]} style={{ marginTop: "22px", }}>
            <Col flex> 
                <p style={{ justifyContent: 'center', fontSize: "12px", marginTop:"6px"}}>{time}</p>
            </Col>
            <Col flex >
                < Avatar.Group >
                    <Tooltip title="Name Surname">
                        <Avatar style={{ backgroundColor: 'gray', }}>
                            A
                        </Avatar>
                    </Tooltip>
                    <Tooltip title="Name Surname">

                        <Avatar style={{ backgroundColor: 'blue' }}>
                            B
                        </Avatar>
                    </Tooltip>
                    <Tooltip title="Name Surname">
                        <Avatar style={{ backgroundColor: 'lightblue' }} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png">
                            C
                        </Avatar>
                    </Tooltip>
                </Avatar.Group >
            </Col>
        </Row >
    )
}



const Market = () => (
    <Row justify="space-between" gutter={[16, 24]}>
        {obj.map(el =>
            <Col span={12}>
                <Card
                    hoverable
                    cover={
                        <img
                            alt="example"
                            src={el.src}
                        />
                    }
                >
                    <Meta
                        title={el.title}
                        description={el.description}
                    />
                    <Meta
                        description={renderFooter(el.time)}
                    />
                </Card>
            </Col>
        )}
    </Row>

);
export default Market