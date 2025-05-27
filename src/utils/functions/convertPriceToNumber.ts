export const convertPriceToNumber = (priceStr: string | number | null | undefined) => {
    if (priceStr === null || priceStr === undefined) return 0
    if (typeof priceStr === 'number') return priceStr
    return Number(priceStr.replace('.', '').replace(',', '.'))
}