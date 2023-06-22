import Link from "next/link"
import { QUESTIONS } from "./data"

export default function Home() {
  // If the backend was set up, it would fetch this info from the backend.
  const stubGetFirstQuestionId = (): string => {
    return QUESTIONS[0].id
  }
  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="bg-white py-24 px-12">
        <div className="flex flex-col items-center w-full gap-6">
          <h1 className="font-bold text-3xl text-slate-900 text-center">
            Welcome to PermitFlow Beta!
          </h1>
          <h2 className="font-semibold text-2xl text-slate-800 mt-10 text-center">
            Do you have a residential job in San Francisco?
          </h2>
          <p className="text-md text-slate-700 text-center">
            Find out if you'll need a permit for your work and how to obtain them.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-14">
          <Link href={`/question/${stubGetFirstQuestionId()}`}>
            <button className="py-2.5 px-8 w-48 rounded-lg ring-1 font-semibold bg-blue-600 text-white hover:bg-blue-700">
              Let's go!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
