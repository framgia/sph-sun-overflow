import { CustomIcons } from '@/components/atoms/Icons'

const { LockIcon, UnlockIcon } = CustomIcons

type PrivacyProps = {
    name: 'Public' | 'Private'
    additionalClass?: string
}

const Privacy = ({ name, additionalClass = '' }: PrivacyProps): JSX.Element => {
    return (
        <div
            className={`flex items-center gap-1 text-xs font-semibold ${
                name === 'Public' ? 'text-neutral-disabled' : 'text-neutral-900'
            } ${additionalClass}`}
        >
            <span>{name}</span>
            <div>{name === 'Public' ? <UnlockIcon /> : <LockIcon />}</div>
        </div>
    )
}

export default Privacy
