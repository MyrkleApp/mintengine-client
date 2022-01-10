import { Grid } from '@mui/material'
import React, { useState } from 'react'
import * as Styles from './selectInput'
import Select from 'react-select'

const options = [
    { value: 'all', label: 'All' },
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'specialty', label: 'Specialty' },
]

function SelectInput({ half }) {
    const [selection, setSelection] = useState({ value: 'all', label: 'All' })

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root>
                <label>Amount</label>
                <div className="container">
                    <Select
                        value={{ label: selection.label }}
                        onChange={option => setSelection(option)}
                        options={options}
                        isSearchable={false}
                        // style={{ zIndex: '10' }}
                        className="select"
                    />
                    <input type="text"/>
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default SelectInput
