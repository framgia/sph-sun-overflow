interface LooseObject {
    id: number
}

export function removeItemViaId<T extends LooseObject>(arr: T[], value: number): T[] {
    return arr.filter((obj) => obj.id !== value)
}

export function isObjectEmpty(obj: Record<string, any>): boolean {
    return obj === undefined ? true : Object.keys(obj).length === 0
}

export function capitalize(tempStr: string | undefined): string | undefined {
    if (tempStr) {
        return tempStr.charAt(0).toUpperCase() + tempStr.slice(1)
    }
    return undefined
}

export async function convertBase64(file: File): Promise<string> {
    return await new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result as string)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export function stripHtmlTags(str: string): string {
    return str
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/<\/?(p|br|strong)[^>]*>/gi, '')
        .replace(/&[a-z]+;/gi, '')
}
