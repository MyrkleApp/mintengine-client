import React, { useState } from 'react'
import * as Styles from './parteners'
import { Grid } from '@mui/material'
import algorandBlack from '../../../assets/images/landingPage/algorandBlack.png'
import algorandFoundation from '../../../assets/images/landingPage/algorandFoundation.svg'
import MyCarousel from '../../../components/Carousel/Carousel'


function Parteners() {
    const [item, setItem] = useState(0);

    const handleSelectItem = i => {
        setItem(i);
    }
    
    return (
        <Styles.Root>
            <button onClick={() => handleSelectItem(0)}>0</button>
            <button onClick={() => handleSelectItem(1)}>1</button>
            <button onClick={() => handleSelectItem(2)}>2</button>
            <button onClick={() => handleSelectItem(3)}>3</button>
            <button onClick={() => handleSelectItem(5)}>5</button>

            <MyCarousel selectedItem={item} />

            {/* <Styles.Title>Our Parteners</Styles.Title>

            <Grid container spacing={6}>                
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Styles.Image src={algorandBlack} alt="Algorand" />
                </Grid>

                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Styles.Image src={algorandFoundation} alt="Algorand Foundation" />
                </Grid>

            </Grid> */}
            
        </Styles.Root>
    )
}

export default Parteners