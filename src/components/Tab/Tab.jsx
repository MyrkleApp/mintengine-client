import React, { useState } from 'react'
import * as Styles from './tab'

const tabs = ['Normal TXN', 'Multiple TXN', 'Scheduled TXN']

function Tab() {

    return (
        <Styles.Root>
        {
            tabs.map((item, i) => (
                <Styles.TabItem key={i}>
                    { item }
                </Styles.TabItem>
            ))
        }
        </Styles.Root>
    )
}

export default Tab
