import {
    HiCode,
    HiCog,
    HiHashtag,
    HiOutlineSwitchHorizontal,
    HiOutlineSwitchVertical,
    HiUser,
} from 'react-icons/hi'

type SidebarIconProps = {
    name: string
}

const SidebarIcon = ({ name }: SidebarIconProps): JSX.Element => {
    switch (name) {
        case 'Questions':
            return <HiCode className="h-4 w-4" />
        case 'Roles':
            return <HiOutlineSwitchVertical className="h-4 w-4" />
        case 'Tags':
            return <HiHashtag className="h-4 w-4" />
        case 'Teams':
            return <HiOutlineSwitchHorizontal className="h-4 w-4" />
        case 'Users':
            return <HiUser className="h-4 w-4" />
        case 'manage':
            return <HiCog className="h-4 w-4" />
        default:
            return <></>
    }
}

export default SidebarIcon
