import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { PrismaClient } from "@prisma/client/extension";
import { error } from "console";

const prisma = new PrismaClient();

// interface Users {
//     id: string;
//     content: string;
// }

export async function POST (request: Request) {
    // check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"}, {status: 401}
        )
    }
    const userId = session.user.id;


    // get the card content from the body
    const  body = await request.json();
    const {content} = body;

    if(!content || typeof content != 'string' || content.trim() === '') {
        return  NextResponse.json(
            {error: "Content is required"}, { status: 400 }
        )
    }

    try {
        // create the new Card in the database
        const newCard = await prisma.create({
            data: {
            content: content,
            userId: userId
        }})
        return NextResponse.json({newCard}, {status: 201});
    } 
    catch (error) {
        console.error("Error creating card:", error);
        return NextResponse.json({
            error: "Could not create the card"
        }, {status: 500})
    }
}