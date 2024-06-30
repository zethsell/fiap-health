import moment from 'moment'

export function toDateTime(date?: string): string {
    return moment(date).format('YYYY-MM-DDThh:mm')
}

export function toBDDate(date?: string): string {
    return moment(date).format('YYYY-MM-DD hh:mm:ss')
}