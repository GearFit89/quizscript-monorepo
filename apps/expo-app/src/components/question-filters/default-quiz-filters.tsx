
import { View } from 'react-native';
import { QuestionFilterSection } from '@/components/question-filters/question-filter-section';
import { useQuizSetup } from '@/hooks/quiz-setup.hook';
import MaterialSelection from './material';
import { useSetupContent } from '@/hooks';


export default function DefaultQuizFilters() {
  const { filterSection } = useSetupContent()
  const { updateQuestionFilters: updateFilter , data } = useQuizSetup();
  const { questionFilters } = data;
  
  return (
    <View className="p-4">
     

      <QuestionFilterSection
      type='multi'
      name={filterSection.questionType.title}
        title={filterSection.questionType.title}
        options={filterSection.questionType.options}
        value={questionFilters?.questionType ?? [] }
        onChange={(val) => updateFilter('questionType', val)}
      />

      <QuestionFilterSection
       type='multi'
       name={filterSection.questionType.title}
        title={filterSection.flight.title}
        options={filterSection.flight.options}
        value={questionFilters?.flights ?? []}
        onChange={(val) => updateFilter('flights', val)}
      />

    </View>
  );
}

