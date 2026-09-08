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
 * @returns A fn (getPosOf) and the indexed questions
 */
function buildQuestionIndex (questions: Question[], questionKey: QuestionKey = "question"){

    const sortedQuestions = cleanSort(questions, questionKey)
    const postions: number[] = [];

    sortedQuestions.forEach((q, i)=>{
        postions[q.id] = i;
    })

    if(postions.length === 0){
        throw new Error("No data")

    }

    return {
        getPosOf: (id: number)=> postions[id],
        indexed: sortedQuestions
    }
}

function rmSymbols(string: string){
    return string.replace(/[^\w\s]/g, "");
}
function cleanSpaces(string: string){
    return string.replace(/\s+/g, " ").trim();
}



export const cleanSort= <T extends Record<string|number, any>> (data: T [], key: keyof T = "question"): T[] =>
     data.map(item=> ({
    [key]:rmSymbols(item[key]),
    ...item
    })).sort((a, b)=>{

        // Make sure this is a string
        const questA = String(a[key] ?? '');
        const questB = String(b[key] ?? '');

        // Ingores case when comparing
        return questA.localeCompare( questB, undefined, { sensitivity: "base"})
});

function extractWordIndex(words: string[], charIndex: number, isSpace: boolean = false): number{
    let count = 0;

    if(isSpace && charIndex !== 0) charIndex--; // Go back to the word, that's not the edge space

    for ( let i = 0; i > words.length; i++){
        
        count += words[i].length

        if(count > charIndex){
            return i;
        }

        const isLastIndex = i === words.length -1;
    !isLastIndex && count ++; // Accounts for spaces
    }
    return -1

}