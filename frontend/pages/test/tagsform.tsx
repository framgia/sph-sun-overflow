import Button from '@/components/atoms/Button'
import TagsFormModal from '@/components/organisms/TagsFormModal'
import { useState } from 'react'
//Test Page for the Component
const TagsFormPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleSubmit = () => {
        setIsOpen(false)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const tempData = {
        title: '123',
        description: '1234',
    }

    return (
        <div className="m-20 ">
            <div className="">
                <Button onClick={() => setIsOpen(true)}>Test</Button>
            </div>
            <TagsFormModal isOpen={isOpen} closeModal={closeModal} initialData={tempData} />
        </div>
    )
}
export default TagsFormPage
