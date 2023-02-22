import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form'
import { ComponentType } from 'react'
import { ReactQuillProps, Value } from 'react-quill'
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
    (): Promise<any> => import('react-quill'),
    { ssr: false }
)
const RichTextEditor = ({ value, onChange, id = undefined, usage = 'default' }: RTEProps) => {
    let style

    switch (usage) {
        case 'description':
            style = { height: '10rem' }
            break
        case 'content':
            style = { width: '50rem' }
            break
        default:
            style = undefined
    }

    return (
        <ReactQuill
            className=""
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
