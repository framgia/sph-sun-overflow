import Button from '@/components/atoms/Button'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import Icons, { CustomIcons } from '../atoms/Icons'

const { LoadingSpinner } = CustomIcons

type ModalProps = {
    title: string
    children: JSX.Element | string
    submitLabel?: string
    isOpen: boolean
    loading?: boolean
    handleSubmit?: () => void
    handleClose: () => void
    footerAlign?: 'left' | 'center' | 'right'
    flipFooter?: boolean
}

const Modal = ({
    title,
    children,
    submitLabel,
    isOpen,
    loading = false,
    handleSubmit,
    handleClose,
    footerAlign = 'left',
    flipFooter = false,
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
    const footerOptions = (): string => {
        if (footerAlign === 'center') return 'justify-center'
        if (footerAlign === 'right') return 'justify-end'
        return ''
    }
    const flipButtons = flipFooter ? 'order-last' : ''
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
                            <Dialog.Panel className="w-[500px] transform text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between rounded-t-lg bg-primary-300 p-4 text-neutral-900">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-md font-bold uppercase leading-6"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <Button usage="toggle-modal" onClick={handleClose}>
                                        <Icons name="close" size="24" />
                                    </Button>
                                </div>
                                <div className="flex flex-col rounded-b-lg bg-white">
                                    <Dialog.Description
                                        id="modal-content"
                                        as="div"
                                        className="flex w-full justify-start p-4 text-sm text-gray-800"
                                    >
                                        {children}
                                    </Dialog.Description>
                                    {submitLabel && (
                                        <div className={`flex gap-2 p-4 ${footerOptions()}`}>
                                            <Button
                                                usage="stroke"
                                                size="large"
                                                isDisabled={loading}
                                                additionalClass={`w-36 ${
                                                    loading ? 'pointer-events-none' : ''
                                                } ${flipButtons}`}
                                                onClick={onClickSubmit}
                                            >
                                                {loading ? (
                                                    <LoadingSpinner additionalClass="flex justify-center" />
                                                ) : (
                                                    submitLabel
                                                )}
                                            </Button>
                                            <Button
                                                usage="grayed"
                                                size="large"
                                                isDisabled={loading}
                                                onClick={handleClose}
                                                additionalClass={`${
                                                    loading ? 'pointer-events-none' : ''
                                                }`}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
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
