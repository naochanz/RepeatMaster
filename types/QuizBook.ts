export interface QuizBook{
  id?: string;
  title?: string;
  currentRound?: number;
  correctRate?: number;
  lastStudyDate?: Date;
  isAddButton?: boolean;  
};