import client from '@/plugins/apollo-client'
import { convertBase64 } from '@/utils'
import Quill from 'quill'
import UPLOAD_IMAGE from '../graphql/mutations/upload_image'
import { errorNotify } from '../toast'
const Clipboard = Quill.import('modules/clipboard')
const validAvatarTypes = ['image/png', 'image/gif', 'image/jpeg']

const convertImage = async (img: File): Promise<string> => {
    return await convertBase64(img)
}
const uploadImage = async (newImg: string): Promise<string> => {
    return await client
        .mutate({
            mutation: UPLOAD_IMAGE,
            variables: {
                img: newImg,
            },
        })
        .then((res) => {
            return res.data.uploadImage
        })
        .catch((e) => {
            errorNotify(e.message)
            return {}
        })
}
class CustomClipboard extends Clipboard {
    async onPaste(event: ClipboardEvent): Promise<void> {
        if (event.clipboardData?.types.includes('Files')) {
            event.preventDefault()
            const file = event.clipboardData.files[0]
            if (file instanceof File && file.size > 5 * 1024 * 1024) {
                errorNotify('File size exceeds maximum limit (5 MB)')
                return
            }
            if (file instanceof File && !validAvatarTypes.includes(file.type)) {
                errorNotify('Not a valid File Type')
                return
            }
            const newImg = await convertImage(file)
            const imgHtml = await uploadImage(newImg)
            const imgAtt = { alt: imgHtml, src: imgHtml }
            const range: number = this.quill.selection.lastRange.index
            this.quill.insertEmbed(range + 1 ?? 0, 'imagePreview', imgAtt)
        }
    }
}

export default CustomClipboard
