import React, { Fragment, useState } from 'react'
import * as Styles from './decimalDropdown'
import FormControl from '../FormControl/FormControl'
import ClickAwayListener from 'react-click-away-listener';

function DecimalDropdown({ value, handleClick }) {
    const [displayDropdown, setDisplayDropdown] = useState(false)

    const handleDecimalInputClick = () => {
        setDisplayDropdown(prevState => !prevState)
    }

    const handleClickAway = () => {
        setDisplayDropdown(false)
    }

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    <FormControl 
                        type="text"
                        label="Decimal"
                        value={value}
                        readOnly
                        handleClick={handleDecimalInputClick}
                        center
                    />
                    <Styles.Root displayDropdown={displayDropdown}>
                        <div className="container">
                            {
                                Array(19).fill().map((_, i) => (
                                    <Styles.DecimalDropdownItem key={i} onClick={() => handleClick(i + 1)}>
                                        { i + 1}
                                    </Styles.DecimalDropdownItem>
                                ))
                            }
                        </div>
                    </Styles.Root>
                </div>
            </ClickAwayListener>
        </Fragment>
        
    )
}

export default DecimalDropdown