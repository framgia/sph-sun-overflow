import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function successNotify(message: string, position: any = 'top-right') {
    return toast.success(message, {
        position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })
}

export function errorNotify(message: string, position: any = 'top-right') {
    return toast.error(message, {
        position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })
}

export function formProcessToast(
    promise: any,
    loadingMessage: string,
    successMessage: string,
    errorMessage: string
) {
    return toast.promise(promise, {
        pending: loadingMessage,
        success: {
            render() {
                const qlEditor = document.getElementsByClassName('ql-editor')
                qlEditor[1].innerHTML = ''
                return successMessage
            },
        },
        error: errorMessage,
    })
}
