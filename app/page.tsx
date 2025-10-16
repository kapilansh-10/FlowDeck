import Header from "./components/Header";
import LoginStatus from "./components/LoginStatus";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Organize Your Workflow, Unleash your focus.
          </h1>
          <p className="text-lg text-neutral-400 mb-8">
            FlowDeck is the simple, visual Kanban board to help you manage tasks, track progress, and get things done
          </p>
        </div>
      </main>
    </>
  );
}
