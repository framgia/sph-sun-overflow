import FollowCard from '@/components/molecules/FollowCard'
import Modal from '@/components/templates/Modal'
import { type TFollowInstance } from '@/components/templates/Profile'
import { Fragment } from 'react'

type TFollowModalProps = {
    title: 'Followers' | 'Following'
    content:
        | Array<{
              following: TFollowInstance
          }>
        | Array<{
              follower: TFollowInstance
          }>
    isOpen: boolean
    setIsOpen: (input: boolean) => void
    toggleFollow: (input: { variables: { userId: number } }) => void
}
const FollowModal = ({
    title,
    content,
    isOpen,
    setIsOpen,
    toggleFollow,
}: TFollowModalProps): JSX.Element => {
    const preProcessContent = (): TFollowInstance[] => {
        const tempArr: TFollowInstance[] = []
        content.forEach((item) => {
            if ('following' in item) {
                tempArr.push(item.following)
            }
            if ('follower' in item) {
                tempArr.push(item.follower)
            }
        })
        return tempArr
    }
    const tempArr = preProcessContent()
    return (
        <Fragment>
            <Modal
                title={title}
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false)
                }}
            >
                <div className="no-scrollbar flex h-96 w-full flex-col overflow-y-scroll ">
                    {tempArr.length === 0 && (
                        <div className="flex h-full w-full items-center justify-center">
                            <div className="py-2 text-center text-primary-gray">
                                {title === 'Followers'
                                    ? 'No users are following yet'
                                    : 'You are not following any users'}
                            </div>
                        </div>
                    )}
                    {tempArr.map((item, index): JSX.Element => {
                        return (
                            <FollowCard
                                key={index}
                                data={item}
                                usage={title}
                                toggleFollow={toggleFollow}
                            />
                        )
                    })}
                </div>
            </Modal>
        </Fragment>
    )
}

export default FollowModal
