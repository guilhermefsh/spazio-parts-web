export const convertPriceToNumber = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr
    return Number(priceStr.replace('.', '').replace(',', '.'))
}