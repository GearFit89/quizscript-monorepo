import { Question } from "./types";

type QuestionKey = keyof Omit<Question, "id">;


/**
 * To be combined with findUniqueTrigger,
 * this fn builds an indexed array that makes finding 
 * the trigger word really easy and fast.
 * 
 * The question are indexed ascending alhpabetically,
 * ingoring case.
 * 
 * 
 * @param questions Questions that will inedexed. Sort doesn't modify this
 * object
 * @param questionKey The key of which we are alphabetically sorting
 * @throws Throws "no data" if data is found.
 * @returns Two array
 */
function buildQuestionIndex (questions: Question[], questionKey: QuestionKey = "question"): string[] {
    // TODO: Add some striping logic to remove numbers and symbols or something, --maybe??
    const sortedQuestions = [...questions].sort((a, b)=>{
        // Make sure this is a string
        const questA = String(a[questionKey] ?? '');
        const questB = String(b[questionKey] ?? '');

        // Ingores case when comparing
        return questA.localeCompare( questB, undefined, { sensitivity: "base"})
    })
    const postions: string [] = [];

    sortedQuestions.forEach((q)=>{
        postions[q.id] = q[questionKey]
    })

    if(postions.length === 0){
        throw new Error("No data")

    }

    return postions;
}