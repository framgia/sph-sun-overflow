import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import { ProfileType } from '@/pages/users/[slug]'
import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    user_id: number
    profile: ProfileType
    profileRefetchHandler: () => void
}

type ProfileFormValues = {
    avatar: string
    first_name: string
    last_name: string
    about_me: string
}

type FilesType = {
    name: string
    preview: string
}

const ProfileInfoEdit = ({ user_id, profile, profileRefetchHandler }: Props): JSX.Element => {
    const [previewImage, setPreviewImage] = useState('')

    const onChangePreview = (event: React.ChangeEvent) => {
        const target = event?.target as HTMLInputElement
        const file = target.files?.[0]
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

    const onSubmit = (data: ProfileFormValues) => {
        profileRefetchHandler()
    }

    const onCancelButton = (event: React.MouseEvent) => {
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
                                accept="image/*"
                                type="file"
                                {...register('avatar', { onChange: onChangePreview })}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <input
                        type="text"
                        className="form-input rounded-lg border border-border-black"
                        placeholder="First name"
                        {...register('first_name', {})}
                    />
                    <input
                        type="text"
                        className="form-input rounded-lg border border-border-black"
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
                <Button
                    type="submit"
                    additionalClass="absolute top-[3px] right-0 bg-white !font-bold"
                >
                    Save Profile
                </Button>
            )}
        </form>
    )
}

export default ProfileInfoEdit
