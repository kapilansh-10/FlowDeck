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
            <div className="flex items-center gap-4">
                <p className="text-sm text-neutral-400">{session.user?.email}</p>
                <button 
                    onClick={() => signOut()}
                    className="px-3 py-1 text-sm bg-neutral-800 text-white rounded-md hover:bg-neutral-700"
                >
                    Sign out
                </button>
            </div>
        )
    }

    // if no session the user is not logged in
    return (
        <div className="flex items-center gap-4">
            <button 
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="px-3 py-1 text-sm bg-neutral-100 text-black rounded-md hover:bg-neutral-300"
            >
                Sign in with Google
            </button>
            <button 
                onClick={() => signIn("github")}
                className="px-3 py-1 text-sm bg-neutral-800 text-white rounded-md hover:bg-neutral-700"
            >
                Sign in with Github
            </button>
        </div>
    )
}