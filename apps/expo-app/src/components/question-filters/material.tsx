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
import { getChapters, BIBLE_BOOKS } from "@bq/shared/utils";
import { BibleKey } from "@bq/shared/types";

type QuestionFilterMode = "MONTHS" | "BIBLE";

const FILTERS = {
  MONTHS: "Months",
  BIBLE: "Bible Reference",
} as const;

export default function MaterialSelection() {
  const { filterSection } = useSetupContent();
  const {
    updateQuestionFilters: updateFilter,
    data,
    updateBibleRef,
  } = useQuizSetup();
  const { questionFilters } = data;

  const [openBook, setOpenBook] = useState<string>("");
  const [materialSelected, setMaterialSelected] =
    useState<QuestionFilterMode>("MONTHS");

  console.log(filterSection.questionType, filterSection.chapters);

  return (
    <View>
      <View className="mb-4 flex-row gap-2">
        <Button
          onPress={() => setMaterialSelected("MONTHS")}
          variant={materialSelected === "MONTHS" ? "default" : "outline"}
          className="flex-1 rounded-md"
        >
          <Text>{FILTERS.MONTHS}</Text>
        </Button>
        <Button
          onPress={() => setMaterialSelected("BIBLE")}
          variant={materialSelected === "BIBLE" ? "default" : "outline"}
          className="flex-1 rounded-md"
        >
          <Text>{FILTERS.BIBLE}</Text>
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
            onValueChange={(value: string | undefined) =>
              setOpenBook(value ?? "")
            }
            collapsible
          >
            {Object.keys(BIBLE_BOOKS).map((bookName) => (
              <AccordionItem key={bookName} value={`material-${bookName}`}>
                <AccordionTrigger>
                  <Text>{bookName}</Text>
                </AccordionTrigger>

                <AccordionContent>
                  <QuestionFilterSection
                    type="multi"
                    name={filterSection.questionType.title}
                    title={filterSection.questionType.title}
                    options={getChapters(bookName as BibleKey).map((c) => ({
                      label: String(c),
                      value: String(c),
                    }))}
                    value={
                      questionFilters?.chapters[bookName as BibleKey] ?? []
                    }
                    onChange={(val) =>
                      updateBibleRef(bookName as BibleKey, val)
                    }
                    isWrapLayout
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
