import * as React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QuestionFilterSection } from '@/components/question-filters/QuestionFilterSection';
import { useQuizModal } from '@/hooks/quiz-modal.hook';
import type { QuestionFilters } from '@/hooks/quiz-modal.hook';
import { Accordion, AccordionContent } from '../ui/accordion';

const CONTENT = {
  title: 'Quiz Setup',
  subtitle: 'Customize your practice session.',
  verseSelection: {
    title: 'Verse Selection',
    options: [
      { label: 'Random', value: 'random' },
      { label: 'By Reference', value: 'byReference' },
      { label: 'Alphabetically', value: 'alphabet' },
    ],
  },
  questionType: {
    title: 'Question Type',
    options: [
      { label: 'Quotes', value: 'quote' },
      { label: 'FTV', value: 'ftv' },
      { label: 'SQ', value: 'SQ:' },
      { label: 'According to', value: 'According to' },
      { label: 'Questions', value: 'question' },
    ],
  },
  numQuestions: {
    title: 'Number of Questions',
    placeholder: '20',
  },
  timer: {
    title: 'Length of Timer (0 = no timer)',
    placeholder: '30',
  },
  speed: {
    title: 'Speed of Text (ms)',
  },
  questionSelection: {
    title: 'Question Selection',
    options: [
      { label: 'By Months', value: 'month' },
      { label: 'By Chapters', value: 'chapter' },
    ],
  },
  months: {
    title: 'Select Months',
    options: [
      { label: 'October', value: 'october' },
      { label: 'November', value: 'november' },
      { label: 'December', value: 'december' },
      { label: 'January', value: 'january' },
      { label: 'February', value: 'february' },
      { label: 'March', value: 'march' },
    ],
  },
  chapters: {
    title: 'Select Chapters',
    options: [],
    empty: 'No chapters loaded yet — populate this from your chapter data source.',
  },
  triggerWords: {
    title: 'Trigger Words',
    options: [
      { label: 'Highlight', value: 'highlight' },
      { label: 'Ignore', value: 'ignore' },
      { label: 'Stop at Word', value: 'stop' },
    ],
  },
  flight: {
    title: 'Flight',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'T', value: 'T' },
    ],
  },
  startButton: 'Start Quiz',
} ;

type QuestionFilterMode = 'MONTHS' | 'BIBLE';

const FILTER_CONTENT = {
  MONTHS: 'Months',
  BIBLE: 'Bible Reference',
} as const;

const BIBLE_BOOKS_HAVE = ['Matthew', 'Mark', 'Luke', 'John'];

export default function DefaultQuizFilters() {
  const { questionFilters, setQuestionFilters } = useQuizModal();

  const updateFilter = <K extends keyof QuestionFilters>(key: K, value: QuestionFilters[K]) => {
    setQuestionFilters((prev) => ({ ...prev, [key]: value }));
  };

  
  const [materialSelected, setMaterialSelected] = React.useState<QuestionFilterMode>('MONTHS');

  return (
    <View className="p-4">
      <View className="flex-row gap-2 mb-4">
        <Button
          onPress={() => setMaterialSelected('MONTHS')}
          variant={materialSelected === 'MONTHS' ? 'default' : 'outline'}
          className="rounded-md flex-1"
        >
          <Text>{FILTER_CONTENT.MONTHS}</Text>
        </Button>
        <Button
          onPress={() => setMaterialSelected('BIBLE')}
          variant={materialSelected === 'BIBLE' ? 'default' : 'outline'}
          className="rounded-md flex-1"
        >
          <Text>{FILTER_CONTENT.BIBLE}</Text>
        </Button>
      </View>

      <View className="mb-4">
        {materialSelected === 'MONTHS' ? (
          <View>
            <QuestionFilterSection
              type='multi'
              name={CONTENT.questionType.title}
              title={CONTENT.months.title}
              options={CONTENT.months.options}
              value={questionFilters?.months}
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
                    name={CONTENT.questionType.title}
                    title={CONTENT.questionType.title}
                    options={CONTENT.chapters.options}
                    value={questionFilters?.chapters}
                    onChange={(val) => updateFilter('chapters', val)}
                  />
                </AccordionContent>
              </Accordion>
            ))}
          </View>
        )}
      </View>

      <QuestionFilterSection
      type='multi'
      name={CONTENT.questionType.title}
        title={CONTENT.questionType.title}
        options={CONTENT.questionType.options}
        value={questionFilters?.questionType}
        onChange={(val) => updateFilter('questionType', val)}
      />

      <QuestionFilterSection
       type='multi'
       name={CONTENT.questionType.title}
        title={CONTENT.flight.title}
        options={CONTENT.flight.options}
        value={questionFilters?.flights}
        onChange={(val) => updateFilter('flights', val)}
      />

    </View>
  );
}