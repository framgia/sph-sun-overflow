import type { ComponentType } from 'react'
import type { ReactQuillProps, Value } from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

import dynamic from 'next/dynamic'
const ReactQuill: ComponentType<ReactQuillProps> = dynamic(
    async (): Promise<any> => await import('react-quill'),
    { ssr: false }
)
type PreviewProps = {
    value: Value
}

const EditorPreview = ({ value }: PreviewProps): JSX.Element => {
    return <ReactQuill value={value} readOnly={true} modules={{ toolbar: false }} />
}
export default EditorPreview
