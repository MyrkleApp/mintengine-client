import React from 'react'
import { DropdownItem } from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function SelectItem({ asset, handleItemClick, selected, setSelectedItem }) {

    const handleClick = () => {
        handleItemClick(asset.id)
        setSelectedItem(asset)
    }

    return (
        <DropdownItem onClick={handleClick} selected={selected}>
            <div className="left">
                <div className="leftTop">
                    <img src={asset.img || questionMarkImg} alt="" />
                    <span>{asset.name}</span>
                </div>
                <div className="leftBottom">
                    <span>ALGO</span>
                </div>
            </div>
            <div className="right">
                <div className="rightTop">
                    <span>{asset.amount}</span>
                </div>
                <div className="rightBottom">
                    <span>Asset ID:</span>
                    <span>{asset.id}</span>
                </div>
            </div>
        </DropdownItem>
    )
}

export default SelectItem
