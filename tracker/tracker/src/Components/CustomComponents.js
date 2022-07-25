import { Avatar } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardTitle = styled.h2`
font-size:16px;
color: #2d3436;
font-weight:500
`

export const AccountTitle = styled.h2`
font-size:30px;
color: #2d3436;
font-weight:500
`
export const AccountSubTitle = styled.h2`
font-size:23px;
color: #2d3436;
font-weight:500
`
export const GreyParagraph = styled.h2`
font-size:14px;
color: #636e72;
font-weight:400;
line-height: 21px;
`

export const AvatarHover = styled(Avatar)`
&:hover {
    cursor: pointer;
    }

`
export const LinkHover = styled(Link)`
text-align:"start";
font-size:13;
color:#636e72;
&:hover {
color: #022cf7;
cursor: pointer;
}
`

export const PlanParagraph = styled.h2`
font-size:17px;
font-weight:400;
`

export const PlanTitle = styled.h2`
font-size:23px;
font-weight:500;
`