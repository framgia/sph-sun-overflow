import SidebarIcon from '@/components/atoms/SidebarIcon'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowDown } from 'react-icons/io'

type SidebarButtonProps = {
    IconName: string
    Text: string
    url: string
    subMenu?: Array<{
        IconName: string
        Text: string
        url: string
    }>
}

const SidebarButton = ({ IconName, Text, subMenu, url }: SidebarButtonProps): any => {
    const router = useRouter()

    const isSelected = (index: number, urlString: string): boolean => {
        const urlSplit = router.pathname.split('/')

        if (!urlSplit[index]) return urlString.includes('questions')

        return urlString.includes(urlSplit[index])
    }

    const selectedClass = 'bg-gray-100 text-primary-red'

    return (
        <li className="sidebar-list">
            {subMenu ? (
                <Popover>
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`flex w-full items-center space-x-2 py-2.5 pl-7 text-xl font-normal ${
                                    open ? '' : 'hover:bg-red-200'
                                }`}
                            >
                                <SidebarIcon name={IconName} />
                                <span className="pl-2">{Text}</span>
                                <IoIosArrowDown
                                    className={`text-xl ${open ? 'rotate-180 transform' : ''}`}
                                />
                            </Popover.Button>
                            <Popover.Panel>
                                <ul>
                                    {subMenu.map((child, index) => {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`/${child.url}`}
                                                    className={`flex items-center space-x-2 py-2.5 pl-16 text-xl font-normal ${
                                                        isSelected(2, child.url)
                                                            ? selectedClass
                                                            : 'hover:bg-red-200'
                                                    }`}
                                                >
                                                    <SidebarIcon name={child.IconName} />
                                                    <span className="pl-2">{child.Text}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
            ) : (
                <Link
                    href={url}
                    className={`flex items-center space-x-2 py-2.5 pl-7 text-xl font-normal ${
                        isSelected(1, url) ? selectedClass : 'hover:bg-red-200 '
                    }`}
                >
                    <SidebarIcon name={IconName} />
                    <span className="pl-2">{Text}</span>
                </Link>
            )}
        </li>
    )
}

export default SidebarButton
