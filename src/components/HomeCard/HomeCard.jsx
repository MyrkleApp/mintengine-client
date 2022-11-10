import React from 'react'
import * as Styles from './homeCard'
import fishImage from '../../assets/images/landingPage/fish.png'


function HomeCard({ children, title, text, showImage, handleTitleClick }) {

    return (
        <Styles.Root showImage={showImage}>
            <div className="container">
                { 
                    children &&
                    <div className="iconBox">
                        { children }
                    </div>
                }
                <h1 onClick={handleTitleClick}>{ title }</h1>
                <p>{ text }</p>
                {
                    showImage &&
                    <img src={fishImage} alt="" />
                }
            </div>
        </Styles.Root>
    )
}

export default HomeCard
