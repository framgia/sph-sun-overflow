import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type ModalProps = {
    title: string
    children: JSX.Element | string
    submitLabel: string
    isOpen: boolean
    handleSubmit: () => void
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

                <div className="fixed inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between bg-secondary-gray px-6 py-3">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <Button usage="toggle-modal" onClick={handleClose}>
                                        <Icons name="x-plain" size="16" />
                                    </Button>
                                </div>
                                <div className="px-6 py-4 ">
                                    <Dialog.Description className="mt-2 text-sm">
                                        {children}
                                    </Dialog.Description>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            usage="modal-cancel"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            usage="modal-submit"
                                            onClick={handleSubmit}
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
