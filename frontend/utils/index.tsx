interface LooseObject {
    id: number
}

interface LooseObject2 {
    first_name: string
}

export function removeItemViaId<T extends LooseObject>(arr: Array<T>, value: number): Array<T> {
    return arr.filter((obj) => obj.id !== value)
}

export function isObjectEmpty(obj: Object): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}

export function compareFirstName(a: LooseObject2, b: LooseObject2) {
    if (a.first_name < b.first_name) {
        return -1
    }
    if (a.first_name > b.first_name) {
        return 1
    }
    return 0
}
