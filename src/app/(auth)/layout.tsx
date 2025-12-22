"use client" ;
// This file is wrapper around all the pages inside the auth folder 

import React from "react"
import { useAuthStore } from "@/src/store/Auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Layout = ({children} : {children : React.ReactNode}) =>{
const {session} = useAuthStore()
const router = useRouter()

useEffect(()=>{
if(session){
router.push("/")
}
},
[session,router])

if (session) {
    return null
  }

return (
<div className="">
<div className="">
{children}
</div>
</div>

)

}


export default Layout 