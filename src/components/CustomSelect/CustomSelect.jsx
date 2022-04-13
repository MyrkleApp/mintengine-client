import React, { Fragment, useState } from 'react'
import * as Styles from './customSelect'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import ClickAwayListener from 'react-click-away-listener';


export function CustomSelectBox({ id, name, amount, unit, handleClick, isDropdownItem }) {

    return (
        <Styles.SelectionBox dropdownItem={isDropdownItem} onClick={handleClick}>
            <Styles.Logo src={algorandLogo} alt="" />
            <Styles.NameBox>
                <div className="title">{name}</div>
                <div className="subtitle">{`${unit} - ${id}`}</div>
            </Styles.NameBox>
        </Styles.SelectionBox>
    )
}

export function CustomDropdownContainer({ dropdownIsOpen, dropdownItems, setDropdownIsOpen, handleDropdownItemClick, handleSetInputValue, ...otherProps }) {

    const handleItemClick = (dropdownItem) => {
        handleDropdownItemClick(dropdownItem)
        handleSetInputValue('')
        setDropdownIsOpen(false)
    }

    return (
        <ClickAwayListener onClickAway={() => dropdownIsOpen && setDropdownIsOpen(false)}>
            <Styles.DropdownContainer open={dropdownIsOpen} { ...otherProps }>
                { dropdownItems.map(({ id, ...dropdownItemDetails }) => (
                    <CustomSelectBox 
                        key={id} 
                        id={id}
                        isDropdownItem 
                        handleClick={() => handleItemClick({ id, ...dropdownItemDetails })}
                        { ...dropdownItemDetails } 
                    />
                ))}
            </Styles.DropdownContainer>
        </ClickAwayListener>
    )
}

export function CustomSelectInput({ ...props }) {

    return (
        <Styles.Input
            { ...props }
        />
    )
}
