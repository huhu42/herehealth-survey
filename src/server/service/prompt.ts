import {ModelInput} from "~/server/service/model";
//import {Rank, Tenure} from "~/server/service/types";
import {Rank} from "~/server/service/types";


// export const WorkingEnergizerList = ["Assessing", "Supporting", "Challenging", "Encouraging", "Novelizing", "Delivering"]
// const labels = [
//     "Team Closer",
//     "Solo Finisher",
//     "Meticulous Completer",
//     "Spontaneous Dreamer",
//     "Focused Creator",
//     "Deep Innovator",
//     "Group Energizer",
//     "Attentive Coach",
//     "Inspirational Guide",
//     "Bold Instigator",
//     "Solo Critic",
//     "Strategic Challenger",
//     "Casual Aide",
//     "Focused Helper",
//     "Emotional Supporter",
//     "Social Evaluator",
//     "Reserved Analyst",
//     "Mindful Accessor"
// ]

// // TODO set this up as prior context so we do not need to pass this every time
// const WORKING_ENERGIZERS_AND_PERSONALITY_COMPONENT_CONTEXT = `
// The "Working Motivators/Energizers category will involve the following labels:
// 1. Assessing - People with a natural ability to evaluate the workability and feasibility of ideas. They are good 
// curators of what’s going on around them and can recognize patterns. They know how to connect the dots and give people 
// good feedback across a broad range of topics
// 2. Supporting - People with a natural ability to make things happen. They know how to help, when to help, and can flex 
// to whatever the situation calls for,  are people-oriented and want to help realize a vision. This working energizing 
// style provides the support needed to move solutions into the first stages of Implementation.
// 3. Challenging - People who love to speculate and question. They ask questions like, "Why are things the way they are? 
// Is there a better way?" They love to sit in the ambiguity and imagine the possibilities. People with this ability and 
// desire help create the conditions for invention or novelizing.
// 4. Encouraging - People who love to get things moving. They are great at pushing people out of their comfort zone and 
// inspiring them to get started. They enjoy rallying people around an idea and getting them moving in the right direction. 
// 5. Novelizing - People who get joy from taking challenges and generating solutions. They enjoy innovating from scratch 
// and love a blank whiteboard or piece of paper on which they can brainstorm. Invention is the most commonly recognized 
// working energizer, but all energizing factors  are needed to get work done.
// 6. Delivering - People who are task-oriented and love to take things across the finish line. They ensure a project is 
// going to have the impact it’s supposed to have and lives up to agreed-upon standards. They don’t respond to the emotional 
// appeal of the Encouraging people, but to the need to see the work completed. They get joy and energy from checking off a 
// box on the “to do” list.

// Personality components will involve the following labels:
// Attentiveness:
// High: Suited for roles requiring organization and reliability; they might enjoy environments with clear expectations 
// and well-defined goals.
// Low: Might prefer flexible work environments with room for spontaneity and less rigid structures.
// Receptiveness:
// High: Likely to enjoy creative roles, working in innovative environments, and startups that value novel approaches.
// Low: Might prefer well-defined roles and established processes, appreciating a clear structure and traditional approaches.
// Extraversion:
// High: Likely to thrive in collaborative and team-oriented environments, enjoying roles involving social interactions.
// Low (Introversion): Might prefer roles with more independent work and environments that offer spaces for deep focus and 
// reflection.
// Turbulence:
// High: Might prefer environments with stable structures and well-defined roles to help manage stress levels.
// Low: Likely to thrive in dynamic, fast-paced startup environments where adaptability is key, being able to maintain
// composure in stressful situations.
// Agreeableness:
// High: Suited for roles involving cooperation and team coordination, might enjoy environments fostering harmony and 
// collaborative efforts.
// Low: May excel in competitive environments or roles requiring critical negotiation skills, often preferring tasks where 
// they can work autonomously.
// `

// const DESCRIPTION_PROMPT_CONTEXT: string = `
// I need to create short, fun, encouraging, automated descriptions for what a person's working motivators/energizers and 
// personality psychometric results suggest about what kinds of jobs and work environments and startups they would enjoy.
// The following defines generally what someone’s motivators/energizers and personality psychometric results might be. 
// When providing the short paragraph description of what startup roles someone would enjoy, please start with a short list 
// of specific types of startups the person would enjoy. 

// ${WORKING_ENERGIZERS_AND_PERSONALITY_COMPONENT_CONTEXT}

// Based on the person’s responses, provide a detailed paragraph suggesting the specific types of startups and roles 
// they are likely to enjoy and excel in. Condense to one paragraph, and provide a select few examples for what types 
// of startup categories they would be interested in.  Address them in the first person. Please start the suggested 
// description with 3 specific types of startup roles the person would enjoy, and ensure the focus is on what types of 
// startups someone would enjoy rather than explicitly talking about their personality and working motivators.
// Give me an example for how this would work.
// `;

const DESCRIPTION_PROMPT_CONTEXT: string = `
You are a personalized behavioral health coach providing the best morning routine (audio) for a person with specific goals (provided below) and specific metrics (provided below)
Use the miracle morning routine SAVERS (silence, affirmation, visualization, exercise, reading and scribing) framework, come up with specific guided audios for each person.
The whole routine should take between 10 - 15 minutes.
Rules:
- Please start with personalized morning greeting for the listener that is encouraging and motivating - see first name last name below
- Silence: Spend a few minutes to talk about the importance of meditation and mindfulness
- Affirmations: Personalized according to the listeners goals, get them to first listen to the affirmations then repeat after you
- Visualizations: Personalized according to the listeners goals, help them visualize not only the result but also the 
- Exercise: simple exercises to get the blood pumping
- Reading: please summarize a book that is relevant for the listener to achieve their daily goals. You should also include a inspirational quote
- Scribing: provide a prompt that helps them set the right intensions and goals for the day
`;

const GOALS: string = `
Goals:
- I am an entrepreneur working on launching my MVP
- I am working on my fitness and would like to be mindful of my eating habits, make sure I eat clean and exercise
- I'd like to decrease screen time and be more focused
`
export const PersonalGoalList = ["Mental Health: my focus and mental sharpness",
"Physical Health: increase my level of physical activies",
"Energy Level: have more energy to complete my daily tasks",
"Sleep & Rest: improve my sleep quality and feel more rested",
"Diet & Nutrition: be more minfdul with what I eat and nourish my body",
"Addiction: work on getting rid of my bad habits"]

function topPersonalGoals(goalsRank: Rank) {
    return `The top 3 goals this person is working on are:
    1. ${PersonalGoalList[goalsRank[0]!]},
    2. ${PersonalGoalList[goalsRank[1]!]}, 
    3. ${PersonalGoalList[goalsRank[2]!]}`;
    //, 4. ${PersonalGoalList[goalsRank[3]!]}, 
    //5. ${PersonalGoalList[goalsRank[4]!]}, 6. ${PersonalGoalList[goalsRank[5]!]}`;
}

function getPersonalInfo(firstName: string, lastName: string): string {
    return `
    The person's name is: ${firstName} ${lastName}
    `;
}

const FORMATTING_INSTRUCTIONS: string = `
Please format your responses using the following guidelines:
- Use JSON formatting
- Start each section of the SAVERS practice in a seperate paragraph with a space in between
- Example:
    {Silence:xxxxx,
    Affirmations:xxxxx,
    Visualizations:xxxxx,
    Exercise:xxxxx,
    Reading:xxxxx,
    Scribing:xxxxx}
`

export function inputToDescriptionPrompt(input: ModelInput): string {
    console.log("input");
    console.log(input); // This will print the input to the console
    let personalinfo = getPersonalInfo(input.firstName, input.lastName)
    let complete_prompt = DESCRIPTION_PROMPT_CONTEXT + "\n" +
    topPersonalGoals(input[0]) + "\n" +
    personalinfo + "\n" +
    FORMATTING_INSTRUCTIONS;
    console.log(complete_prompt); 
    return complete_prompt;
}


// workingMotivators(input["0"]) + "\n" +
        // personalityComponents(input) + "\n" +
        //"Make it short and focus on what startups they'd be interested in rather than their inputted traits." + "\n"
        //tenureContext(input.tenure)
// function workingMotivators(workingMotivatorsRank: Rank) {
//     return `For example, this persons working motivators/energizers rank most highly, in the following order of:
//     1. ${WorkingEnergizerList[workingMotivatorsRank[0]!]}, 2. ${WorkingEnergizerList[workingMotivatorsRank[1]!]}, 
//     3. ${WorkingEnergizerList[workingMotivatorsRank[2]!]}, 4. ${WorkingEnergizerList[workingMotivatorsRank[3]!]}, 
//     5. ${WorkingEnergizerList[workingMotivatorsRank[4]!]}, 6. ${WorkingEnergizerList[workingMotivatorsRank[5]!]}`;
// }

// function personalityComponents(input: ModelInput) {
//     return `For his personality components, they rank on a scale of 1-100 (low to high):
//     Attentiveness: ${input["1"].toString()}/100
//     Receptiveness: ${input["2"].toString()}/100
//     Extraversion: ${input["3"].toString()}/100
//     Turbulence: ${input["4"].toString()}/100
//     Please : ${input["5"].toString()}/100`
// }


