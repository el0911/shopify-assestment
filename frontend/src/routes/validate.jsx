import React from 'react'
import { validateUtil } from '../services/auth'

export default function Validate() {

        React.useEffect(()=>{
            validateUtil()
        },[])

    return (
        <div>
            ..........working on it
        </div>
    )
}
