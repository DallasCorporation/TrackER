import { Modal, Tabs } from "antd"
import ResourcesContent from "./ResourcesContent"

const ResourcesModal = ({socket, defaultActiveKey = "1", building, visible, setVisible, data }) => {
    const getKey = () => {
        switch (defaultActiveKey) {
            case "Solar":
                return "1"
            case "Geo":
                return "2"
            case "Wind":
                return "3"
            case "Hydro":
                return "4"
            default:
                return "1"
        }
    }
    return (
        <Modal destroyOnClose zIndex={1000} visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} width={1200}>
            <Tabs defaultActiveKey={getKey()} centered size="large">
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe65f;</span>Solar</>} key="1">
                    <ResourcesContent socket={socket} data={data} type="Solar" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe64b;</span>Geo</>} key="2" >
                    <ResourcesContent socket={socket} data={data} type="Geo" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe661;</span>Windy</>} key="3">
                    <ResourcesContent socket={socket} data={data} type="Wind" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe650;</span>Hydro</>} key="4">
                    <ResourcesContent socket={socket} type="Hydro" data={data} building={building} />
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}
export default ResourcesModal