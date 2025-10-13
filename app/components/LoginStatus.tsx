"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function LoginStatus() {

    // the below hook provides the  session data and login status
    const {data: session, status} = useSession();

    if(status === "loading") {
        return <p>Loading...</p>
    }

    // if session exists that means user is logged in
    if(session) {
        return (
            <div>
                <p>Sign in as</p><strong>{session.user?.email}</strong>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }

    // if no session the user is not logged in
    return (
        <div>
            <p>Not signed in</p>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
            <br />
            <button onClick={() => signIn("github")}>Sign in with Github</button>
        </div>
    )
}