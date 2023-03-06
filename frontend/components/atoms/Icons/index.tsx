import {
    HiPencilAlt,
    HiBookmark,
    HiEye,
    HiChevronDown,
    HiSearch,
    HiX,
    HiTrash,
} from 'react-icons/hi'
import { HiCheck } from 'react-icons/hi2'
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdCheckmark } from 'react-icons/io'
import { MdOutlineModeEditOutline, MdModeEditOutline } from 'react-icons/md'
import { FaTrashAlt, FaLockOpen, FaLock } from 'react-icons/fa'
import {
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
    HiChevronLeft,
    HiChevronRight,
} from 'react-icons/hi'

type IconsProps = {
    name: string
    size?: string
    additionalClass?: string
}

const Icons = ({ name, size = '20', additionalClass }: IconsProps): JSX.Element => {
    switch (name) {
        case 'table_edit':
            return <MdModeEditOutline size={22} className="fill-primary-red" />
        case 'table_delete':
            return <HiTrash size={22} className="fill-primary-red" />
        case 'square_edit':
            return <HiPencilAlt size="28" className="cursor-pointer fill-primary-red" />
        case 'vote_up':
            return (
                <IoMdArrowDropup
                    viewBox="120 260 260 100"
                    size="20"
                    className={`cursor-pointer ${additionalClass}`}
                />
            )
        case 'vote_down':
            return (
                <IoMdArrowDropdown
                    viewBox="120 140 260 100"
                    size="20"
                    className={`cursor-pointer ${additionalClass}`}
                />
            )
        case 'bookmark_outline':
            return (
                <HiBookmark
                    viewBox="3 1 13 17"
                    style={{ height: '30', width: '20' }}
                    className="cursor-pointer fill-white stroke-black stroke-[0.07rem] hover:fill-green-500 hover:stroke-green-500"
                />
            )
        case 'bookmark_fill':
            return (
                <HiBookmark
                    viewBox="3 1 13 17"
                    style={{ height: '30', width: '20' }}
                    className="cursor-pointer fill-green-500 hover:fill-red-500"
                />
            )
        case 'pill_eye':
            return <HiEye size="13" />
        case 'check_fill':
            return <HiCheck size="25" className="fill-green-500" />
        case 'check_outline':
            return <HiCheck size="25" className="fill-white stroke-black stroke-1" />

        case 'cross_fill':
            return <HiX size="25" className="fill-red-500" />
        case 'edit':
            return <MdOutlineModeEditOutline size="16" color="red" />
        case 'dropdown':
            return <HiChevronDown size="20" color="gray" />
        case 'filter_date_up':
            return (
                <IoMdArrowDropup viewBox="120 260 260 100" size="10" className="cursor-pointer" />
            )
        case 'filter_date_down':
            return (
                <IoMdArrowDropdown viewBox="120 140 260 100" size="10" className="cursor-pointer" />
            )
        case 'chevron_left':
            return <HiChevronLeft />
        case 'chevron_left_double':
            return <HiChevronDoubleLeft />
        case 'chevron_right':
            return <HiChevronRight />
        case 'chevron_right_double':
            return <HiChevronDoubleRight />
        case 'search_input_icon':
            return <HiSearch size="26" />
        case 'x-plain':
            return <HiX size={size} className={`${additionalClass}`} />
        case 'private':
            return <FaLock />
        case 'public':
            return <FaLockOpen />
        default:
            return <></>
    }
}

export default Icons
