import Button from '@/components/atoms/Button'
import { CustomIcons } from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
import LoginCard from '@/components/organisms/LoginCard'
import ADMIN_LOGIN from '@/helpers/graphql/mutations/admin_login'
import { setUserToken } from '@/helpers/localStorageHelper'
import { errorNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const { LoadingSpinner } = CustomIcons

type FormValues = {
    email: string
    password: string
}

const AdminLogin: NextPage = () => {
    const [adminLogin] = useMutation(ADMIN_LOGIN)

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: FormValues): void => {
        const { email, password } = data

        let valid = true
        setLoading(true)

        const dataFields = [
            { key: 'email', display: 'Email' },
            { key: 'password', display: 'Password' },
        ]

        const errorFields = { email: '', password: '' }

        dataFields.forEach((field) => {
            const key = field.key as keyof typeof data

            if (!data[key]) {
                valid = false
                errorFields[key] = `${field.display} must not be empty`
            }
        })

        if (valid) {
            adminLogin({
                variables: {
                    email,
                    password,
                },
            })
                .then(({ data }) => {
                    setLoading(false)
                    setUserToken(data.adminLogin)
                    window.location.href = '/questions'
                })
                .catch((error) => {
                    errorNotify(error.message)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }

        setFormErrors(errorFields)
    }

    return (
        <>
            <Head>
                <title>Admin Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid h-full w-full place-items-center ">
                <LoginCard>
                    <div className="flex h-full flex-col justify-center gap-5">
                        <div className="text-center text-[32px] font-semibold leading-[117%] tracking-widest text-neutral-900">
                            ADMIN LOGIN
                        </div>
                        <div>
                            <form
                                className="flex w-full flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <Controller
                                        control={control}
                                        name="email"
                                        defaultValue={''}
                                        render={({ field: { onChange, value } }) => (
                                            <InputField
                                                name="email"
                                                label="Email"
                                                value={value}
                                                onChange={onChange}
                                                isValid={formErrors.email.length === 0}
                                                error={formErrors.email}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name="password"
                                        defaultValue={''}
                                        render={({ field: { onChange, value } }) => (
                                            <InputField
                                                name="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                icon={
                                                    value ? (
                                                        <div
                                                            className="absolute bottom-0.5 right-2.5 -translate-y-1/2 transform cursor-pointer"
                                                            onClick={() => {
                                                                setShowPassword(!showPassword)
                                                            }}
                                                        >
                                                            {showPassword ? (
                                                                <AiOutlineEye className="text-xl" />
                                                            ) : (
                                                                <AiOutlineEyeInvisible className="text-xl" />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )
                                                }
                                                additionalClass="pr-8"
                                                value={value}
                                                onChange={onChange}
                                                isValid={formErrors.password.length === 0}
                                                error={formErrors.password}
                                            />
                                        )}
                                    />
                                </div>
                                <Button
                                    usage="filled"
                                    type="submit"
                                    size="large"
                                    isDisabled={loading}
                                    additionalClass={`w-full h-11 ${
                                        loading ? 'pointer-events-none' : ''
                                    } `}
                                >
                                    {loading ? (
                                        <LoadingSpinner
                                            additionalClass="flex justify-center"
                                            color="white"
                                        />
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </LoginCard>
            </div>
        </>
    )
}

export default AdminLogin
