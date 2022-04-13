import React, { useEffect } from 'react'
import * as Styles from './customSelect'
import ClickAwayListener from 'react-click-away-listener';
import { HTTP_STATUS } from '../../constants/httpStatus';
import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from '../../pages/Exchange/exchange';
import { useDispatch, useSelector } from 'react-redux';
import { getAlgorandHoldings } from '../../app/algorand/algorandSlice';
import useCheckImageExists from '../../Hooks/checkImageExists';


export function CustomSelectBox({ id, name, amount, unit, handleClick, isDropdownItem }) {
    const { tinyManAssetImage } = useCheckImageExists({ id })

    return (
        <Styles.SelectionBox dropdownItem={isDropdownItem} onClick={handleClick}>
            <Styles.Logo src={tinyManAssetImage} alt="" />
            <Styles.NameBox>
                <div className="title">{name}</div>
                <div className="subtitle">{`$${unit} ${id !== 0 ? '-' : ''} ${id !== 0 ? id : ''} `}</div>
            </Styles.NameBox>
        </Styles.SelectionBox>
    )
}

export function CustomDropdownContainer({ dropdownIsOpen, dropdownItems, setDropdownIsOpen, handleDropdownItemClick, handleSetInputValue, searchStatus, ...otherProps }) {
    
    const dispatch = useDispatch()
    const { status: holdingsStatus } = useSelector(state => state.algorand.holdings)

    const handleItemClick = (dropdownItem) => {
        handleDropdownItemClick(dropdownItem)
        handleSetInputValue('')
        setDropdownIsOpen(false)
    }

    useEffect(() => {
        if (dropdownIsOpen && (holdingsStatus === null)) {
            dispatch(getAlgorandHoldings())
        }
    }, [dropdownIsOpen])

    return (
        <ClickAwayListener onClickAway={() => dropdownIsOpen && setDropdownIsOpen(false)}>
            <Styles.DropdownContainer open={dropdownIsOpen} { ...otherProps }>
                { dropdownItems.length > 0 ? dropdownItems.map(({ id, ...dropdownItemDetails }) => (
                    <CustomSelectBox 
                        key={id} 
                        id={id}
                        isDropdownItem 
                        handleClick={() => handleItemClick({ id, ...dropdownItemDetails })}
                        { ...dropdownItemDetails } 
                    />
                )) : (
                    <LoaderContainer>
                        <span>No assets found</span>
                    </LoaderContainer>
                )}


                { ((holdingsStatus === HTTP_STATUS.PENDING) || (searchStatus === HTTP_STATUS.PENDING)) ? (
                    <LoaderContainer>
                        <ThreeDots
                            height="30"
                            width="150"
                            color='gray'
                            ariaLabel='loading'
                        />
                    </LoaderContainer>
                ) : null }
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
