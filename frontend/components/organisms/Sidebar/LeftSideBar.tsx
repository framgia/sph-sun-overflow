import SidebarButton from '../../molecules/SidebarButton'

const LeftSideBar = (): JSX.Element => {
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
                {
                    IconName: 'Users',
                    Text: 'Users',
                    url: 'manage/users',
                },
            ],
        },
    ]

    const renderSidebarList = (): JSX.Element[] => {
        return SidebarLinks.map((link, index) => {
            const { IconName, Text, url, subMenu } = link

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

    return <ul className="h-full w-full bg-primary-red text-white">{renderSidebarList()}</ul>
}

export default LeftSideBar
