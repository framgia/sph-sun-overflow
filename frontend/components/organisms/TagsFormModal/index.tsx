import Modal from '@/components/templates/Modal'

const tempData = {
    title: '',
    description: '',
}

type FormProps = {
    initialData?: {
        title: string
        description: string
    }
    closeModal: () => void
    isOpen: boolean
}

const TagsFormModal = ({ initialData = tempData, isOpen, closeModal }: FormProps): JSX.Element => {
    const formTitle = initialData?.title ? 'Edit Tag' : 'Add Tag'
    return (
        <Modal
            title={formTitle}
            submitLabel={formTitle}
            isOpen={isOpen}
            handleClose={() => {
                closeModal()
            }}
        >
            <form className="flex w-full flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        id="tagTitle"
                        className="rounded-lg"
                        placeholder="Title"
                        defaultValue={initialData.title || ''}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <textarea
                        id="tagDescription"
                        className="rounded-lg"
                        placeholder="Briefly Describe the Tag"
                        defaultValue={initialData.description || ''}
                        rows={4}
                    />
                </div>
            </form>
        </Modal>
    )
}
export default TagsFormModal
