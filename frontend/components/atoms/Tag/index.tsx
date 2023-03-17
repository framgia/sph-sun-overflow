import { HiX } from 'react-icons/hi'
type TagProps = {
    name: string
    tagId: number
    deleteTag: (id: number) => void
}

const Tag = ({ name, tagId, deleteTag }: TagProps): JSX.Element => {
    return (
        <span className="mx-1 mt-1 flex cursor-pointer flex-wrap items-center justify-between rounded-lg bg-[#fba39b] px-2 text-sm font-medium">
            <span className="break-words">{name}</span>
            <HiX
                className="bg rounded-xl hover:bg-black hover:text-white"
                onClick={() => {
                    deleteTag(tagId)
                }}
            />
        </span>
    )
}

export default Tag
