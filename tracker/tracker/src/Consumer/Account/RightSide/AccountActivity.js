import { ProTable } from "@ant-design/pro-components"
import { Col, Divider } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api"
import { AccountTitle, GreyParagraph } from "../../../Components/CustomComponents";

const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 50,
    },
    {
        title: 'Country',
        dataIndex: 'country_name',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'Ip',
        dataIndex: 'IPv4',
        initialValue: 'all',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        render: (a) => {
            var newDate = new Date(a);
            return (
               newDate.toLocaleString()
            )
        }
    },
];



const AccountActivity = ({ user }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetch = async () => {
            let fetchData = await api.activity.fetchActivity(user._id).then(res => res)
            setData(fetchData)
        }
        fetch()
    }, [])


    return (

        <div>
            <Col>
                <AccountTitle>Login Activity</AccountTitle>
                <GreyParagraph>Here is your last login activities log.</GreyParagraph>
            </Col>
            <Divider />
            <ProTable dataSource={data} rowKey="key" pagination={{
                hideOnSinglePage: true,

            }} columns={columns} search={false} options={{ setting: false, reload: false, fullScreen: false, density: false, search: false }} dateFormatter="string" />
        </div>
    )
}
export default AccountActivity