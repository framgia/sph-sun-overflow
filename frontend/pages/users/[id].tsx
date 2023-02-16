import Button from '@/components/atoms/Button'
import ProfileImage from '@/components/atoms/ProfileImage'
import ProfileStats from '@/components/atoms/ProfileStats'
import AboutMe from '@/components/molecules/AboutMe'

const ProfilePage = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="mt-10 flex h-auto w-full flex-row">
                <div className="flex w-1/3 flex-col">
                    <ProfileImage />
                </div>
                <div className="mr-10 flex w-2/3 flex-col">
                    <AboutMe />
                </div>
            </div>
            <div className="my-4 flex w-full flex-row">
                <div className="flex w-1/3 justify-center">
                    <Button type="button" usage="follow" additionalClass="my-auto drop-shadow-xl">
                        Follow
                    </Button>
                </div>
                <div className="flex w-2/3">
                    <div className="flex w-full flex-row self-end ">
                        <ProfileStats value={10} text="Reputation" />
                        <ProfileStats value={10} text="Questions" />
                        <ProfileStats value={10} text="Answers" />
                    </div>
                </div>
            </div>
            <div className="mt-3 flex h-3/5 flex-col">
                <ul className="h-1/10 ml-10 flex flex-row border-b-2 border-gray-300">
                    <li className="">
                        <div className="-mb-[1px] border-b-2 border-b-primary-red bg-red-100 px-6 font-semibold">
                            Activity
                        </div>
                    </li>
                    <div className="-mb-[1px] border-b-2 border-b-gray-300 px-6">Bookmarks</div>{' '}
                </ul>
            </div>
        </div>
    )
}
export default ProfilePage
