import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/plots';

const LiquidChart = () => {
    const config = {
        height:150,
        percent: 0.25,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    };
    return <Liquid {...config} />;
};

export default LiquidChart