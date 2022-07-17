import React, { Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import HomeAnimations from './HomeAnimations/HomeAnimations'
import LandingPageTop from './LandingPageTop/LandingPageTop'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import algorandBlack from '../../assets/images/landingPage/algorandBlack.png'

function LandingPage() {

    return (
        <Fragment>
            <LandingPageTop />
            <WhatYouGet />
            {/* <img 
                src={algorandBlack}
                alt=""
                style={{ width: '100%', height: 'auto' }}
            /> */}
            <HomeAnimations />
            <Footer />
        </Fragment>
    )
}

export default LandingPage
