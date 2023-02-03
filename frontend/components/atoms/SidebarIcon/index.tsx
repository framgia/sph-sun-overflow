import { HiBookmark, HiHome, HiCode, HiUsers, HiOutlineUser, HiUserGroup } from 'react-icons/hi'

type SidebarIconProps = {
    name: string
}

const SidebarIcon = ({ name }: SidebarIconProps): JSX.Element => {
    switch (name) {
        case 'Bookmark':
            return <HiBookmark />
        case 'Questions':
            return <HiHome />
        case 'Roles':
            return <HiOutlineUser />
        case 'Tags':
            return <HiCode />
        case 'Teams':
            return <HiUsers />
        case 'Users':
            return <HiUserGroup />
        default:
            return <></>
    }
}

export default SidebarIcon
