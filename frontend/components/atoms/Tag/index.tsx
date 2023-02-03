import { HiX } from 'react-icons/hi'
type TagProps = {
    title: string
    tagId: number
    deleteTag: (id: number) => void
}

const Tag = ({ title, tagId, deleteTag }: TagProps) => {
    return (
        <span className="m-1 flex cursor-pointer flex-wrap items-center justify-between rounded-lg bg-[#fba39b] py-2 pl-2 pr-2 text-sm font-medium">
            <span className="break-words pr-2">{title}</span>
            <HiX
                className="bg rounded-xl hover:bg-black hover:text-white"
                onClick={() => deleteTag(tagId)}
            />
        </span>
    )
}

export default Tag
