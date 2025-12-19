import { NextRequest } from "next/server"
import { NextResponse } from "next/server"


export async function POST(request: NextRequest) {
try {
    

} catch (error: any) {
return NextResponse.json({error : error?.message || "Error in voting "}, {status : 500})
    
}

}