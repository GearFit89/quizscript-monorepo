import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { DifficultyLevel, QuizMode } from '@bq/shared/types';
import { View } from 'lucide-react-native';
import { IconKey } from '@/lib/content/icons.content';
import { createContext } from 'react';
import { QuizModalVariant } from './types';


interface QuizModalProps {
  variant: QuizModalVariant;
  children: React.ReactNode;
};

const QuizModalContext = createContext({});
 




QuizModal.QuestionFilters = () => {

}
QuizModal.QuizStartButton = () => {

}
export const variantMap: Record< string, React.ComponentType > = {
  // TODO: Add more variants as needed


};
export function QuizModal({  variant, children }: QuizModalProps) {
  const VariantComponent = variantMap[variant];

  if(!VariantComponent) {
    console.error("Component", variant, "Doesn't exist")
  }


  return (
   <QuizModalContext.Provider value={{}} >
     <Dialog>
      {/* */}
    

    
        < DialogContent>
         <DialogTitle>Quiz Options</DialogTitle>
        {/* Modal content */}
          <VariantComponent />

        </DialogContent>
      </Dialog>
    </QuizModalContext.Provider>
  );
}

