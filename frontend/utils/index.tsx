interface LooseObject {
    id: number
}
export function removeItemViaId<T extends LooseObject>(arr: Array<T>, value: number): Array<T> {
    const arrCopy = Array.from(arr)
    const index = arrCopy.findIndex((item) => item.id === value)
    arrCopy.splice(index, 1)
    return arrCopy
}

export function isObjectEmpty(obj: Object): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}
