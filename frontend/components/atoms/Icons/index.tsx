import { FaLock, FaLockOpen } from 'react-icons/fa'
import {
    HiBookmark,
    HiCheckCircle,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
    HiChevronLeft,
    HiChevronRight,
    HiEye,
    HiOutlineEye,
    HiOutlinePencilAlt,
    HiOutlineSearch,
    HiOutlineShare,
    HiOutlineTrash,
    HiPaperAirplane,
    HiPencilAlt,
    HiX,
    HiXCircle,
} from 'react-icons/hi'
import { HiCheck, HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import ChevronIcon from './Chevron'
import DotsIcon from './Dots'
import EyeIcon from './Eye'
import GridIcon from './Grid'
import ListIcon from './List'
import LockIcon from './Lock'
import ThumbUpIcon from './ThumbUp'
import UnlockIcon from './Unlock'
import UsersIcon from './Users'

type IconsProps = {
    name: string
    size?: string
    additionalClass?: string
}

const Icons = ({ name, size = '20', additionalClass = '' }: IconsProps): JSX.Element => {
    switch (name) {
        case 'pencil':
            return (
                <HiOutlinePencilAlt size={size} className={`cursor-pointer ${additionalClass}`} />
            )
        case 'eye':
            return <HiOutlineEye size={size} className="cursor-pointer" />
        case 'trash':
            return <HiOutlineTrash size={size} className={`cursor-pointer ${additionalClass}`} />
        case 'close':
            return <HiX size={size} className="cursor-pointer" />
        case 'dot':
            return <img src="/svg/Dot.svg" alt="Dot" className="text-[#5F5F5F]" />
        case 'square_edit':
            return <HiPencilAlt size="28" className="cursor-pointer fill-primary-red" />
        case 'vote_up':
            return <HiChevronUp size="16" className={`cursor-pointer ${additionalClass}`} />
        case 'vote_down':
            return <HiChevronDown size="16" className={`cursor-pointer ${additionalClass}`} />
        case 'bookmark_outline':
            return (
                <HiBookmark
                    size="16"
                    className="cursor-pointer fill-white stroke-neutral-900 stroke-2 hover:fill-primary-base hover:stroke-primary-base"
                />
            )
        case 'bookmark_fill':
            return (
                <HiBookmark
                    size="16"
                    className="cursor-pointer fill-primary-base stroke-primary-base stroke-2"
                />
            )
        case 'pill_eye':
            return <HiEye size="13" />
        case 'check_fill':
            return <HiCheck size="25" className="fill-green-500" />
        case 'check_outline':
            return <HiCheck size="25" className="fill-white stroke-black stroke-1" />
        case 'check_circle_fill':
            return <HiCheckCircle size={size} className={`cursor-pointer ${additionalClass}`} />
        case 'x_circle_fill':
            return <HiXCircle size={size} className={`cursor-pointer ${additionalClass}`} />
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
        case 'search':
            return <HiOutlineSearch size={size} className={`${additionalClass}`} />
        case 'x-plain':
            return <HiX size={size} className={`${additionalClass}`} />
        case 'private':
            return <FaLock />
        case 'public':
            return <FaLockOpen />
        case 'share':
            return <HiOutlineShare size={size} className={`cursor-pointer ${additionalClass}`} />
        case 'send':
            return (
                <HiPaperAirplane
                    size={size}
                    className={`rotate-90 cursor-pointer ${additionalClass}`}
                />
            )
        default:
            return <></>
    }
}

export const CustomIcons = {
    ChevronIcon,
    DotsIcon,
    EyeIcon,
    GridIcon,
    ListIcon,
    LockIcon,
    ThumbUpIcon,
    UnlockIcon,
    UsersIcon,
}

export default Icons
