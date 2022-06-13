import React from 'react'
import styled from 'styled-components'


const Component = styled.div`
display:grid;
padding: 0 15px;
grid-row-gap: 20px;
border-left: 1px solid silver;
color:white;

.wallet-card{
    background: var(--primary);
    border-radius: 10px;
    border: 0;
    padding: 20px;
    text-align: center;
    height: 183px;
    display:grid;
    grid-row-gap: 10px;

}

button{
    background: none;
    border: 0;
    text-decoration: underline;
}

.balance{
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
}

`
export default function WalletInfo() {
    return (
        <Component>

            <p className='title'>
                Wallet
            </p>

            <div className="wallet-card">
                <p className="top-teext">
                    NGN wallet
                </p>
                <p className="balance">
                    $ 563,000.00
                </p>

                <button>Fund Wallet</button>
            </div>
        </Component>
    )
}
