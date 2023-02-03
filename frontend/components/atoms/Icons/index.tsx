import { HiPencilAlt, HiOutlineBookmark, HiBookmark, HiEye } from 'react-icons/hi'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'

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
        default:
            return <></>
    }
}

export default Icons
