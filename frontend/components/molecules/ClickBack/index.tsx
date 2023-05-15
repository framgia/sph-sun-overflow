import Icons from '@/components/atoms/Icons'
import { useRouter } from 'next/router'

const ClickBack = (): JSX.Element => {
    const router = useRouter()

    const goBack = (): void => {
        router.back()
    }

    return (
        <div
            onClick={goBack}
            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-primary-200"
        >
            <Icons
                name="back_arrow"
                size="24"
                additionalClass="fill-neutral-disabled group-hover:fill-primary-base duration-200"
            />
        </div>
    )
}

export default ClickBack
