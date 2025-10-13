import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client/extension";

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

export async function GET (request: Request) {
    
    // getting the session and protect the route
    const session = await getServerSession(authOptions);
    if(!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
    }

    const userId = session.user.id;
    
    try {
        const cards = await prisma.card.findMany({
            where: {
                userId: userId
            }
        })
        return NextResponse.json(cards, {status: 200})
    } catch (error) {
        console.error("Error fetching cards", error);
        return NextResponse.json({error: "Could not fetch cards"}, {status: 500})
    }
}