import { prismaclient } from "@/app/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { withCors } from "@/app/lib/cors";

export async function POST(req: Request){
    const body = await req.json();
    const { email, password } = body;
    const hashedpass = await bcrypt.hash(password,3);
    // console.log("SignUp backend hit succesfully!")
    const existingUser = await prismaclient.user.findUnique({
        where:{
            email: email
        }
    });

    if(existingUser){
        return withCors(NextResponse.json(
            { message: "Email already in use!" },
            { status: 409 }
        ));
    }

    try{
        await prismaclient.user.create({
            data: {
                email,
                password: hashedpass,
            },
        })
    
        return withCors(NextResponse.json(
            { message: "Successfully Signed up!" },
            { status: 200 }
        ));
    }   
    catch(err){
        return withCors(NextResponse.json(
            { message: "Some unknown error occured" },
            { status: 401 }
        ));
    }
}

export function OPTIONS() {
    return withCors(new NextResponse(null, { status: 204 }));
}