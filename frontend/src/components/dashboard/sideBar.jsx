import React from 'react'
import styled from 'styled-components'
import {
    UserAddOutlined,
} from '@ant-design/icons';
import LinkPage from './linkPage';
import { UserContext } from '../../providers/user.provider'

const Component = styled.div`
display:grid;
background:var(--secondary);
grid-template-rows: 1fr 62px;
padding: 0px 20px;
p{
    margin: 0;
    font-size:20px;

}

.footer{
    display: grid;
}

.footer button{
    background: transparent;
    border: 0;
    text-decoration: underline;
    cursor: pointer;
}


.top{
    display: grid;
    grid-template-rows: 75px 1fr;
}

.circle{
    width: 35px;
    height: 35px;
    background: black;
    border-radius: 50%;
}

.user-top-card{
    display: grid;
    grid-template-columns: 55px 1fr;
    align-items: center;
    background: #EDF2F7;
}

.account-list{
    padding-top: 50px;
}
`
export default function SideBar({setMode}) {
    const { userData = {} } = UserContext()

    return (
        <Component>
            <div className="top">

                <div className="user-top-card">


                    <div className="info">
                        <p>
                            {'Shoppys Inventory'}
                        </p>
                    </div>
                </div>

                <div className="account-list">


                    <LinkPage click ={e=>{
                        setMode(0)
                    }}   {...{
                        name: 'Inventory'
                    }} />

                    <LinkPage click ={e=>{
                        setMode(1)
                    }}    {...{
                        name: 'Location'
                    }} />


                </div>
            </div>

        </Component>
    )
}
