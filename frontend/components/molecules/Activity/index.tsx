type ActivityProps = {
    id: number
    votes: number
    is_answered: boolean
    data: string
    created_at: string
}

const Activity = ({ id, votes, is_answered, data, created_at }: ActivityProps): JSX.Element => {
    return (
        <div className="flex">
            <div className="box-border w-14 p-2">
                {is_answered ? (
                    <div className="box-border h-full w-full border-2 border-green-600 bg-green-600 text-center text-white">
                        {votes}
                    </div>
                ) : (
                    <div className="box-border h-full w-full border-2 border-black text-center">
                        {votes}
                    </div>
                )}
            </div>
            <p className="p-2 text-blue-500">{data}</p>
            <p className="p-2">{created_at}</p>
        </div>
    )
}
export default Activity
