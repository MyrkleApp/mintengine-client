import React from 'react'
import * as Styles from './homeCard'
import fishImage from '../../assets/images/landingPage/fish.png'


function HomeCard({ children, title, text, showImage, handleClick }) {

    return (
        <Styles.Root showImage={showImage} onClick={handleClick}>
            <div className="container">
                { 
                    children &&
                    <div className="iconBox">
                        { children }
                    </div>
                }
                <h1>{ title }</h1>
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
