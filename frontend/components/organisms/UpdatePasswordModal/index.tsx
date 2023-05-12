import InputField from '@/components/atoms/InputField'
import Modal from '@/components/templates/Modal'
import UPDATE_PASSWORD from '@/helpers/graphql/mutations/update_password'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type UpdatePasswordModalProps = {
    isOpen: boolean
    closeModal: () => void
}

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const UpdatePasswordModal = ({ isOpen, closeModal }: UpdatePasswordModalProps): JSX.Element => {
    const [showLoading, setShowLoading] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formErrors, setFormErrors] = useState<FormValues>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [updatePassword] = useMutation(UPDATE_PASSWORD)

    const { control, handleSubmit, reset } = useForm<FormValues>()

    const resetState = (): void => {
        setShowCurrentPassword(false)
        setShowNewPassword(false)
        setShowConfirmPassword(false)
        setFormErrors({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    }

    const renderEyeIcon = (showPassword: boolean, setShowPassword: () => void): JSX.Element => {
        return (
            <div
                className="absolute bottom-0.5 right-2.5 -translate-y-1/2 transform cursor-pointer"
                onClick={setShowPassword}
            >
                {showPassword ? (
                    <AiOutlineEye className="text-xl" />
                ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                )}
            </div>
        )
    }
    const onSubmit = (data: FormValues): void => {
        const { currentPassword, newPassword, confirmPassword } = data
        const errorFields = { currentPassword: '', newPassword: '', confirmPassword: '' }

        let valid = true
        if (!currentPassword) {
            valid = false
            errorFields.currentPassword = `Current Password must not be empty`
        }

        if (!newPassword) {
            valid = false
            errorFields.newPassword = `New Password must not be empty`
        }
        if (!confirmPassword) {
            valid = false
            errorFields.confirmPassword = `Confirm Password must not be empty`
        }
        if (valid) {
            setShowLoading(true)
            updatePassword({
                variables: {
                    input: {
                        old_password: currentPassword,
                        password: newPassword,
                        password_confirmation: confirmPassword,
                    },
                },
            })
                .then(({ data }) => {
                    successNotify(data?.updatePassword.message ?? 'Your request was successful')
                    reset()
                    resetState()
                    closeModal()
                })
                .catch((error) => {
                    const { message } = error

                    if (message === 'Validation Exception')
                        errorNotify('Current Password is incorrect')
                    else if (newPassword !== confirmPassword)
                        errorNotify('Password confirmation does not match')
                    else if (message.includes('Validation failed'))
                        errorNotify('Password must be at least 8 characters')
                    else errorNotify('There was  an error with your request')
                })
                .finally(() => {
                    setTimeout(() => {
                        setShowLoading(false)
                    }, 500)
                })
        }
        setFormErrors(errorFields)
    }

    return (
        <Modal
            isOpen={isOpen}
            submitLabel="Save"
            flipFooter
            loading={showLoading}
            footerAlign="center"
            handleClose={() => {
                reset()
                resetState()
                closeModal()
            }}
            title="Change Password"
        >
            <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            additionalClass="pr-8"
                            name="currentPassword"
                            type={showCurrentPassword ? 'text' : 'password'}
                            icon={renderEyeIcon(showCurrentPassword, () => {
                                setShowCurrentPassword(!showCurrentPassword)
                            })}
                            value={value}
                            label="Current Password"
                            onChange={onChange}
                            placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                            isValid={formErrors.currentPassword.length === 0}
                            error={formErrors.currentPassword}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            additionalClass="pr-8"
                            name="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            icon={renderEyeIcon(showNewPassword, () => {
                                setShowNewPassword(!showNewPassword)
                            })}
                            value={value}
                            label="New Password"
                            onChange={onChange}
                            placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                            isValid={formErrors.newPassword.length === 0}
                            error={formErrors.newPassword}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            additionalClass="pr-8"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            icon={renderEyeIcon(showConfirmPassword, () => {
                                setShowConfirmPassword(!showConfirmPassword)
                            })}
                            value={value}
                            label="Confirm Password"
                            onChange={onChange}
                            placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                            isValid={formErrors.confirmPassword.length === 0}
                            error={formErrors.confirmPassword}
                        />
                    )}
                />
            </form>
        </Modal>
    )
}

export default UpdatePasswordModal
