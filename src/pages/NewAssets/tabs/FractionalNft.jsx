import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'

function FractionalNft() {
    const { value: nftNameValue, handleChange: handleNftNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: decimalValue, handleChange: handleDecimalChange } = useFormControl()
    const { value: nftUrlValue, handleChange: handleNftUrlChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Fractional Nft</SharedStyles.Title>
                        <SharedStyles.Description>
                            Create digital representations of fractions of real-world assets or digital collectibles on the Algorand blockchain with Mint Engine.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            label="NFT Name"
                            type="text"
                            value={nftNameValue}
                            handleChange={handleNftNameChange}
                        />
                        <SharedStyles.UploadImageBox>
                            <img src={imageFrame} alt="" />
                            <UploadImageButton>Upload Image</UploadImageButton>
                        </SharedStyles.UploadImageBox>
                        <FormControl 
                            label="Unit"
                            type="text"
                            value={unitValue}
                            handleChange={handleUnitChange}
                        />
                        <FormControl 
                            label="Total Suppy"
                            value={totalSupplyValue}
                            handleChange={handleTotalSupplyChange}
                        />
                        <FormControl 
                            label="Decimal"
                            type="text"
                            value={decimalValue}
                            handleChange={handleDecimalChange}
                        />
                        <FormControl 
                            label="NFT URL"
                            type="text"
                            value={nftUrlValue}
                            handleChange={handleNftUrlChange}
                        />
                        <FormControl 
                            textArea
                            label="Note"
                            value={noteValue}
                            handleChange={handleNoteChange}
                        />
                        <Button fullWidth disabled style={{ marginTop: '20px' }}>
                            create asset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </SharedStyles.BoxContainer>
    )
}

export default FractionalNft
