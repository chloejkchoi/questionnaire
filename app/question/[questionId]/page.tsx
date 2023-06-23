// I set the entire page client component, but if I had more time, i would separate out
// so that the part that fetches data stays a server component
// and have a child that uses client state.
"use client"

import { QUESTIONS } from "@/app/data"
import { IOption, IQuestion } from "@/app/interfaces"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { nanoid } from "nanoid"

export default function Question({ params }: { params: { questionId: string } }) {
  // Want to use this cookie for storing the submission.
  if (Cookies.get("token") === undefined) {
    Cookies.set("token", nanoid())
  }

  const router = useRouter()

  const stubGetQuestionById = (id: string): IQuestion | undefined => {
    // Another API stub for getting single question by ID.
    // For now, find the question by iterating through the QUESTIONS array.
    for (let i: number = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].id === id) {
        return QUESTIONS[i]
      }
    }
  }

  const question = stubGetQuestionById(params.questionId)
  if (question === undefined) {
    // This question doesn't exists so should return an error page.
    // TODO: make error page
    return <div>Doesn't exist</div>
  }
  const selectString = question.type === 1 ? "Select one" : "Select all that applies"

  // We need some client state to know which option user has selected.
  const [options, setOptions] = useState<IOption[]>(question.options)

  const onOptionClick = (index: number): void => {
    const newOptions = [...options]
    if (question.type === 1 && !newOptions[index].selected) {
      for (let i: number = 0; i < newOptions.length; i++) {
        newOptions[i].selected = false
      }
    }
    newOptions[index].selected = !newOptions[index].selected
    setOptions(newOptions)
  }

  let highestPriority: number = -1
  let requirementId = ""
  options.forEach((option) => {
    if (
      option.selected &&
      option.requirement !== undefined &&
      option.requirement.priority > highestPriority
    ) {
      highestPriority = option.requirement.priority
      requirementId = option.requirement.requirementId
    }
  })

  const onQuestionaireSubmit = (): void => {
    // Should put the submission info to the db to persist the result for this user.
    // Would put the token from Cookies.get("token") and requirementId.
    // This is empty for now since I did not setup the db.
  }

  const isLastQuestion: boolean = question.stepsLeft == 0
  let anyOptionSelected: boolean = false
  let nextQuestionId: string = ""
  for (let i: number = 0; i < options.length; i++) {
    if (options[i].selected === true) {
      anyOptionSelected = true
      if (options[i].nextQuestionId) {
        nextQuestionId = options[i].nextQuestionId!
      }
      break
    }
  }

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="bg-white p-12 w-full md:w-2/3 lg:w-1/2 2xl:w-1/3">
        <div className="flex flex-col w-full gap-4">
          <h1 className="font-semibold text-2xl text-slate-900">{question.text}</h1>
          <p className="font-semibold text-slate-700">{selectString}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 w-full mt-12">
          {options.map((option: IOption, index: number) => {
            const optionClassName = classNames(
              "text-lg font-semibold block rounded-lg p-6 shadow-md hover:bg-gray-50",
              { "ring-1 ring-slate-300 ": !option.selected },
              { "ring ": option.selected }
            )
            return (
              <div
                key={option.id}
                className={optionClassName}
                onClick={(): void => onOptionClick(index)}
              >
                <p>{option.text}</p>
              </div>
            )
          })}
        </div>
        <div className="flex justify-end gap-4 mt-14">
          <button
            type="button"
            className="font-semibold py-2.5 px-8 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => router.back()}
          >
            Back
          </button>
          {isLastQuestion && anyOptionSelected && (
            <Link href={`/result/${requirementId}`}>
              <button
                type="submit"
                className="font-semibold py-2.5 px-8 rounded-lg ring-1 bg-blue-600 text-white hover:bg-blue-800"
                onSubmit={onQuestionaireSubmit}
              >
                Next
              </button>
            </Link>
          )}
          {!isLastQuestion && anyOptionSelected && (
            <Link href={`/question/${nextQuestionId}`}>
              <button
                type="button"
                className="font-semibold py-2.5 px-8 rounded-lg ring-1 bg-blue-600 text-white hover:bg-blue-800"
              >
                Next
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
