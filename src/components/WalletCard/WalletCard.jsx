import React from 'react'
import * as Styles from './walletCard'
import { Button } from '../UI/Button/button'
import { Link } from 'react-router-dom'

function WalletCard({ children, walletSetup, buttonText, title, text, image, link }) {

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
                        <Link to={link} style={{ textDecoration: 'none' }}>
                            <Button wide>{ buttonText }</Button>
                        </Link>
                    }
                </div>
            </Styles.Container>
        </Styles.Root>
    )
}

export default React.memo(WalletCard)
