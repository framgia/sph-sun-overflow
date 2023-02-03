interface LooseObject {
    id: number
}
export function removeItemViaId<T extends LooseObject>(arr: Array<T>, value: number): Array<T> {
    const index = arr.findIndex((item) => item.id === value)
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr
}

export function isObjectEmpty(obj: Object): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}
