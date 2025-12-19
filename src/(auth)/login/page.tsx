"use client"
import { useAuthStore } from '@/src/store/Auth'
import React from 'react'
import { useState } from 'react';

function LoginPage() {
const {login} = useAuthStore()
const[isLoading , setIsLoading] = useState(false);
const[error,setError] = useState("");

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{ // Here in the parameter , it can be only e , but it is better to specify 
e.preventDefault();
// collect the data 
const formData = new FormData(e.currentTarget);
const email = formData.get("email");
const password = formData.get("password");

// validate 
if(!email || !password){
setError(()=> "Please fill out all the fields")
return ; 
}
// call the store and login
setIsLoading(true)
setError("")

const loginResponse =  await login(email.toString(),password.toString())

if(loginResponse.error){
setError(()=> loginResponse.error!.message )
}
setIsLoading(()=> false)

}
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage