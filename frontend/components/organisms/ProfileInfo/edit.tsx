import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import UPDATE_USER from '@/helpers/graphql/mutations/update_user'
import { errorNotify, successNotify } from '@/helpers/toast'
import type { ProfileType } from '@/pages/users/[slug]'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    user_id: number
    profile: ProfileType
    profileRefetchHandler: () => void
    onClickCancelProfileEdit: () => void
}

type ProfileFormValues = {
    avatar: string
    first_name: string
    last_name: string
    about_me: string
}

const ProfileInfoEdit = ({
    user_id,
    profile,
    onClickCancelProfileEdit,
    profileRefetchHandler,
}: Props): JSX.Element => {
    const router = useRouter()

    const [updateUser] = useMutation(UPDATE_USER)

    const [previewImage, setPreviewImage] = useState('')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [inputError, setInputError] = useState({
        first_name: false,
        last_name: false,
        about_me: false,
    })

    const onChangePreview = (event: React.ChangeEvent): void => {
        const target = event?.target as HTMLInputElement
        const file = target.files?.[0]

        const acceptedType = ['image/png', 'image/jpeg']

        if (!acceptedType.includes(String(file?.type))) {
            errorNotify('Please upload a valid image')
            return
        }

        if (file) {
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const { register, setValue, handleSubmit, control } = useForm<ProfileFormValues>({
        defaultValues: {
            avatar: '',
            first_name: profile.first_name ? String(profile.first_name) : '',
            last_name: profile.last_name ? String(profile.last_name) : '',
            about_me: profile.about_me ? String(profile.about_me) : '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        if (profile.about_me) {
            setValue('about_me', profile.about_me)
        }
    }, [setValue, profile.about_me])

    const convertBase64 = async (file: any): Promise<unknown> => {
        return await new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleUpdateUser = (
        first_name: string,
        last_name: string,
        about_me: string,
        avatar: unknown
    ): void => {
        updateUser({
            variables: {
                first_name,
                last_name,
                about_me,
                avatar,
            },
        })
            .then(() => {
                successNotify('Profile updated successfully please wait for a while!')

                setTimeout(() => {
                    router.reload()
                }, 3000)
            })
            .catch((e) => {
                if (e.message === 'Internal server error')
                    errorNotify('Please complete the input fields!')
                else errorNotify(e.message)
            })
    }

    const onSubmit = async (data: ProfileFormValues): Promise<void> => {
        const avatar_image = data.avatar[0] !== undefined ? await convertBase64(data.avatar[0]) : ''

        if (profile.about_me === null && data.about_me === '') {
            if (
                data.first_name === profile.first_name &&
                data.last_name === profile.last_name &&
                data.avatar[0] === undefined
            ) {
                errorNotify('Profile Not Updated!')
                profileRefetchHandler()
            } else {
                handleUpdateUser(data.first_name, data.last_name, data.about_me, avatar_image)
            }
        } else {
            if (
                data.first_name === profile.first_name &&
                data.last_name === profile.last_name &&
                data.about_me === profile.about_me &&
                data.avatar[0] === undefined
            ) {
                errorNotify('Profile Not Updated!')
                profileRefetchHandler()
            } else {
                handleUpdateUser(data.first_name, data.last_name, data.about_me, avatar_image)
            }
        }
    }

    const onCancelButton = (event: React.MouseEvent): void => {
        event.preventDefault()
        setValue('avatar', '')
        setPreviewImage('')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row gap-14">
            <div className="flex w-2/6 flex-col items-center gap-2">
                <div className="h-[200px] w-40">
                    <div className="dropzone flex h-full flex-col justify-between bg-secondary-gray">
                        <div className="relative h-[150px] border-2 border-secondary-black">
                            <div className="flex h-[147px] items-center justify-center overflow-hidden text-7xl font-bold text-primary-gray">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        className="h-[147px] w-full object-cover"
                                    />
                                ) : (
                                    '?'
                                )}
                            </div>
                            {previewImage && (
                                <Button onClick={onCancelButton} usage="cancel-item">
                                    <Icons name="x-plain" />
                                </Button>
                            )}
                        </div>
                        <label className="relative flex h-[50px] cursor-pointer items-center justify-center bg-secondary-black text-white hover:bg-primary-gray">
                            Change Picture
                            <input
                                id="profileImageUpload"
                                accept="image/png, image/gif, image/jpeg"
                                type="file"
                                {...register('avatar', { onChange: onChangePreview })}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <input
                        type="text"
                        className={`form-input rounded-lg border  ${
                            inputError.first_name ? 'border-primary-red' : 'border-border-black'
                        } `}
                        placeholder="First name"
                        {...register('first_name', {})}
                    />
                    <input
                        type="text"
                        className={`form-input rounded-lg border ${
                            inputError.last_name ? 'border-primary-red' : 'border-border-black'
                        } `}
                        placeholder="Last name"
                        {...register('last_name', {})}
                    />
                </div>
            </div>
            <div className="flex w-4/6 flex-col">
                <div className="align-center flex h-fit w-full flex-col gap-4">
                    <div className="flex h-12 w-full flex-row items-center">
                        <div className="align-middle text-2xl font-semibold">About Me</div>
                    </div>
                    <Controller
                        control={control}
                        name="about_me"
                        defaultValue={profile.about_me === null ? '' : profile.about_me ?? ''}
                        render={({ field: { onChange, value } }) => (
                            <RichTextEditor
                                onChange={onChange}
                                value={value}
                                usage="about_me"
                                id={undefined}
                            />
                        )}
                    />
                </div>
            </div>
            {profile.id === user_id && (
                <div className="absolute top-[3px] right-0 flex flex-row gap-1">
                    <Button
                        type="button"
                        additionalClass="bg-white !font-bold"
                        onClick={onClickCancelProfileEdit}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" additionalClass="absbg-white !font-bold">
                        Save Profile
                    </Button>
                </div>
            )}
        </form>
    )
}

export default ProfileInfoEdit
