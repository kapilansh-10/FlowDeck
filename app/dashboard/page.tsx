import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";


// define a type for our Card data for TypeScript
type Card = {
    id: string;
    content: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    createdAt: string;
}

// function to fetch cards from our own API
async function getCards() {
    // we get the cookies from the incoming request
    const cookie = (await headers()).get('cookie');

    // we fetch data from our own API, passing the session cookie
    const res = await fetch("http://localhost:3000/api/cards", {
        headers: { 'cookie': cookie || "" }
    })

    // if(!res.ok) {
    //     throw Error('Failed to fetch cards');
    // }
    return res.json();
}


export default async function DashBoardPage() {

    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    // fetch the cards for logged-in users
    const cards: Card[] = await getCards()

    return (
        <main>
            <h1>Welcome</h1>
            <p>Here are the cards:</p>

            <div>
                {cards.length > 0 ? (
                    <ul>
                        {cards.map((card) => (
                            <li>
                                <p>{card.content}</p>
                                <small>Status: {card.status}</small>
                            </li>
                        ))}
                    </ul>
                ): (
                    <p>You have no cards yet. Let's create one!</p>
                )}
            </div>
        </main>
    )
}