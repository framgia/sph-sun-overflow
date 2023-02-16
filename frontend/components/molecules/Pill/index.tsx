import Icons from '@/components/atoms/Icons'

type PillProps = {
    name: string
    is_tag: boolean
}

const Pill = ({ name, is_tag }: PillProps): JSX.Element => {
    return (
        <div className="flex min-w-fit flex-row items-center gap-1 rounded-full bg-red-300 py-1 px-3 text-xs font-normal">
            {is_tag ? <Icons name="pill_eye" /> : ''}
            <span>{name}</span>
        </div>
    )
}

export default Pill
