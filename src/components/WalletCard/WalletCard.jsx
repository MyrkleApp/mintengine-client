import React from 'react'
import * as Styles from './walletCard'
import { Button } from '../UI/Button/button'

function WalletCard({ children, walletSetup, buttonText, title, text, image }) {

    return (
        <Styles.Root>
            <Styles.Container>
                <Styles.Icon showLogo={walletSetup}>
                    { 
                        walletSetup
                            ? <img src={image} alt="" />
                            : children
                    }
                </Styles.Icon>
                <div>
                    <Styles.Title>{ title }</Styles.Title>
                    <Styles.Text>{ text }</Styles.Text>
                    {
                        !walletSetup &&
                        <Button fullWidth>{ buttonText }</Button>
                    }
                </div>
            </Styles.Container>
        </Styles.Root>
    )
}

export default WalletCard
