import React, { Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import HomeAnimations from '../../components/HomeAnimations/HomeAnimations'
import LandingPageTop from '../../components/LandingPageTop/LandingPageTop'
import WhatYouGet from '../../components/WhatYouGet/WhatYouGet'

function LandingPage() {

    return (
        <Fragment>
            <LandingPageTop />
            <WhatYouGet />
            <HomeAnimations />
            <Footer />
        </Fragment>
    )
}

export default LandingPage
