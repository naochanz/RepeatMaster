// stores/quizBookStore.ts
import { create } from 'zustand';

interface QuizBook {
  id: string;
  title: string;
  chapters: Chapter[];
  createdAt: Date;
  updatedAt: Date;
}

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  sections?: Section[];
  questionCount?: number;
}

interface Section {
  id: string;
  title: string;
  sectionNumber: number;
  questionCount: number;
}

interface QuizBookStore {
  // 状態
  currentQuizBook: Partial<QuizBook> | null;
  quizBooks: QuizBook[];
  
  // アクション
  setCurrentQuizBook: (quizBook: Partial<QuizBook>) => void;
  updateCurrentQuizBook: (updates: Partial<QuizBook>) => void;
  addQuizBook: (quizBook: QuizBook) => void;
  clearCurrentQuizBook: () => void;
  addChapter: (chapter: Chapter) => void;
  updateChapter: (chapterIndex: number, updates: Partial<Chapter>) => void;
  addSection: (chapterIndex: number, section: Section) => void;
  updateSection: (chapterIndex: number, sectionIndex: number, updates: Partial<Section>) => void;
  setQuestionCount: (chapterIndex: number, sectionIndex: number, count: number) => void;
}

export const useQuizBookStore = create<QuizBookStore>((set, get) => ({
  // 初期状態
  currentQuizBook: null,
  quizBooks: [],
  
  // アクション
  setCurrentQuizBook: (quizBook) => set({ currentQuizBook: quizBook }),
  
  updateCurrentQuizBook: (updates) => set((state) => ({
    currentQuizBook: state.currentQuizBook 
      ? { ...state.currentQuizBook, ...updates }
      : updates
  })),
  
  addQuizBook: (quizBook) => set((state) => ({
    quizBooks: [...state.quizBooks, quizBook],
    currentQuizBook: null // 追加後はクリア
  })),
  
  clearCurrentQuizBook: () => set({ currentQuizBook: null }),

  addChapter: (chapter) => set((state) => ({
    currentQuizBook: state.currentQuizBook 
      ? { 
          ...state.currentQuizBook, 
          chapters: [...(state.currentQuizBook.chapters || []), chapter] 
        }
      : { chapters: [chapter] }
  })),
  
  updateChapter: (chapterIndex, updates) => set((state) => {
    const chapters = [...(state.currentQuizBook?.chapters || [])];
    chapters[chapterIndex] = { ...chapters[chapterIndex], ...updates };
    return {
      currentQuizBook: { ...state.currentQuizBook, chapters }
    };
  }),
  
  addSection: (chapterIndex, section) => set((state) => {
    const chapters = [...(state.currentQuizBook?.chapters || [])];
    chapters[chapterIndex] = {
      ...chapters[chapterIndex],
      sections: [...(chapters[chapterIndex].sections || []), section]
    };
    return {
      currentQuizBook: { ...state.currentQuizBook, chapters }
    };
  }),
  
  updateSection: (chapterIndex, sectionIndex, updates) => set((state) => {
    const chapters = [...(state.currentQuizBook?.chapters || [])];
    chapters[chapterIndex].sections![sectionIndex] = {
      ...chapters[chapterIndex].sections![sectionIndex],
      ...updates
    };
    return {
      currentQuizBook: { ...state.currentQuizBook, chapters }
    };
  }),
  
  setQuestionCount: (chapterIndex, sectionIndex, count) => set((state) => {
    const chapters = [...(state.currentQuizBook?.chapters || [])];
    if (sectionIndex >= 0) {
      // 節の問題数設定
      chapters[chapterIndex].sections![sectionIndex].questionCount = count;
    } else {
      // 章の問題数設定（節なしの場合）
      chapters[chapterIndex].questionCount = count;
    }
    return {
      currentQuizBook: { ...state.currentQuizBook, chapters }
    };
  }),
}));