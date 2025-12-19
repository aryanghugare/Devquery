"use client"
import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '@/src/store/Auth'

function RegisterPage() {
const {createAccount , login} = useAuthStore();
const[isLoading , setIsLoading] = useState(false);
const[error,setError] = useState("");

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{ // Here in the parameter , it can be only e , but it is better to specify 
e.preventDefault();
// collect the data 
const formData = new FormData(e.currentTarget);
// This formData will have all the info which we are taking 
const firstname = formData.get("firstname");
const lastname = formData.get("lastname");
const email = formData.get("email");
const password = formData.get("password")
// validate 
if(!firstname || !lastname || !email || !password){
setError(()=> "Please fill out all the fields")
return ; // This is the typescript thing 
}

// call the store 
setIsLoading(true)
setError("")

const response = await createAccount(`${firstname} ${lastname}`,email?.toString()  ,password?.toString())

if(response.error){
setError(()=> response.error!.message)
}else {
const loginResponse =  await login(email.toString(),password.toString())
if(loginResponse.error){
setError(()=> loginResponse.error!.message)
}
} 
setIsLoading(()=> false)

}
  return (
    <div>
{ error && (
<p>{error}</p>
)}
<form onSubmit={handleSubmit}></form>

</div>
  )
}

export default RegisterPage 