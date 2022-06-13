import React from 'react'
import styled from 'styled-components'
import {
    AppstoreOutlined,
} from '@ant-design/icons';
const Component = styled.div`
display: grid;
grid-template-columns: 32px 1fr;
align-items: center;
margin: 21px 0;
cursor:pointer;


p{
    font-size: 14px;
    font-weight: 500;
}

span{
    text-align: left;
    font-size:20px;
    color:#1D99E6
}

`
export default function LinkPage({
    name, click, accountId
}) {
    return (
        <Component onClick={e=>{click()}}>
          <AppstoreOutlined /><p> {name}</p>
        </Component>
    )
}
