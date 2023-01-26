const client = typeof window !== "undefined";

export const getUserToken = () =>{
    if(client){
        const encrypted_token = localStorage.getItem('token');
        
        return  encrypted_token ? window.atob(encrypted_token) : ''
    }
}

export const setUserToken = (value : string) => {
    if(client){
        localStorage.setItem('token', window.btoa(value))
    }
}
