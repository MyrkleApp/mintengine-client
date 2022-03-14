import React, { useEffect } from 'react'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'
import useTabs from '../../Hooks/Tabs'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import { useDispatch, useSelector } from 'react-redux'
import { getAlgorandTransactions } from '../../app/algorand/algorandSlice'
import { ThreeDots } from 'react-loader-spinner'
import { HTTP_STATUS } from '../../constants/httpStatus'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const dispatch = useDispatch()
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const { status, data } = useSelector(state => state.algorand.transactions)

    useEffect(() => {
        if (data === null) {
            dispatch(getAlgorandTransactions())
        }
    }, [data])

    const filter = {
        "All Transactions": data,
        "Algo TXNs": data?.filter(txn => txn.asset_name === 'algo'),
        "Asa TXNs": data?.filter(txn => txn.asset_name !== 'algo'),
        "Scheduled TXNs": data?.filter(txn => txn.tx_type === 'scheduled'),
    }


    const rows = filter[tabValue]?.map((item, i) => (
        <tr key={item.txid}>
            <td><a href={`https://testnet.algoexplorer.io/tx/${item.txid}`} target="_blank">{item.txid}</a></td>
            <td className="hide-on-mobile">{item.asset_name}</td>
            <td className="hide-on-mobile">{item.amount}</td>
            <td>{item.tx_type}</td>
            <td className="hide-on-mobile">{item.tx_time}</td>
        </tr>
    ))

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <SharedStyles.HeaderBox>
                <h2>TRANSACTIONS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </SharedStyles.HeaderBox>

            <SharedStyles.TableBox>

                {
                    status === HTTP_STATUS.PENDING ? (
                        <SharedStyles.LoaderContainer>
                            <ThreeDots height="250" width="250" color='gray' />
                        </SharedStyles.LoaderContainer>
                    ) : (
                        <Table
                            columnTitles={['transaction id', 'asset name', 'amount', 'txn type', 'date']}
                            columnsToHideOnMobile={[1, 2, 4]}
                            rows={rows}
                            noDataTitle="NO TRANSACTIONS YET"
                            noDataText="You don’t have any transaction that can be displayed yet."
                        />
                    )
                }

            </SharedStyles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
