import React, { Fragment } from 'react'
import Footer from '../../components/Footer/Footer.jsx'
import LandingPageTop from './LandingPageTop/LandingPageTop.jsx'
import WhatYouGet from './WhatYouGet/WhatYouGet.jsx'

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
