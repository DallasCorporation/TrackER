import React, { useState } from "react";
import { Button } from 'antd';
const TestButton = ({initCont=0, text}) => {
   
    const [cont, setCont] = useState(initCont)
    return (
        <div>
            <p>{cont}</p>
            <Button onClick={() => {
                console.log(cont + 1)
                setCont(cont + 1)
            }}>{text}</Button>
        </div>
    )
}

export default TestButton;