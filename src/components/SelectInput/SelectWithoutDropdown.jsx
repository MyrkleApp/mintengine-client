import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function SelectWithoutDropdown({ half, name, label, value, handleChange, asset }) {

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root>
                <label>{label}</label>
                <div className="container">
                    <div className="select">
                        <div className="left">
                            <img src={!asset ? algorandLogo : asset.image === "Shameless comrade, it isn't ready yet" ? questionMarkImg : asset?.image} alt="" />
                            <span>{asset?.name || 'ALGO'}</span>
                        </div>
                    </div>
                    <div className="rightBox">
                        <input
                            name={name}
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default SelectWithoutDropdown
