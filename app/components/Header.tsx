import LoginStatus from "./LoginStatus";

export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full p-4">
            <nav className="max-w-0-5xl mx-auto flex justify-between items-center">
                <h1 className="font-bold text-xl">FlowDeck</h1>
                <LoginStatus/>
            </nav>
        </header>
    )
}