import React from 'react'
import * as Styles from './authWrapper'

function AuthWrapper({ children }) {

    return (
        <Styles.Root>
            <Styles.Container>
                { children }
            </Styles.Container>
        </Styles.Root>
    )
}

export default AuthWrapper
