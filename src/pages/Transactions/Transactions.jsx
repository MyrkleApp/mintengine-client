import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './transactions'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'
import useTabs from '../../Hooks/Tabs'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const { tabValue, handleTabChange } = useTabs(tabs[0])

    return (
        <DashboardWrapper>
            <Styles.Transactions>
                <h2>YOUR TRANSACTIONS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </Styles.Transactions>
            <Styles.TableBox>
                <Table />
            </Styles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
