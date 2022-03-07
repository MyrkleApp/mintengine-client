import React, { Fragment, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAlgorandHoldings } from '../../app/algorand/algorandSlice'
import Table from '../../components/Table/Table'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import { HTTP_STATUS } from '../../constants/httpStatus'


function CreatedAssetsAlgo() {
    const dispatch = useDispatch()
    const { status, data } = useSelector(state => state.algorand.holdings)

    useEffect(() => {
        if ((data === null) && (status !== HTTP_STATUS.PENDING)) {
            dispatch(getAlgorandHoldings())
        }
    }, [data])

    const rows = data?.assets?.map((item, i) => (
        <tr key={i}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.unit}</td>
            <td>{item.url}</td>
            <td>{item.date}</td>
        </tr>
    ))

    return (
        <Fragment>
            {
                status === HTTP_STATUS.PENDING ? (
                    <SharedStyles.LoaderContainer>
                        <ThreeDots height="250" width="250" color='gray' />
                    </SharedStyles.LoaderContainer>
                ) : (
                    <Table
                        columnTitles={['asset id', 'asset name', 'unit', 'url', 'date']}
                        rows={rows}
                        noDataTitle="NO ASSET MANAGEMENT ACTIVITY YET"
                        noDataText="You don’t have any activity that can be displayed yet."
                    /> 
                )
            }
        </Fragment>
    )
}

export default CreatedAssetsAlgo