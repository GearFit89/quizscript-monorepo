import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { QuestionFilterSection } from "@/components/question-filters/question-filter-section";
import { useQuizSetup } from "@/hooks/quiz-setup.hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
import { useSetupContent } from "@/hooks";

type QuestionFilterMode = "MONTHS" | "BIBLE";

const FILTER_filterSection = {
  MONTHS: "Months",
  BIBLE: "Bible Reference",
} as const;

const BIBLE_BOOKS_HAVE = ["Matthew", "Mark", "Luke", "John"];



function getChapters(bibleBook: string){
  

}
export default function MaterialSelection() {
  const { filterSection } = useSetupContent();
  const { updateQuestionFilters: updateFilter, data } = useQuizSetup();
  const { questionFilters } = data;

  const [openBook, setOpenBook] = useState<string>("")
  const [materialSelected, setMaterialSelected] =
    useState<QuestionFilterMode>("MONTHS");

    console.log(filterSection.questionType, filterSection.chapters)

  return (
    <View>
      <View className="mb-4 flex-row gap-2">
        <Button
          onPress={() => setMaterialSelected("MONTHS")}
          variant={materialSelected === "MONTHS" ? "default" : "outline"}
          className="flex-1 rounded-md"
        >
          <Text>{FILTER_filterSection.MONTHS}</Text>
        </Button>
        <Button
          onPress={() => setMaterialSelected("BIBLE")}
          variant={materialSelected === "BIBLE" ? "default" : "outline"}
          className="flex-1 rounded-md"
        >
          <Text>{FILTER_filterSection.BIBLE}</Text>
        </Button>
      </View>

      <View className="mb-4">
        {materialSelected === "MONTHS" ? (
          <View>
            <QuestionFilterSection
              type="multi"
              name={filterSection.questionType.title}
              title={filterSection.months.title}
              options={filterSection.months.options}
              value={questionFilters?.months ?? []}
              onChange={(val) => updateFilter("months", val)}
            />
          </View>
        ) : (
          <Accordion 
              
              type="single"
              value={openBook}
              onValueChange={setOpenBook as ()=> void} // Sliences the ts compiler, because it can't recongize react state as returning void
              collapsible
           >
            {BIBLE_BOOKS_HAVE.map((bibleBook) => (
              <AccordionItem key={bibleBook} value={`material-${bibleBook}`}>

                <AccordionTrigger>
                  <Text>{bibleBook}</Text>
                </AccordionTrigger>

                <AccordionContent>
                  <QuestionFilterSection
                    type="multi"
                    name={filterSection.questionType.title}
                    title={filterSection.questionType.title}
                    options={filterSection.chapters.options}
                    value={questionFilters?.chapters ?? []}
                    onChange={(val) => updateFilter("chapters", val)}
                  />
                 
                </AccordionContent>
              </AccordionItem>

            ))}
          </Accordion>
        )}
      </View>
    </View>
  );
}
