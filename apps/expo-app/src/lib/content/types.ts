import { QuizMode } from "@bq/shared/types";
import { IconKey } from "../icons";
type Strict<T> = T & { [k: string]: never };

interface Button  {
      title: string;
      description: string;
   };
export interface PracticeContent {
   flashCardButton: Button;
   contentButton: Button;
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
   }

}
export interface Content {
    practicePage: PracticeContent;
    setup: SetupContent;
   

}