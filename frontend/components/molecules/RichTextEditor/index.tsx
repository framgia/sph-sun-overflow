import UPLOAD_IMAGE from '@/helpers/graphql/mutations/upload_image'
import { errorNotify } from '@/helpers/toast'
import { convertBase64 } from '@/utils'
import { useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useMemo, useRef, type ComponentType } from 'react'
import type { ControllerRenderProps } from 'react-hook-form'
import type { ReactQuillProps, Value } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
type RTEProps = {
    value: Value
    onChange: ControllerRenderProps['onChange']
    id: string | undefined
    usage: string | undefined
    placeholder?: string
}
interface CustomQuillProps extends ReactQuillProps {
    forwardedRef: any
}

const validAvatarTypes = ['image/png', 'image/gif', 'image/jpeg']
const formats = [
    'header',
    'color',
    'bold',
    'size',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'imagePreview',
]

const ReactQuill: ComponentType<CustomQuillProps> = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill')
        const { default: ImagePreviewBlot } = await import('@/helpers/reactQuill/imagePreview')
        const { default: CustomClipboard } = await import('@/helpers/reactQuill/customClipboard')

        RQ.Quill.register('formats/imagePreview', ImagePreviewBlot, true)
        RQ.Quill.register('modules/clipboard', CustomClipboard, true)
        const CustomQuill = ({ forwardedRef, ...props }: CustomQuillProps): JSX.Element => (
            <RQ ref={forwardedRef} {...props} />
        )
        return CustomQuill
    },
    {
        ssr: false,
    }
)

const validateImage = (img: File | null): boolean => {
    if (img === null) {
        return false
    }
    if (img instanceof File && img.size > 5 * 1024 * 1024) {
        errorNotify('File size exceeds maximum limit (5 MB)')
        return false
    }
    if (img instanceof File && !validAvatarTypes.includes(img.type)) {
        errorNotify('Not a valid File Type')
        return false
    }
    return true
}
const convertImage = async (img: File): Promise<string> => {
    return await convertBase64(img)
}

const RichTextEditor = ({
    value,
    onChange,
    id = undefined,
    usage = 'default',
    placeholder,
}: RTEProps): JSX.Element => {
    const quillRef = useRef<any>(null)
    const [uploadImage] = useMutation(UPLOAD_IMAGE)
    const imageHandler = (): void => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file: File | null = input.files ? input.files[0] : null
            if (!validateImage(file)) {
                return
            }
            const newImg = await convertImage(file as File)
            uploadImage({
                variables: {
                    img: newImg,
                },
            })
                .then((res) => {
                    const quillObj = quillRef.current.getEditor()
                    const range: number = quillObj.selection.lastRange.index
                    const imgAtt = { src: res.data.uploadImage, alt: res.data.uploadImage }
                    quillObj.insertEmbed(range + 1 ?? 0, 'imagePreview', imgAtt)
                })
                .catch((e) => {
                    errorNotify(e.message)
                })
        }
    }
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }],
                    [{ size: [] }],
                    [
                        {
                            color: ['red', 'blue', 'yellow', 'green', 'orange', 'pink', 'black'],
                        },
                    ],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    ['clean'],
                ],
                handlers: {
                    image: () => {
                        imageHandler()
                    },
                },
            },
        }
    }, [])

    let style

    switch (usage) {
        case 'dashboard':
            style = { minHeight: '100%' }
            break
        case 'about_me':
            style = { width: '100%' }
            break
        default:
            style = undefined
    }

    return (
        <ReactQuill
            forwardedRef={quillRef}
            className={`${usage}`}
            modules={modules}
            formats={formats}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            id={id}
            style={style}
        />
    )
}

export default RichTextEditor
