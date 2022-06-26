import { humanize } from './'

export default function exportCSV(data: Array<Object>, fileName: string) {
    const csv: Array<string> = []
    const downloadLink: HTMLAnchorElement = document.createElement("a")

    data.forEach((row: any, index: number) => {
        const fields: Array<string> = Object.keys(row)
        const keyList: Array<string> = fields
            .filter((key: string) => typeof row[key] !== 'object')

        if (index !== 0) {
            csv.push('\n')
            csv.push('\n')
        }

        csv.push(...getRow(row, index))
        fields.forEach((field: string) => {
            if (!keyList.includes(field)) {
                csv.push(humanize(field) + '\n')

                if (Array.isArray(row[field])) {
                    row[field].forEach((newRow: object, counter: number) => {
                        csv.push(...getRow(newRow, counter))
                    })
                }
            }
        })
    })

    const CSVFile = new Blob(csv, { type: 'text/csv' })
    downloadLink.download = fileName
    downloadLink.href = window.URL.createObjectURL(CSVFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
}

function getRow(row: any, index: number) {
    const a: Array<string> = []
    const fields: Array<string> = Object.keys(row)
    const keyList: Array<string> = fields
        .filter((key: string) => typeof row[key] !== 'object')

    if (index === 0)
        a.push(keyList.map((key: string) => humanize(key)).join(',') + '\n')

    a.push(keyList.map((key: string) => row[key])
        .filter(value => typeof value !== 'object')
        .join(',') + '\n')
    return a
}