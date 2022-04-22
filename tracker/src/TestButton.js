import React, { useState } from "react";
import { Button } from 'antd';
const TestButton = () => {
    const [cont,setCont] = useState(0)
    return (
        <div>
            <p>{cont}</p>
            <Button type="primary">Primary Button</Button>
            <Button onClick={()=>{
                console.log(cont+1)
                setCont(cont + 1)}
        }>Premi</Button>
        </div>
    )
}

export default TestButton;