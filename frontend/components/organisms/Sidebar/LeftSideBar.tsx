import SidebarButton from '../../molecules/SidebarButton'
import { useRouter } from 'next/router'

const LeftSideBar = (): JSX.Element => {
    const router = useRouter()

    type SideBarType = {
        IconName: string
        Text: string
        url: string
    }

    const SidebarLinks = [
        {
            IconName: 'Questions',
            Text: 'Questions',
            url: 'questions',
        },
        {
            IconName: 'Users',
            Text: 'Users',
            url: 'users',
        },
        {
            IconName: 'Tags',
            Text: 'Tags',
            url: 'tags',
        },
        {
            IconName: 'Teams',
            Text: 'Teams',
            url: 'teams',
        },
        {
            IconName: 'manage',
            Text: 'Manage',
            url: 'manage',
            subMenu: [
                {
                    IconName: 'Tags',
                    Text: 'Tags',
                    url: 'manage/tags',
                },
                {
                    IconName: 'Teams',
                    Text: 'Teams',
                    url: 'manage/teams',
                },
                {
                    IconName: 'Roles',
                    Text: 'Roles',
                    url: 'manage/roles',
                },
            ],
        },
    ]

    const renderSidebarList = () => {
        return SidebarLinks.map((link, index) => {
            let { IconName, Text, url, subMenu } = link

            return (
                <SidebarButton
                    key={index}
                    IconName={IconName}
                    Text={Text}
                    subMenu={subMenu}
                    url={`/${url}`}
                />
            )
        })
    }

    return (
        <ul className="h-full w-full border-r-4 border-gray-300 bg-white pt-4">
            {renderSidebarList()}
        </ul>
    )
}

export default LeftSideBar
