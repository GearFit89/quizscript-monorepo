

import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { QuestionFilterSection } from '@/components/question-filters/question-filter-section';
import { useQuizSetup } from '@/hooks/quiz-setup.hook';
import { Accordion, AccordionContent } from '../ui/accordion';
import { useState } from 'react';
import { useSetupContent } from '@/hooks';

type QuestionFilterMode = 'MONTHS' | 'BIBLE';

const FILTER_filterSection = {
  MONTHS: 'Months',
  BIBLE: 'Bible Reference',
} as const;

const BIBLE_BOOKS_HAVE = ['Matthew', 'Mark', 'Luke', 'John'];


export default function MaterialSelection () {
  const { filterSection } = useSetupContent()
  const { updateQuestionFilters: updateFilter , data } = useQuizSetup();
  const { questionFilters } = data;

  
  const [materialSelected, setMaterialSelected] = useState<QuestionFilterMode>('MONTHS');


  return (
     <View >
        <View className="flex-row gap-2 mb-4">
        <Button
          onPress={() => setMaterialSelected('MONTHS')}
          variant={materialSelected === 'MONTHS' ? 'default' : 'outline'}
          className="rounded-md flex-1"
        >
          <Text>{FILTER_filterSection.MONTHS}</Text>
        </Button>
        <Button
          onPress={() => setMaterialSelected('BIBLE')}
          variant={materialSelected === 'BIBLE' ? 'default' : 'outline'}
          className="rounded-md flex-1"
        >
          <Text>{FILTER_filterSection.BIBLE}</Text>
        </Button>
      </View>

      <View className="mb-4">
        {materialSelected === 'MONTHS' ? (
          <View>
            <QuestionFilterSection
              type='multi'
              name={filterSection.questionType.title}
              title={filterSection.months.title}
              options={filterSection.months.options}
              value={questionFilters?.months ?? []}
              onChange={(val) => updateFilter('months', val)}
            />
          </View>
        ) : (
          <View>
            {BIBLE_BOOKS_HAVE.map((bibleBook) => (
              <Accordion key={bibleBook} type="single">
                <View>
                  <Text>{bibleBook}</Text>
                </View>
                <AccordionContent>
                  <QuestionFilterSection
                    type='multi'
                    name={filterSection.questionType.title}
                    title={filterSection.questionType.title}
                    options={filterSection.chapters.options}
                    value={questionFilters?.chapters ?? []}
                    onChange={(val) => updateFilter('chapters', val)}
                  />
                </AccordionContent>
              </Accordion>
            ))}
          </View>
        )}
      </View>
      </View>
  )
}


