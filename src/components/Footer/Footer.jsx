import React from 'react'
import * as Styles from './footer'
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {

    return (
        <Styles.Root>
            <div className="container">
                <div className="topContent">
                    <div className="left">
                        <h3>Mint Engine</h3>
                    </div>
                    <div className="right">
                        <Styles.SocialLink>
                            <span>Twitter</span>
                            <TwitterIcon />
                        </Styles.SocialLink>
                        <Styles.SocialLink>
                            <span>Telegram</span>
                            <TelegramIcon />
                        </Styles.SocialLink>
                        <Styles.SocialLink>
                            <span>Twitter</span>
                            <TwitterIcon />
                        </Styles.SocialLink>
                        <Styles.SocialLink>
                            <span>Github</span>
                            <GitHubIcon />
                        </Styles.SocialLink>
                    </div>
                </div>
                <p>Powered by 0xEngine Labs</p>
            </div>
        </Styles.Root>
    )
}

export default Footer
