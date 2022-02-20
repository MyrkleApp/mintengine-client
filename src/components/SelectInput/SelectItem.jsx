import React from 'react'
import { DropdownItem } from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'

function SelectItem({ name, assetId, amount, handleItemClick }) {

    const handleClick = () => {
        handleItemClick(assetId)
    }

    return (
        <DropdownItem onClick={handleClick}>
            <div className="left">
                <div className="leftTop">
                    <img src={algorandLogo} alt="" />
                    <span>ALGORAND</span>
                </div>
                <div className="leftBottom">
                    <span>{name}</span>
                </div>
            </div>
            <div className="right">
                <div className="rightTop">
                    <span>{amount}</span>
                </div>
                <div className="rightBottom">
                    <span>Asset ID:</span>
                    <span>{assetId}</span>
                </div>
            </div>
        </DropdownItem>
    )
}

export default SelectItem
