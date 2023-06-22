// Hardcoded question data

export const QUESTIONS = [
  {
    id: "question-1",
    type: 1,
    text: "What residential work are you doing?",
    stepsLeft: 1,
    options: [
      {
        id: "option-1",
        text: "Interior work",
        nextQuestionId: "question-2",
      },
      {
        id: "option-2",
        text: "Exterior work",
        nextQuestionId: "question-3",
      },
    ],
  },
  {
    id: "question-2",
    type: 2,
    text: "What type of interior work are you doing?",
    stepsLeft: 0,
    options: [
      {
        id: "option-3",
        text: "New bathroom",
        requirement: { requirementId: "otc-with-plan", priority: 900 },
      },
      {
        id: "option-4",
        text: "New laundry room",
        requirement: { requirementId: "otc-with-plan", priority: 900 },
      },
      {
        id: "option-5",
        text: "Bathroom remodel",
        requirement: { requirementId: "otc-without-plan", priority: 800 },
      },
      {
        id: "option-6",
        text: "Other",
        requirement: { requirementId: "otc-without-plan", priority: 800 },
      },
    ],
  },
  {
    id: "question-3",
    type: 2,
    text: "What type of exterior work are you doing?",
    stepsLeft: 0,
    options: [
      {
        id: "option-7",
        text: "Garage door replacement",
        requirement: { requirementId: "otc-with-plan", priority: 900 },
      },
      {
        id: "option-8",
        text: "Work on exterior doors",
        requirement: { requirementId: "otc-with-plan", priority: 900 },
      },
      {
        id: "option-9",
        text: "Re-roofing",
        requirement: { requirementId: "otc-without-plan", priority: 800 },
      },
      {
        id: "option-10",
        text: "Building fences less than 6 feet",
        requirement: { requirementId: "no-permit", priority: 0 },
      },
      {
        id: "option-11",
        text: "Other",
        requirement: { requirementId: "in-house", priority: 1000 },
      },
    ],
  },
]

export const REQUIREMENTS = [
  {
    id: "in-house",
    priority: 1000,
    name: "In-House Review Process",
    specifications: [
      "A building permit is required.",
      "Include plan sets.",
      "Submit application for the in-house review.",
    ],
  },
  {
    id: "otc-with-plan",
    priority: 900,
    name: "Over-the-Counter Submission Process",
    specifications: [
      "A building permit is required.",
      "Include plan sets.",
      "Submit application for the OTC review.",
    ],
  },
  {
    id: "otc-without-plan",
    priority: 800,
    name: "Over-the-Counter Submission Process",
    specifications: ["A building permit is required.", "Submit application for the OTC review."],
  },
  {
    id: "no-permit",
    priority: 0,
    name: "No Permit",
    specifications: ["Nothing is required! You're set to build."],
  },
]
