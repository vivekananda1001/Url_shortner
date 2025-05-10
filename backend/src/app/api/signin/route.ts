import { prismaclient } from "@/app/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { withCors } from "@/app/lib/cors";
export async function POST(req: Request){
    const body = await req.json();
    const { email, password } = body;

    const user = await prismaclient.user.findUnique({
        where:{
            email: email
        }
    })  

    // console.log(user?.password);
    if(!user || !(await bcrypt.compare(password, user.password))){
        return withCors(NextResponse.json(
            { message: "Incorrect Credentials" },
            { status: 401 }
        ));
    }

    return withCors(NextResponse.json(
        { message: "Signed in Succesfully!" },
        { status: 200 }
    ));
}

export function OPTIONS() {
    return withCors(new NextResponse(null, { status: 204 }));
}