import React from 'react'

type Props = {
    name: string
    iconPath: string
    additionalClass?: string
}

const Privacy: React.FC<Props> = ({ name, iconPath, additionalClass = '' }) => {
    return (
        <div className={`flex items-center gap-1 text-sm font-semibold ${additionalClass}`}>
            <span>{name}</span>
            <img src={iconPath} alt={name} />
        </div>
    )
}

export default Privacy
