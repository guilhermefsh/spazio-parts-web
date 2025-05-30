export const formatDeliveryTime = (min: number, max: number) => {
    if (min === max) {
        return `${min} dia${min !== 1 ? 's' : ''} útil`
    }
    return `${min} a ${max} dias úteis`
}