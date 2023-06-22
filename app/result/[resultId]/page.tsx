"use client"

import { REQUIREMENTS } from "@/app/data"
import { IRequirement } from "@/app/interfaces"
import classNames from "classnames"
import { useRouter } from "next/navigation"

const stubGetRequirementById = (id: string): IRequirement | undefined => {
  for (let i: number = 0; i < REQUIREMENTS.length; i++) {
    if (REQUIREMENTS[i].id === id) {
      return REQUIREMENTS[i]
    }
  }
}

export default function Result({ params }: { params: { resultId: string } }) {
  const router = useRouter()

  const requirement = stubGetRequirementById(params.resultId)
  if (requirement === undefined) {
    // TODO: make error page
    return <div>Doesn't exist</div>
  }
  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="bg-white py-12 md:py-24 px-12 w-full lg:w-1/2 2xl:w-1/3">
        <div className="flex flex-col w-full gap-4">
          <h1 className="font-bold text-3xl text-slate-900">You need...</h1>
          <h2 className="font-semibold text-2xl text-slate-800 mt-10">{requirement.name}</h2>
        </div>
        <ul className="list-disc list-inside gap-4 mt-6">
          {requirement.specifications.map((spec: string, index: number) => {
            const isLast: boolean = index == requirement.specifications.length - 1
            const liClassName = classNames("text-lg text-slate-800 w-full py-4", {
              "border-b-2 border-neutral-100 border-opacity-100 dark:border-opacity-50": !isLast,
            })
            return (
              <li key={index} className={liClassName}>
                {spec}
              </li>
            )
          })}
        </ul>
        <div className="flex justify-end gap-4 mt-14">
          <button
            type="button"
            className="font-semibold py-2.5 px-8 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => router.back()}
          >
            Back
          </button>
          <a href="/">
            <button className="py-2.5 px-8 rounded-lg ring-1 font-semibold bg-blue-600 text-white hover:bg-blue-700">
              Restart
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
