import { Icons } from '@/components/atoms/Icons'

const { LockIcon, UnlockIcon } = Icons

type PrivacyProps = {
    name: 'Public' | 'Private'
    additionalClass?: string
}

const Privacy = ({ name, additionalClass = '' }: PrivacyProps): JSX.Element => {
    return (
        <div className={`flex items-center gap-1 text-sm font-semibold ${additionalClass}`}>
            <span>{name}</span>
            <div>{name === 'Public' ? <UnlockIcon /> : <LockIcon />}</div>
        </div>
    )
}

export default Privacy
