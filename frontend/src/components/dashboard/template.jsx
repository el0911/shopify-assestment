import React from 'react'
import styled from 'styled-components'
import SideBar from './sideBar'

const Component = styled.div`
display:grid;

`
export default function Dashboard() {
    return (
        <Component>
           <SideBar/>
           
        </Component>
    )
}
