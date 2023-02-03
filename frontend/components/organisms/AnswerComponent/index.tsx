import React from 'react'
import RichTextEditor from '../../molecules/RichTextEditor'
import Button from '../../atoms/Button'

const AnswerComponent = () => {
    const handleOnClick = () => {
        console.log('clicked')
    }

    return (
        <div className="w-7/12 p-2">
            <div className="flex flex-col space-y-2">
                <text className="text-lg">Your Answer</text>
                <RichTextEditor />
                <div className="mt-2 flex flex-row-reverse">
                    <Button
                        usage="primary"
                        type="submit"
                        isDisabled={false}
                        onClick={handleOnClick}
                    >
                        Submit Answer
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AnswerComponent
