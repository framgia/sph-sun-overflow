import { parseHTML } from '@/helpers/htmlParsing'
import { useState } from 'react'

const Team = () => {
    const [isActiveTab, setIsActiveTab] = useState('dashboard')
    const getActiveTabClass = (status: boolean): string => {
        if (status) {
            return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
        }
        return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
    }

    const onClickTab = (tab: string) => {
        setIsActiveTab(tab)
        // refetch({ slug: query.slug })
    }

    const renderActiveTab = () => {
        return isActiveTab == 'dashboard' ? (
            <div className="ql-snow mx-5 my-4">
                <div className="ql-editor w-full">
                    {parseHTML(
                        '<h1> This is a test content to <strong>SHOW IN MARKUP<strong></h1>'
                    )}
                </div>
            </div>
        ) : null
    }

    return (
        <div className="mx-10 mt-10 flex h-full w-full flex-col gap-4">
            <div className="text-2xl font-bold">SunOverFlow Team</div>
            <div className="mt-2 flex h-3/5 flex-col">
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'dashboard'
                        )}`}
                        onClick={() => onClickTab('dashboard')}
                    >
                        Dashboard
                    </div>
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'questions'
                        )}`}
                        onClick={() => onClickTab('questions')}
                    >
                        Questions
                    </div>
                </div>
                {renderActiveTab()}
            </div>
        </div>
    )
}

export default Team
