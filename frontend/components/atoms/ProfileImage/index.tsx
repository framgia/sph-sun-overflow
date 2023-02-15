import Image from 'next/image'
import { Fragment } from 'react'
const ProfileImage = () => {
    return (
        <Fragment>
            <div className="relative flex place-content-center">
                <div className="relative aspect-square w-2/5">
                    <Image src="/images/sun_logo.png" alt="sun-logo" fill className="relative " />
                </div>
            </div>
            <div className="mt-6 flex px-6 text-center text-3xl font-semibold line-clamp-3">
                First Name Last Name
            </div>
        </Fragment>
    )
}
export default ProfileImage
