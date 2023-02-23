interface LooseObject {
    id: number
}
export function removeItemViaId<T extends LooseObject>(arr: Array<T>, value: number): Array<T> {
    return arr.filter((obj) => obj.id !== value)
}

export function isObjectEmpty(obj: Object): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}
