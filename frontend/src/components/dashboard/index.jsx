import React from 'react'
import styled from 'styled-components'
import LocationBoard from './locationBoard'
import MainBaord from './mainBoard'
import SideBar from './sideBar'

const Component = styled.div`
display: grid;
grid-template-columns: 250px 1fr;
height: 100vh;
padding-top:10px;
background:var(--secondary)
`
export default function Dashboard() {
    const [mode, setMode] = React.useState(0)

    return (
        <Component>
           <SideBar setMode={setMode} />
           { mode===0 && <MainBaord/>}
           { mode===1 && <LocationBoard/>}
        </Component>
    )
}
