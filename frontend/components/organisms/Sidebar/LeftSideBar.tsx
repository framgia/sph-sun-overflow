import { useBoundStore } from '@/helpers/store'
import { groupBy, has, mapValues } from 'lodash'
import SidebarButton from '../../molecules/SidebarButton'

type TLink = {
    IconName: string
    Text: string
    url: string
    subMenu?: TLink[]
}

const LeftSideBar = (): JSX.Element => {
    const permissions = useBoundStore((state) => state.permissions)
    const groupedPermissions = mapValues(groupBy(permissions, 'category'), (permissions) =>
        permissions.map((permission) => permission.name)
    )
    const checkPermission = (permission: string | undefined): boolean =>
        permission ? has(groupedPermissions, permission) : false

    const renderAdminLinks = (): TLink => {
        const allowedLinks = []
        if (checkPermission('User')) {
            allowedLinks.push({
                IconName: 'Users',
                Text: 'Users',
                url: 'manage/users',
            })
        }
        if (checkPermission('Team')) {
            allowedLinks.push({
                IconName: 'Teams',
                Text: 'Teams',
                url: 'manage/teams',
            })
        }
        if (checkPermission('Role')) {
            allowedLinks.push({
                IconName: 'Roles',
                Text: 'Roles',
                url: 'manage/roles',
            })
        }
        if (checkPermission('Tag')) {
            allowedLinks.push({
                IconName: 'Tags',
                Text: 'Tags',
                url: 'manage/tags',
            })
        }

        return {
            IconName: 'manage',
            Text: 'Manage',
            url: 'manage',
            subMenu: allowedLinks,
        }
    }

    const renderSidebarList = (): JSX.Element[] => {
        const SidebarLinks: TLink[] = [
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
                Text: 'My Teams',
                url: 'teams',
            },
        ]
        const manage = renderAdminLinks()
        if (manage.subMenu?.length !== 0) {
            SidebarLinks.push(manage)
        }
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

    return (
        <ul className="h-full w-full bg-primary-200 p-2 drop-shadow-xsm">{renderSidebarList()}</ul>
    )
}

export default LeftSideBar
