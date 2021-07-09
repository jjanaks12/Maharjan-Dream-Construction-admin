import moment from "moment"

const formatDate = (date: string | undefined): string => {
    const diffDays = moment(date).diff(moment(), 'days')

    if (diffDays >= 7)
        return moment(date).format('DD/MM/YYYY')
    else if (diffDays < 1)
        return moment(date).fromNow()
    else if (diffDays < 7)
        return diffDays + 'days ago'
    else
        return ''
}

export default formatDate