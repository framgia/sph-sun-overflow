import Image from 'next/image'

type Props = {
    children: JSX.Element
}

const LoginCard = ({ children }: Props): JSX.Element => {
    return (
        <div className="flex h-96 gap-10 overflow-hidden rounded border border-neutral-200 bg-neutral-white">
            <div className="grid w-96 place-items-center bg-gradient-to-t from-primary-200">
                <div>
                    <Image
                        height="104"
                        width="104"
                        alt="Sun Bear Logo"
                        className="mx-auto"
                        src="/images/sun_logo.png"
                    />
                    <div className="mt-1 flex justify-center text-3xl font-bold">
                        <div className="text-primary-base">Sun</div>
                        <div className="text-neutral-900">Overflow</div>
                    </div>
                    <div className="mt-2 text-center text-base tracking-widest text-neutral-700">
                        <div>
                            <div>Where your</div>
                            <div>programming questions</div>
                            <div>are answered</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-96 items-center bg-neutral-white p-8">{children}</div>
        </div>
    )
}

export default LoginCard
