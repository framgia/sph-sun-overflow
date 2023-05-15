import { type ComponentType } from 'react'
import type { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

import { parseImage } from '@/components/organisms/QuestionForm'
import dynamic from 'next/dynamic'
const ReactQuill: ComponentType<ReactQuillProps> = dynamic(
    async (): Promise<any> => await import('react-quill'),
    { ssr: false }
)

type PreviewProps = {
    value: string
}

const EditorPreview = ({ value = 'Nothing to Preview' }: PreviewProps): JSX.Element => {
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !value.includes('<img')) {
        value = 'Nothing to Preview'
    }

    const replacedStr = parseImage(value)
    return <ReactQuill value={replacedStr} readOnly={true} modules={{ toolbar: false }} />
}
export default EditorPreview
