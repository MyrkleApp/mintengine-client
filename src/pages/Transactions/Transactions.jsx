import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './transactions'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'

function Transactions() {

    return (
        <DashboardWrapper>
            <Styles.Transactions>
                <h2>YOUR TRANSACTIONS</h2>
                <MyTabs tabs={["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]} />
            </Styles.Transactions>
            <Styles.TableBox>
                <Table />
            </Styles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
