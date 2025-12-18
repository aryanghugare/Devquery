/*
The flow used in this project 
1. imports 
2. interface definitions(This is because we are using typescript in this project)
3. zustand store (immer and persist)
4. store state and methods 
5. Rehydration

*/

// Here set() is similar to state in react redux 


import { create } from "zustand"; // Thus is to create a store in zustand
import { immer } from "zustand/middleware/immer"; // This is to use immer middleware for immutable state updates
import { persist } from "zustand/middleware";

import {AppwriteException , Models , ID} from 'appwrite'
import { account } from "../models/client/config";

export interface UserPrefs {
reputation : number;

}

interface IAuthStore {
session : Models.Session |  null ;
jwt : string | null ;
user : Models.User<UserPrefs> | null ;
hydrated : boolean 

setHydrated() : void ;
verifySession() : Promise<void>
login(
email : string ,
password : string
) : Promise<
{success : boolean,
error? : AppwriteException | null
}>

createAccount(
name : string ,
email : string ,
password : string
) : Promise<
{success : boolean,
error? : AppwriteException | null
}>

logout():Promise<void>
}

// persist is to store everything inside the local storage 

export const useAuthStore = create<IAuthStore>()(
persist(
immer((set)=>({
session : null ,
jwt : null ,
user : null ,
hydrated : false ,

setHydrated() {
set({hydrated:true})
    
},

async verifySession() {
    try {
        const session = await account.getSession("current");
set({session})
    } catch (error) {
        console.log(error)
    }
},

async login(email : string, password : string ) {
    try {
     const session =   await account.createEmailPasswordSession(email,password) 
const [user,{jwt}] = await Promise.all([
account.get<UserPrefs>(),
account.createJWT()
])
if(!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({
reputation : 0 
})
set({session,user,jwt})
return {
success : true }

    } catch (error) {
        console.log(error)
return {
success : false ,
error : error instanceof AppwriteException ? error : null ,
}
    }
},

async createAccount(name:string, email : string, password : string) {
    try {
await account.create(ID.unique(),email,password,name) 
return {
success : true }
} catch (error) {
       console.log(error)
return {
success : false ,
error : error instanceof AppwriteException ? error : null ,
}  
    }

},
async logout() {
    try {
      await account.deleteSessions()
set({session : null, jwt : null ,user : null })
    } catch (error) {
        console.log(error)
    }
},


})),
{
name : "auth",
onRehydrateStorage(){
return (state,error) => {
if(!error) state?.setHydrated()
}

}
}
)

)