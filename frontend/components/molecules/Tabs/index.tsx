import type { TabType } from '@/components/atoms/TabItem'
import TabItem from '@/components/atoms/TabItem'

type Props = {
    tabs: TabType[]
}

const Tabs = ({ tabs }: Props): JSX.Element => {
    return (
        <div className="border-b border-neutral-200 text-center text-sm font-bold text-neutral-900">
            <ul className="flex flex-wrap">
                {tabs.map((tab, index) => {
                    return (
                        <li className="cursor-pointer" key={index}>
                            <TabItem
                                label={tab.label}
                                isSelected={tab.isSelected}
                                onClick={tab.onClick}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Tabs
