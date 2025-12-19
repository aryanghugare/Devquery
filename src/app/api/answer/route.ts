import { databases , users } from "@/src/models/server/config";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { answerCollection, db } from "@/src/models/name";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/src/store/Auth";

// This route handles creating answers in the form of documents in the database.
export async function POST(request: NextRequest) {
try {
   const { questionId, answer , authorId } =  await request.json();

const response =  await databases.createDocument(db,answerCollection,ID.unique(),{
content : answer,
authorId : authorId,
questionId : questionId,
})
// Increase author reputation 


 const prefs = await users.getPrefs<UserPrefs>(authorId)
await users.updatePrefs(authorId,{
reputation : Number(prefs.reputation) + 1 
})

return NextResponse.json(response, {status : 201})

} catch (error : any) {
return NextResponse.json({error : error?.message || "Error creating answer "}, {status : 500})
    
}

}

export async function DELETE(request: NextRequest) {
try {
    const { answerId } =  await request.json();
// databases.deleteDocument(db,answerCollection,answerId)
// get the doc 
const answer =  await databases.getDocument(db,answerCollection,answerId);
// validate 
if(!answer) {
return NextResponse.json({error : "Answer you are deleting is not found "}, {status : 404})
}

// Delete the doc 
 const response =  await databases.deleteDocument(db,answerCollection,answerId);


// decrease author reputation

 const prefs = await users.getPrefs<UserPrefs>(answer.authorId)
await users.updatePrefs(answer.authorId,{
reputation : Number(prefs.reputation) - 1 
})

return NextResponse.json(response, {status : 207})


} catch (error: any) {
return NextResponse.json({error : error?.message || "Error deleting answer "}, {status : 500})

    
}


}