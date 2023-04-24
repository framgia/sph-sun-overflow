import InputField from '@/components/atoms/InputField'
import TextArea from '@/components/atoms/TextArea'
import Modal from '@/components/templates/Modal'
import UPDATE_USER from '@/helpers/graphql/mutations/update_user'
import GET_AUTHENTICATED_USER from '@/helpers/graphql/queries/get_authenticated_user'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { convertBase64 } from '@/utils'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Controller, useForm } from 'react-hook-form'
import EditProfileSchema from './schema'
type FormValues = {
    firstName: string
    lastName: string
    aboutMe: string
    avatar: string
}
type TEditProfileProps = {
    first_name: string
    last_name: string
    about_me: string
    avatar: string
    updated_at: string
}
const validAvatarTypes = ['image/png', 'image/gif', 'image/jpeg']

const EditProfileModal = ({
    first_name: firstName,
    last_name: lastName,
    about_me: aboutMe,
    avatar,
    updated_at: updatedAt,
}: TEditProfileProps): JSX.Element => {
    const router = useRouter()
    const updateProfile = useBoundStore((state) => state.updateProfile)
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [
            { query: GET_USER, variables: { slug: router.query.slug } },
            { query: GET_AUTHENTICATED_USER },
        ],
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const formTitle = 'Edit Profile'
    const handleClose = (): void => {
        setIsOpen(false)
        reset({
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            aboutMe: aboutMe ?? '',
            avatar: avatar ?? '',
        })
    }
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, isDirty },
        watch,
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            aboutMe: aboutMe ?? '',
            avatar: avatar ?? '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(EditProfileSchema),
    })
    useEffect(() => {
        reset({
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            aboutMe: aboutMe ?? '',
            avatar: avatar ?? '',
        })
    }, [firstName, lastName, aboutMe, avatar])

    const checkAvatarIsUpdated = (newAvatar: string): boolean => {
        return newAvatar.includes('data:image/') && newAvatar.includes('base64')
    }
    const onSubmit = async (data: FormValues): Promise<void> => {
        if (!isDirty && !checkAvatarIsUpdated(data.avatar)) {
            setIsOpen(false)
            errorNotify('Profile Not Updated!')
            return
        }
        await updateUser({ variables: data })
            .then((data) => {
                successNotify('Profile updated successfully please wait for a while!')
                const { first_name, last_name, avatar } = data.data.updateUser
                updateProfile(first_name, last_name, avatar)
                setTimeout(() => {}, 3000)
            })
            .catch((e) => {
                errorNotify(e.message)
                reset({
                    firstName: firstName ?? '',
                    lastName: lastName ?? '',
                    aboutMe: aboutMe ?? '',
                    avatar: avatar ?? '',
                })
            })
            .finally(() => {
                setIsOpen(false)
            })
    }
    const handleAvatar = (): void => {
        document.getElementById('avatar')?.click()
    }

    const avatarOnChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = e.target.files ? e.target.files[0] : avatar
        if (file instanceof File && !validAvatarTypes.includes(file.type)) {
            errorNotify('Not a valid File Type')
            return
        }
        let newAvatar = file
        if (typeof newAvatar === 'object') {
            newAvatar = await convertBase64(newAvatar)
        }
        setValue('avatar', newAvatar as string)
    }

    return (
        <Fragment>
            <div
                className="h-4 cursor-pointer text-xs font-semibold leading-[120%] text-neutral-900 hover:underline"
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                Edit
            </div>
            <Modal
                title={formTitle}
                submitLabel="Save Profile"
                isOpen={isOpen}
                handleClose={() => {
                    handleClose()
                }}
                handleSubmit={handleSubmit(onSubmit)}
                footerAlign="center"
                flipFooter={true}
            >
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex w-full flex-col items-center align-middle">
                            <Avatar
                                round
                                src={watch('avatar')}
                                maxInitials={1}
                                textSizeRatio={2}
                                className="object-cover"
                            />
                            <div
                                className="cursor-pointer font-semibold text-primary-blue"
                                onClick={handleAvatar}
                            >
                                Upload new photo
                            </div>

                            <input
                                className="hidden"
                                id="avatar"
                                accept="image/png, image/gif, image/jpeg"
                                type="file"
                                onChange={avatarOnChange}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <Controller
                                control={control}
                                name="firstName"
                                defaultValue={firstName}
                                render={({ field: { onChange, value } }) => (
                                    <InputField
                                        name="firstName"
                                        value={value}
                                        label="First Name"
                                        onChange={onChange}
                                        isValid={!('firstName' in errors)}
                                        error={errors.firstName?.message ?? ''}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="lastName"
                                defaultValue={lastName}
                                render={({ field: { onChange, value } }) => (
                                    <InputField
                                        name="lastName"
                                        value={value}
                                        label="Last Name"
                                        onChange={onChange}
                                        isValid={!('lastName' in errors)}
                                        error={errors.lastName?.message ?? ''}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name="aboutMe"
                                defaultValue={aboutMe}
                                render={({ field: { onChange, value } }) => (
                                    <TextArea
                                        name="aboutMe"
                                        value={value}
                                        label="About Me"
                                        onChange={onChange}
                                        isValid={!('aboutMe' in errors)}
                                        error={errors.aboutMe?.message ?? ''}
                                        rows={3}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </Fragment>
    )
}
export default EditProfileModal
