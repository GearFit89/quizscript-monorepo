import { QuizMode } from "@bq/shared/types";


interface Button  {
      title: string;
      description: string;
   };
export interface PracticeContent {
   flashCardButton: Button;
   contentButton: Button;
}

export interface Content {
    practicePage: PracticeContent;

}