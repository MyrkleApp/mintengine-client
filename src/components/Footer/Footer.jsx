import React from 'react'
import * as Styles from './footer'
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import mediumIcon from '../../assets/icons/medium.png'
import footerLogo from '../../assets/icons/footerLogo.png'
import algorandFooterLogo from '../../assets/icons/algorandFooterLogo.png'
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Footer() {

    return (
        <Styles.Root>
            <div className="container">
                <div className="topContent">
                    <div className="left">
                        <img src={footerLogo} alt="" />
                        <span>Mint Engine</span>
                    </div>
                    <div className="right">
                        <a href="https://twitter.com/MintEngine?s=09" target="_blank" style={{ textDecoration: 'none' }}>
                            <Styles.SocialLink>
                                <span>Twitter</span>
                                <TwitterIcon />
                            </Styles.SocialLink>
                        </a>
                        <a href="https://t.me/mintengine" target="_blank" style={{ textDecoration: 'none' }}>
                            <Styles.SocialLink>
                                <span>Telegram</span>
                                <TelegramIcon />
                            </Styles.SocialLink>
                        </a>
                        <a href="https://docs.mintengine.org/" target="_blank" style={{ textDecoration: 'none' }}>
                            <Styles.SocialLink>
                                <span>Docs</span>
                                <MenuBookIcon />
                            </Styles.SocialLink>
                        </a>
                        <a href="https://mintengine.medium.com/" target="_blank" style={{ textDecoration: 'none' }}>
                            <Styles.SocialLink>
                                <span>Medium</span>
                                <img src={mediumIcon} alt="" />
                            </Styles.SocialLink>
                        </a>
                    </div>
                </div>
                <div className="powered-by">
                    <span>Powered by</span> 
                    <img src={algorandFooterLogo} />
                </div>
            </div>
        </Styles.Root>
    )
}

export default Footer
