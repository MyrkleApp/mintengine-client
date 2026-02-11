import React from 'react'
import * as Styles from './authWrapper.js'

function AuthWrapper({ children }) {

    return (
        <Styles.Root>
            <div className="container">
                <div className="left">
                    <p>Getting started on Myrkle is just a few clicks away.</p>
                </div>
                <div className="right">
                    { children }
                </div>
            </div>
        </Styles.Root>
    )
}

export default AuthWrapper
