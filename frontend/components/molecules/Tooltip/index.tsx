import Button from '@/components/atoms/Button'
import React from 'react'

const Tooltips = (): JSX.Element => {
    return (
        <div className="p-5">
            <div className="flex items-center">
                <p className="mr-20 text-red-700">100k Watchers</p>
                <p className="mr-2">100K Questions</p>
            </div>
            <div className="">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa qui possimus,
                    alias veritatis dicta atque dolores.
                    <a className="ml-2 underline" href="">
                        View Tag
                    </a>
                </p>
            </div>
            <div className="float-right ml-2 p-2">
                <Button usage="popover" type="submit" onClick={undefined}>
                    Watch Tag
                </Button>
            </div>
        </div>
    )
}

export default Tooltips
