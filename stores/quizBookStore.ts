// stores/quizBookStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockQuizBooks } from '@/mockData/mockQuizBooks';

interface QuizBook {
  id: string;
  title: string;
  chapterCount: number;
  chapters: Chapter[];
  currentRate: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  chapterRate: number;
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
  isLoading: boolean;

  // アクション
  setCurrentQuizBook: (quizBook: Partial<QuizBook>) => void;
  updateCurrentQuizBook: (updates: Partial<QuizBook>) => void;
  addQuizBook: (quizBook: QuizBook) => Promise<void>;
  clearCurrentQuizBook: () => void;
  addChapter: (chapter: Chapter) => void;
  updateChapter: (chapterIndex: number, updates: Partial<Chapter>) => void;
  addSection: (chapterIndex: number, section: Section) => void;
  updateSection: (chapterIndex: number, sectionIndex: number, updates: Partial<Section>) => void;
  setQuestionCount: (chapterIndex: number, sectionIndex: number, count: number) => void;
  fetchQuizBooks: () => Promise<void>;
  getQuizBookById: (id: string) => QuizBook | undefined;
  getChapterById: (chapterId: string) => { book: QuizBook; chapter: Chapter } | undefined;
  getSectionById: (sectionId: string) => { book: QuizBook; chapter: Chapter; section: Section; } | undefined;
}

// AsyncStorageのキー
const STORAGE_KEY = 'quizBooks';

// AsyncStorageへの保存
const saveToStorage = async (quizBooks: QuizBook[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quizBooks));
    console.log('💾 AsyncStorageに保存しました');
  } catch (e) {
    console.error('💥 保存エラー:', e);
  }
};

// AsyncStorageからの読み込み
const loadFromStorage = async (): Promise<QuizBook[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      console.log('📖 AsyncStorageから読み込みました');
      return JSON.parse(data);
    }
    console.log('📭 保存データがないため、モックデータを使用');
    return mockQuizBooks as QuizBook[];
  } catch (e) {
    console.error('💥 読み込みエラー:', e);
    return mockQuizBooks as QuizBook[];
  }
};

export const useQuizBookStore = create<QuizBookStore>((set, get) => ({
  // 初期状態
  currentQuizBook: null,
  quizBooks: [],
  isLoading: false,

  // アクション
  setCurrentQuizBook: (quizBook) => set({ currentQuizBook: quizBook }),

  updateCurrentQuizBook: (updates) => set((state) => ({
    currentQuizBook: state.currentQuizBook
      ? { ...state.currentQuizBook, ...updates }
      : updates
  })),

  addQuizBook: async (quizBook) => {
    const newQuizBooks = [...get().quizBooks, quizBook];
    set({ quizBooks: newQuizBooks, currentQuizBook: null });
    await saveToStorage(newQuizBooks);
  },

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
      // 章の問題数設定(節なしの場合)
      chapters[chapterIndex].questionCount = count;
    }
    return {
      currentQuizBook: { ...state.currentQuizBook, chapters }
    };
  }),

  fetchQuizBooks: async () => {
    set({ isLoading: true });
    const quizBooks = await loadFromStorage();
    set({ quizBooks, isLoading: false });
  },

  getQuizBookById: (id) => {
    return get().quizBooks.find(book => book.id === id);
  },

  getChapterById: (chapterId) => {
    for (const book of get().quizBooks) {
      const chapter = book.chapters.find(ch => ch.id === chapterId);
      if (chapter) {
        return { book, chapter };
      }
    }
    return undefined;
  },

  getSectionById: (sectionId) => {
    for (const book of get().quizBooks) {
      for (const chapter of book.chapters) {
        const section = chapter.sections?.find(sec => sec.id === sectionId);
        if (section) {
          return { book, chapter, section };
        }
      }
    }
    return undefined;
  },
}));