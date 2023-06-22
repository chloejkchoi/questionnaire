export enum EQuestionType {
  single,
  multi,
}

export interface IPriority {
  requirementId: string
  priority: number
}

export interface IQuestion {
  id: string
  type: EQuestionType
  text: string
  stepsLeft: number
  options: IOption[]
}

export interface IOption {
  id: string
  text: string
  nextQuestionId?: string
  requirement?: IPriority
  selected?: boolean
}

export interface IRequirement {
  id: string
  priority: number
  name: string
  specifications: string[]
}
