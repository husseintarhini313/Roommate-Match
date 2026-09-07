const API_URL= import.meta.env.VITE_API_URL;

if(!API_URL){
        throw new Error("VITE_API_URL is not defined in .env")
}

export async function apiFetch<T>(path:string,options?: RequestInit): Promise <T>{

    const fullPath= `${API_URL}${path}`;
    const token = localStorage.getItem("token");

    const isFormData= options?.body instanceof FormData;
    
    const response=await fetch(fullPath,{
        headers:{
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? {Authorization: `Bearer ${token}`}:{})
        },
        ...options
    });

    if(response.status===401){
        localStorage.removeItem("token");
        window.location.href= "/signin";
        throw new Error("Session expired");
    }

    if(!response.ok){
        const errorData= await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
}

export function isLoggedIn(){
    return !!localStorage.getItem("token");
}