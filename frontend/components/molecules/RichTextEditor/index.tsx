import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import type { ControllerRenderProps } from 'react-hook-form'
import type { ComponentType } from 'react'
import type { ReactQuillProps, Value } from 'react-quill'
type RTEProps = {
    value: Value
    onChange: ControllerRenderProps['onChange']
    id: string | undefined
    usage: string | undefined
}

const modules = {
    toolbar: [
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
}: RTEProps): JSX.Element => {
    let style

    switch (usage) {
        case 'description':
            style = { height: '10rem' }
            break
        case 'dashboard':
            style = { minHeight: '100%' }
            break
        case 'content':
            style = { width: '100%' }
            break
        case 'about_me':
            style = { width: '100%' }
            break
        default:
            style = undefined
    }

    return (
        <ReactQuill
            className="flex flex-col"
            modules={modules}
            formats={formats}
            onChange={onChange}
            value={value}
            id={id}
            style={style}
        />
    )
}

export default RichTextEditor
