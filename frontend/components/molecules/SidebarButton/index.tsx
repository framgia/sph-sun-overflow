import SidebarIcon from '@/components/atoms/SidebarIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    const [itemSelected, setItemSelected] = useState('')
    const [animateMe, setAnimateMe] = useState('')

    const isSelected = (index: number, urlString: string): boolean => {
        const urlSplit = router.pathname.split('/')

        if (!urlSplit[index]) return urlString.includes('questions')

        return urlString.includes(urlSplit[index])
    }

    const getButtonClass = (isSelected: boolean, isMenu: boolean = false): string => {
        const selectedMenuClass = 'bg-primary-300 text-neutral-disabled rounded-b-none'
        const selectedClass = isMenu
            ? selectedMenuClass
            : 'bg-primary-300 text-neutral-900 border-primary-700 border-r-4'
        const unselected = 'text-neutral-disabled bg-primary-200 hover:bg-primary-300'

        return `w-full flex flex-row items-center text-sub gap-2.5 rounded-smd px-4 py-3 text-sm font-bold cursor-pointer ${
            isSelected ? selectedClass : unselected
        }`
    }

    const getMenuButtonClass = (isSelected: boolean): string => {
        const selectedClass = 'bg-primary-500 text-neutral-900 border-r-4 border-primary-700'
        const unselected = 'text-neutral-disabled bg-primary-300 hover:bg-primary-500'

        return `last:rounded-b-smd ${isSelected ? selectedClass : unselected}`
    }

    const onClickMenu = (menu: string): void => {
        if (itemSelected === menu) {
            setItemSelected('')
            setAnimateMe('')
        } else {
            setItemSelected(menu)
            setAnimateMe(menu)
        }
    }

    return (
        <li className="sidebar-list">
            {subMenu ? (
                <div>
                    <div
                        className={getButtonClass(animateMe === url || isSelected(1, url), true)}
                        onClick={() => {
                            onClickMenu(url)
                        }}
                    >
                        <div
                            className={`transition-all duration-500
                                ${
                                    animateMe === url || isSelected(1, url)
                                        ? 'rotate-90'
                                        : 'rotate-0'
                                }
                            `}
                        >
                            <SidebarIcon name={IconName} />
                        </div>
                        <div className="flex h-4 items-center">{Text}</div>
                    </div>
                    <ul
                        className={`${
                            animateMe === url || isSelected(1, url) ? 'max-h-56' : 'max-h-0'
                        } h-fit overflow-hidden transition-all duration-500 ease-in-out`}
                    >
                        {subMenu.map((menu, index) => (
                            <li key={index} className={getMenuButtonClass(isSelected(2, menu.url))}>
                                <Link
                                    href={`/${menu.url}`}
                                    className={`flex w-full cursor-pointer flex-row items-center gap-2.5 px-4 py-3 pl-8 text-sm font-bold`}
                                >
                                    <SidebarIcon name={menu.IconName} />
                                    <div className="flex h-4 items-center">{menu.Text}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <Link href={url} className={getButtonClass(isSelected(1, url))}>
                    <SidebarIcon name={IconName} />
                    <div className="flex h-4 items-center">{Text}</div>
                </Link>
            )}
        </li>
    )
}

export default SidebarButton
