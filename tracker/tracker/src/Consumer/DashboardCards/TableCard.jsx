import { Col, DatePicker, Row, Tooltip } from "antd";
import { ProCard } from "@ant-design/pro-components";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
import { DownOutlined, EllipsisOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import React, { useRef } from 'react';

const TableCard = ({ chart, value, title }) => {
    const valueEnum = {
        0: 'close',
        1: 'running',
        2: 'online',
        3: 'error',
    };
    const tableListDataSource = [];
    for (let i = 0; i < 5; i += 1) {
        tableListDataSource.push({
            key: i,
            number: i+1,
            name: Math.floor(Math.random() * 20),
            creator: Math.floor(Math.random() * 13),
            status: valueEnum[Math.floor(Math.random() * 10) % 4],
            createdAt: Date.now() - Math.floor(Math.random() * 100000),
            memo: i % 2 === 1 ? '1' : '2',
            assign: i % 2 === 1 ? '1' : '2',
        });
    }
    const columns = [
        {
            title: '#',
            width: 50,
            dataIndex: 'number',
            render: (_) => <a>{_}</a>,
        },
        {
            title: 'Project Name',
            dataIndex: 'name',
            sorter: (a, b) => a.containers - b.containers,
        },
        {
            title: 'Start Date',
            dataIndex: 'status',
            initialValue: 'all',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                close: { text: '关闭', status: 'Default' },
                running: { text: '运行中', status: 'Processing' },
                online: { text: '已上线', status: 'Success' },
                error: { text: '异常', status: 'Error' },
            },
        },
        {
            title: 'End Date',
            dataIndex: 'creator',
            valueEnum: {
                all: { text: '全部' },
                付小小: { text: '付小小' },
                曲丽丽: { text: '曲丽丽' },
                林东东: { text: '林东东' },
                陈帅帅: { text: '陈帅帅' },
                兼某某: { text: '兼某某' },
            },
        },
        {
            title: 'Status',
            dataIndex: 'memo',
            ellipsis: true,
            copyable: true,
        },
        {
            title: 'Assign',
            dataIndex: 'assign',
            ellipsis: true,
            copyable: true,
        },
    ];

    return (

        <ProCard bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle" >
                <ProTable dataSource={tableListDataSource} rowKey="key" pagination={{
                    hideOnSinglePage:true,

                }} columns={columns} search={false} options={{setting:false, reload:false,fullScreen:false, density:false, search:false}} dateFormatter="string" />
            </Row>
        </ProCard>
    )
};

export default TableCard