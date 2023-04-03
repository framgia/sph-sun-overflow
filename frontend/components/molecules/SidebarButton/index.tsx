import SidebarIcon from '@/components/atoms/SidebarIcon'
import { Disclosure } from '@headlessui/react'
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
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button
                                className={`flex items-center space-x-2 py-2.5 pl-7 text-xl font-normal `}
                            >
                                <SidebarIcon name={IconName} />
                                <span className="pl-2">{Text}</span>
                                <IoIosArrowDown
                                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 `}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel>
                                <ul>
                                    {subMenu.map((child, index) => {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`/${child.url}`}
                                                    className={`flex items-center space-x-2 py-2.5 pl-16 text-xl font-normal ${
                                                        isSelected(2, child.url)
                                                            ? selectedClass
                                                            : ''
                                                    } hover:bg-red-200 hover:text-white active:text-primary-red`}
                                                >
                                                    <SidebarIcon name={child.IconName} />
                                                    <span className="pl-2">{child.Text}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ) : (
                <Link
                    href={url}
                    className={`flex items-center space-x-2 py-2.5 pl-7 text-xl font-normal ${
                        isSelected(1, url) ? selectedClass : ''
                    } hover:bg-red-200 hover:text-white active:text-primary-red`}
                >
                    <SidebarIcon name={IconName} />
                    <span className="pl-2">{Text}</span>
                </Link>
            )}
        </li>
    )
}

export default SidebarButton
