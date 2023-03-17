import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import type { Id } from 'react-toastify'

export function successNotify(message: string, position: any = 'top-right'): Id {
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

export function errorNotify(message: string, position: any = 'top-right'): Id {
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

export async function formProcessToast(
    promise: any,
    loadingMessage: string,
    successMessage: string,
    errorMessage: string
): Promise<unknown> {
    return await toast.promise(promise, {
        pending: loadingMessage,
        success: successMessage,
        error: errorMessage,
    })
}
