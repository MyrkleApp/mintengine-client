import React, { Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import HomeAnimations from './HomeAnimations/HomeAnimations'
import LandingPageTop from './LandingPageTop/LandingPageTop'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import Parteners from './Parteners/Parteners'

function LandingPage() {

    return (
        <Fragment>
            <LandingPageTop />
            <WhatYouGet />
            <Parteners />
            {/* <HomeAnimations /> */}
            <Footer />
        </Fragment>
    )
}

export default LandingPage
