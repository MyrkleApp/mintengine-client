import React, { Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import LandingPageTop from './LandingPageTop/LandingPageTop'
import WhatYouGet from './WhatYouGet/WhatYouGet'

function LandingPage() {

    return (
        <Fragment>
            <LandingPageTop />
            <WhatYouGet />
            <Footer />
        </Fragment>
    )
}

export default LandingPage
