import { QuizMode } from "@bq/shared/types";
import { IconKey } from "../icons";


interface Button  {
      title: string;
      description: string;
   };
export interface PracticeContent {
   flashCardButton: Button;
   contentButton: Button;
}

export interface Option {
  label: string;
  value: string;
}

export interface QuizFilterSection {
  title: string;
  subtitle: string;
  verseSelection: {
    title: string;
    options: Option[];
  };
  questionType: {
    title: string;
    options: Option[];
  };
  numQuestions: {
    title: string;
    placeholder: string;
  };
  timer: {
    title: string;
    placeholder: string;
  };
  speed: {
    title: string;
  };
  questionSelection: {
    title: string;
    options: Option[];
  };
  months: {
    title: string;
    options: Option[];
  };
  chapters: {
    title: string;
    options: Option[]; // Assuming same structure as other options arrays
    empty: string;
  };
  triggerWords: {
    title: string;
    options: Option[];
  };
  flight: {
    title: string;
    options: Option[];
  };
  startButton: string;
}
interface SetupMode {
         icon: IconKey;
         description: string;
         title: string;
}
interface SetupModes {
   "normal": SetupMode;
   
}
interface TimedSetupModes extends SetupModes {
   "timed": SetupMode;


}

export interface SetupContent {
   standard: {
      modes: TimedSetupModes
   },
   filterSection: QuizFilterSection


}
export interface Content {
    practicePage: PracticeContent;
    setup: SetupContent;
   

}