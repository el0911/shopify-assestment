import React from 'react'
import styled from 'styled-components'

const Component = styled.div`
display:grid;
grid-row-gap: 35px;
grid-template-rows: 26px;

.overview-info{
    display: grid;
    height: 100px;
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 120px));
}

.overview-info div{
    border-right:1px solid silver;
}

.overview-info .header{
    color:silver;
}

.overview-info .value{
    margin-top: 9px;
    font-size: 48px;
    font-weight: 500;
}
`
export default function OverView() {
    const dataTemp = [{
        title: 'Allowed Posts',
        value: 300
    }, {
        title: 'Hidden Posts',
        value: 30
    }, {
        title: 'Paid users',
        value: 40
    }]
    return (
        <Component>
            <p className='title'>
                Overview
            </p>

            <div className="overview-info">
                {dataTemp.map(({ title, value }) => {
                    return <div>
                        <p className="header">
                            {title}
                        </p>

                        <p className="value">
                            {value}
                        </p>
                    </div>

                })}
            </div>
        </Component>
    )
}
