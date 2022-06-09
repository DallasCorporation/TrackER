import React, { useState, useEffect } from 'react';
import { Gauge } from '@ant-design/plots';

const Chart = () => {
    const config = {
        animation: {
            appear: {
                animation: 'path-in',
                duration: 3000,
            },
        },
        percent: 0.20,
        range: {
            ticks: [0, 1 / 3, 2 / 3, 1],
            color: ['#F4664A', '#FAAD14', '#30BF78'],
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            content: {
                style: {
                    fontSize: '18px',
                },
            },
        },
    };
    return <Gauge {...config} height={200} />;
};

export default Chart