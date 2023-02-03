import React from 'react'
import RichTextEditor from '../../molecules/RichTextEditor'
import Button from '../../atoms/Button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { errorNotify, formProcessToast } from '@/helpers/toast'
import { ToastContainer } from 'react-toastify'
import useUsertore from '@/helpers/store'
import CREATE_ANSWER from '../../../helpers/graphql/mutations/create_answer'

export type FormValues = {
    content: string
    user_id: number
    question_id: number
}

const AnswerComponent = () => {
    const { query } = useRouter()
    const { id: question_id } = query

    const user_id = useUsertore.getState().user_id

    const [createAnswer] = useMutation(CREATE_ANSWER)

    const { setValue, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const onSubmit = (data: FormValues) => {
        if (data.content !== undefined) {
            if (data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                errorNotify('No answer Input')
            } else {
                const new_answer = createAnswer({
                    variables: {
                        content: data.content,
                        user_id,
                        question_id,
                    },
                })

                formProcessToast(
                    new_answer,
                    'Adding Answer...',
                    'Answer Successfully Added!',
                    'There was an Error!'
                )

                var element = document.getElementsByClassName('ql-editor')
                element[0].innerHTML = ''
            }
        } else errorNotify('No answer Input')
    }

    return (
        <div className="w-full p-2">
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col space-y-2">
                <text className="text-lg">Your Answer</text>
                <form className="flex flex-col">
                    <RichTextEditor setValue={setValue} usage="content" id={undefined} />
                    <div className="mt-4 flex flex-row-reverse">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            additionalClass=""
                            usage="primary"
                            type="submit"
                            isDisabled={false}
                        >
                            Submit Answer
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AnswerComponent
