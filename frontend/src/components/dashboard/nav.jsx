import React from 'react'
import styled from 'styled-components'
import  { Switch } from 'antd'
import { toggleCoommentWebhooks } from '../../services/dashboard'
import { UserContext } from '../../providers/user.provider'
 const Component = styled.div`
display: grid;
grid-template-columns: 1fr 115px 100px;
background: var(--secondprimary);
padding: 20px 40px;
align-items: center;

p{
    margin: 0;
    font-size: 19px;
}

.profile{
    width: 35px;
    height: 35px;
    background: silver;
    border-radius: 50%;
    margin: auto;
}
`
export default function Navigation() {
    const {userData={}} =  UserContext()
 
    return (
        <Component>
            <p>
                 
            </p>

           
            {/* <div className="profile">

            </div> */}
        </Component>
    )
}
