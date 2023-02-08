import { HiPencilAlt, HiBookmark, HiEye, HiChevronDown } from 'react-icons/hi'
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { HiCheck } from 'react-icons/hi'
type IconsProps = {
    name: string
}

const Icons = ({ name }: IconsProps): JSX.Element => {
    switch (name) {
        case 'square_edit':
            return <HiPencilAlt size="28" className="cursor-pointer fill-primary-red" />
        case 'vote_up':
            return (
                <IoMdArrowDropup viewBox="120 260 260 100" size="20" className="cursor-pointer" />
            )
        case 'vote_down':
            return (
                <IoMdArrowDropdown viewBox="120 140 260 100" size="20" className="cursor-pointer" />
            )
        case 'bookmark_outline':
            return (
                <HiBookmark
                    viewBox="3 1 13 17"
                    style={{ height: '30', width: '20' }}
                    className="cursor-pointer fill-white stroke-black stroke-[0.07rem]"
                />
            )
        case 'bookmark_fill':
            return (
                <HiBookmark
                    viewBox="3 1 13 17"
                    style={{ height: '30', width: '20' }}
                    className="cursor-pointer fill-green-600"
                />
            )
        case 'pill_eye':
            return <HiEye size="13" />
        case 'check_fill':
            return <HiCheck size="25" className="fill-green-500" />
        case 'check_outline':
            return <HiCheck size="25" className="fill-white stroke-black stroke-1" />
        case 'edit':
            return <MdOutlineModeEditOutline size="16" color="red" />
        case 'dropdown':
            return <HiChevronDown size="20" color="gray" />
        default:
            return <></>
    }
}

export default Icons
