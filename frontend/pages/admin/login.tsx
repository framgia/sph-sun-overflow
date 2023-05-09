import Button from '@/components/atoms/Button'
import { CustomIcons } from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
const { LoadingSpinner } = CustomIcons

type FormValues = {
    email: string
    password: string
}

const AdminLogin: NextPage = () => {
    // const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const {
        handleSubmit,
        control,
        // reset
    } = useForm<FormValues>({
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
            console.log(email, password)
            setLoading(false)
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
                <div className="flex h-96 rounded border border-neutral-200 bg-neutral-white">
                    <div className="mr-5 grid w-96 place-items-center bg-gradient-to-t from-primary-200">
                        <div>
                            <Image
                                height="104"
                                width="104"
                                alt="Sun Bear Logo"
                                className="mx-auto"
                                src="/images/sun_logo.png"
                            />
                            <div className="mt-1 flex justify-center text-3xl font-bold">
                                <div className="text-primary-base">Sun</div>
                                <div className="text-neutral-900">Overflow</div>
                            </div>
                            <div className="mt-2 text-center text-base tracking-widest text-neutral-700">
                                <div>
                                    <div>Where your</div>
                                    <div>programming questions</div>
                                    <div>are answered</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-5 w-96 bg-neutral-white p-8">
                        <div className="text-center text-3xl font-semibold tracking-widest text-neutral-900">
                            ADMIN LOGIN
                        </div>
                        <div className=" mt-7">
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
                                        <LoadingSpinner additionalClass="flex justify-center" />
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
