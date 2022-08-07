import { ProTable } from "@ant-design/pro-components"
import locale from 'antd/es/date-picker/locale/it_IT'

const CustomersBuildingTable = ({ data, columns, headerTitle=null }) => {
    // const columns = [
    //     {
    //         title: "#",
    //         dataIndex: 'index',
    //         valueType: 'index',
    //         key: 'index',
    //         width: 20,
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         initialValue: 'all',
    //         filters: true,
    //         onFilter: true,
    //         valueType: 'select',
    //     },
    //     {
    //         title: 'Surname',
    //         dataIndex: 'surname',
    //         initialValue: 'all',
    //         filters: true,
    //         onFilter: true,
    //         valueType: 'select',
    //     },
    //     {
    //         title: 'Building',
    //         dataIndex: 'building',
    //     },
    //     {
    //         title: 'Action',
    //         key: 'option',
    //         valueType: 'option',
    //         render: (_, data) =>
    //             <a onClick={() => {
    //                 setVisible(true)
    //                 setBuildingId(data.buildingId)
    //             }} key="1" >
    //                 See Details
    //             </a>
    //     },
    // ];

    return <ProTable
        columns={columns} dataSource={data}
        headerTitle={headerTitle}
        cardBordered
        cardProps={{ style: { borderRadius: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" } }}
        options={{ search: false, }}
        rowKey="key"
        locale={locale}
        search={false} dateFormatter="string" />
}
export default CustomersBuildingTable