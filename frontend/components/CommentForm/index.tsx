import { useForm } from 'react-hook-form'
import { isObjectEmpty } from '@/utils'
import CommentFormSchema from './schema'
import { useEffect } from 'react'
import FormAlert from '../molecules/FormAlert'
import Button from '../atoms/Button'
import { yupResolver } from '@hookform/resolvers/yup'

export type FormValues = {
    comment: string
}

type CommentFormProps = {
    id: number | null
}

const CommentForm = ({ id }: CommentFormProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(CommentFormSchema),
    })

    const onSubmit = (data: FormValues) => {
        // id - you can use this to condition between update and create
        console.log(data) // TO BE CHANGED WITH API REQUEST FOR ADDING OR UPDATING
    }

    return (
        <div className="w-full">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full self-center py-4 ">
                    <textarea
                        className={`w-full border-2 border-gray-400 bg-white h-32`}
                        {...register('comment', {})}
                    />
                </div>
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-full self-center ">
                    <div className="float-right">
                        <Button
                            usage="primary"
                            type="submit"
                            onClick={undefined}
                            additionalClass="px-10 bg-white"
                        >
                            Submit Comment
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
