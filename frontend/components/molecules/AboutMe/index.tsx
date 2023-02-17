import Button from '@/components/atoms/Button'

interface AboutMeProps {
    about_me: string
    authenticated_user_id: number
    user_id: number
}

const AboutMe = ({ about_me, authenticated_user_id, user_id }: AboutMeProps) => {
    return (
        <div className="align-center w-full">
            <div className="flex h-12 w-full flex-row items-center justify-between px-8">
                <div className="ml-8 align-middle text-2xl font-semibold">About Me</div>
                {authenticated_user_id === user_id ? (
                    <Button additionalClass="!font-bold">Edit Profile</Button>
                ) : (
                    ''
                )}
            </div>
            <div className="px-8 py-4">
                <div className="ml-8 text-justify text-sm line-clamp-4">{about_me}</div>
            </div>
        </div>
    )
}
export default AboutMe
