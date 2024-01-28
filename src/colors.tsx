const convert = "0123456789abcdef"
export const digitToHex=(value:number):string => (0<=value&&value<=255)?convert[Math.floor(value/16)]+convert[Math.floor(value%16)]:"ff"
export const asHexRGB=(value1:number,value2:number,value3:number):string => "#"+digitToHex(value1)+digitToHex(value2)+digitToHex(value3)
