import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
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
]
const ReactQuill: ComponentType<ReactQuillProps> = dynamic(
    async (): Promise<any> => await import('react-quill'),
    { ssr: false }
)
const RichTextEditor = ({
    value,
    onChange,
    id = undefined,
    usage = 'default',
    placeholder,
}: RTEProps): JSX.Element => {
    const modules = {
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
                // Future image handler
                // image: ()=>{
                // }
            },
        },
    }

    let style

    switch (usage) {
        case 'dashboard':
            style = { minHeight: '100%' }
            break
        case 'content':
            style = { width: '100%', height: '168px' }
            break
        case 'about_me':
            style = { width: '100%' }
            break
        default:
            style = undefined
    }

    return (
        <ReactQuill
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
