interface LooseObject {
    id: number
}

export function removeItemViaId<T extends LooseObject>(arr: T[], value: number): T[] {
    return arr.filter((obj) => obj.id !== value)
}

export function isObjectEmpty(obj: Record<string, any>): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}
