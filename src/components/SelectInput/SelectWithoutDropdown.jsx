import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import noAssetImage from '../../assets/icons/noAssetImage.jpeg'
import { useSelector } from 'react-redux'
import useCheckImageExists from '../../Hooks/checkImageExists'

export const availableNetworks = {
    ALGORAND: { unit: 'ALGO', image: algorandLogo },
    RIPPLE: { unit: 'XRP', image: '' }
}

function SelectWithoutDropdown({ half, name, label, value, handleChange, passedDown, asset, placeholder }) {
    const network = useSelector(state => state.network.network)
    const { tinyManAssetImage } = useCheckImageExists(asset?.id)

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root>
                <label>{label}</label>
                <div className="container">
                    <div className="select">
                        <div className="left">
                            { 
                            !passedDown ? (
                            <>
                                <img 
                                    src={ !asset?.id ? availableNetworks[network].image : (tinyManAssetImage || asset.image || noAssetImage) } 
                                    alt="" 
                                />
                                <span>{ !asset?.id ? availableNetworks[network].unit : asset.unit }</span>
                            </>
                            ) : (
                                <>
                                    <img src={asset.image || noAssetImage} alt="" />
                                    <span>{asset.unit}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="rightBox">
                        <input
                            name={name}
                            value={value}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default SelectWithoutDropdown
