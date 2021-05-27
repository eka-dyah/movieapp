export const decimalPlace = (number, numOfDecimal = 1) => {
    return Number(number).toFixed(numOfDecimal);
}