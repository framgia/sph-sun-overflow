import { HiBookmark, HiHome, HiCode, HiUsers, HiOutlineUser, HiUserGroup } from 'react-icons/hi'

type SidebarIconProps = {
    name: string
    size: number
}

const SidebarIcon = ({ name, size }: SidebarIconProps): JSX.Element => {
    switch (name) {
        case 'Bookmark':
            return <HiBookmark size={size} />
        case 'Questions':
            return <HiHome size={size} />
        case 'Roles':
            return <HiOutlineUser size={size} />
        case 'Tags':
            return <HiCode size={size} />
        case 'Teams':
            return <HiUsers size={size} />
        case 'Users':
            return <HiUserGroup size={size} />
        default:
            return <></>
    }
}

export default SidebarIcon
