import { successNotify } from './toast'

const copyLink = async (link: string, message: string = 'Copied to clipboard!'): Promise<void> => {
    await navigator.clipboard.writeText(link)

    successNotify(message)
}

export default copyLink
