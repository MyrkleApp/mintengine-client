import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'
import useTabs from '../../Hooks/Tabs'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const { tabValue, handleTabChange } = useTabs(tabs[0])

    return (
        <DashboardWrapper>
            <SharedStyles.HeaderBox>
                <h2>YOUR TRANSACTIONS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </SharedStyles.HeaderBox>
            <SharedStyles.TableBox>
                <Table />
            </SharedStyles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
