import { HiBookmark, HiCode, HiHome, HiOutlineUser, HiUserGroup, HiUsers } from 'react-icons/hi'
import { IoIosSettings } from 'react-icons/io'

type SidebarIconProps = {
    name: string
}

const SidebarIcon = ({ name }: SidebarIconProps): JSX.Element => {
    switch (name) {
        case 'Bookmark':
            return <HiBookmark className="text-2xl" />
        case 'Questions':
            return <HiHome className="text-2xl" />
        case 'Roles':
            return <HiOutlineUser className="text-2xl" />
        case 'Tags':
            return <HiCode className="text-2xl" />
        case 'Teams':
            return <HiUsers className="text-2xl" />
        case 'Users':
            return <HiUserGroup className="text-2xl" />
        case 'manage':
            return <IoIosSettings className="text-2xl" />
        default:
            return <></>
    }
}

export default SidebarIcon
