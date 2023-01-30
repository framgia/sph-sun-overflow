import SidebarButton from '../../molecules/SidebarButton'
import { useRouter } from 'next/router'

const LeftSidebar = (): JSX.Element => {
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
            url: '/user',
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
        <ul className="flex h-full shrink flex-col border-r-4 border-secondary-gray bg-white pt-32 lg:-ml-4 ">
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

export default LeftSidebar
