export const NORMAL_TXN = 'Transfer'
export const MULTIPLE_TXN = 'Multiple Transfer'
export const SCHEDULED_TXN = 'Scheduled Transfer'

export const formattedTime = time => {
    const year = time.getFullYear()
    const month = (time.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const dayOfMonth = time.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const hours = time.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    const minutes = time.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})

    return `${year}-${month}-${dayOfMonth}T${hours}:${minutes}:00Z`
}

export const getTimeZone = time => time.toString().split(' ')[5]