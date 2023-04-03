import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@material-tailwind/react'
import React, { Fragment } from 'react'
import { HiX } from 'react-icons/hi'

type ModalProps = {
    title: string
    children: JSX.Element | string
    submitLabel: string
    isOpen: boolean
    handleSubmit?: () => void
    handleClose: () => void
}

const Modal = ({
    title,
    children,
    submitLabel,
    isOpen,
    handleSubmit,
    handleClose,
}: ModalProps): JSX.Element => {
    const onClickSubmit = (event: React.MouseEvent): void => {
        event.preventDefault()

        if (typeof handleSubmit === 'function') {
            handleSubmit()
        } else {
            const modalElement = document.querySelector('#modal-content form') as HTMLFormElement

            modalElement.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>

                <div className="overflow-y-inherit fixed inset-0">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between rounded-t-lg bg-primary-red px-4 py-3">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-md font-bold leading-6 text-white"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <HiX
                                        className="cursor-pointer self-center text-lg text-white"
                                        onClick={handleClose}
                                    />
                                </div>
                                <div className="flex flex-col rounded-b-lg bg-white">
                                    <div className="flex justify-center p-4">
                                        <Dialog.Description
                                            id="modal-content"
                                            as="div"
                                            className="mt-2 w-full text-sm text-gray-800"
                                        >
                                            {children}
                                        </Dialog.Description>
                                    </div>
                                    <div className="flex justify-end gap-2 px-4 pb-4 pt-3">
                                        <Button size="sm" color="gray" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="red"
                                            className="bg-primary-red hover:bg-dark-red"
                                            onClick={onClickSubmit}
                                        >
                                            {submitLabel}
                                        </Button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
