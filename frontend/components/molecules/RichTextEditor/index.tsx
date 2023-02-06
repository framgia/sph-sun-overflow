import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { UseFormSetValue } from 'react-hook-form'
import { ComponentType } from 'react'
import { ReactQuillProps } from 'react-quill'
type RTEProps = {
    setValue: UseFormSetValue<any>
    id: string | undefined
    usage: string | undefined
}

const modules = {
    toolbar: [
        [
            { header: [1, 2, false] },
            {
                color: ['red', 'blue', 'yellow', 'green', 'orange', 'pink', 'black'],
            },
        ],

        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'clean'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            'link',
            'image',
        ],
    ],
}
const formats = [
    'header',
    'color',
    'bold',
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
const RichTextEditor = ({ setValue, id = undefined, usage = 'default' }: RTEProps) => {
    const handleEditor = (editor: string) => {
        setValue('description', editor)
    }
    let style

    switch (usage) {
        case 'description':
            style = { height: '10rem' }
            break
        default:
            style = undefined
    }

    return (
        <ReactQuill
            className=""
            modules={modules}
            formats={formats}
            onChange={handleEditor}
            id={id}
            style={style}
        />
    )
}

export default RichTextEditor
