import SidebarButton from '../../molecules/SidebarButton'
import { useRouter } from 'next/router'

const LeftSideBar = (): JSX.Element => {
    const router = useRouter()

    const isSelected = (url: string): boolean => {
        if (router.asPath === url) {
            return true
        }
        return false
    }

    const SidebarLinks = [
        {
            IconName: 'Questions',
            Text: 'Questions',
            url: '/questions',
        },
        {
            IconName: 'Roles',
            Text: 'Roles',
            url: '/roles',
        },
        {
            IconName: 'Users',
            Text: 'Users',
            url: '/users',
        },
        {
            IconName: 'Tags',
            Text: 'Tags',
            url: '/tags',
        },
        {
            IconName: 'Teams',
            Text: 'Teams',
            url: '/teams',
        },
    ]

    return (
        <ul className="h-full w-full border-r-4 border-gray-300 bg-white pt-4">
            {SidebarLinks.length > 0 &&
                SidebarLinks.map((link, index) => {
                    let { IconName, Text, url } = link
                    return (
                        <SidebarButton
                            key={index}
                            IconName={IconName}
                            Text={Text}
                            isSelected={isSelected(url)}
                            url={url}
                        />
                    )
                })}
        </ul>
    )
}

export default LeftSideBar
