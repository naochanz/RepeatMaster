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
  questionAnswers?: QuestionAnswer[];
}

interface Section {
  id: string;
  title: string;
  sectionNumber: number;
  questionCount: number;
  questionAnswers?: QuestionAnswer[];
}

interface QuestionAnswer {
  questionNumber: number;
  memo?: string;
  attempts: {
    round: number;
    result: '○' | '×';
    resultConfirmFlg: boolean;
    answeredAt: Date;
  }[];
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
  saveAnswer: (chapterId: string, sectionId: string | null, questionNumber: number, result: '○' | '×') => Promise<void>;
  toggleAnswerLock: (chapterId: string, sectionId: string | null, questionNumber: number) => void;
  saveMemo: (chapterId: string, sectionId: string | null, questionNumber: number, memo: string) => Promise<void>;
  getQuestionAnswers: (chapterId: string, sectionId: string | null, questionNumber: number) => QuestionAnswer | undefined;
  updateLastAnswer: (chapterId: string, sectionId: string | null, questionNumber: number, result: '○' | '×') => Promise<void>;
  deleteLastAnswer: (chapterId: string, sectionId: string | null, questionNumber: number) => Promise<void>;
  deleteQuizBook: (id: string) => Promise<void>;
  updateQuizBook: (id: string, updates: Partial<QuizBook>) => Promise<void>;
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

  saveAnswer: async (chapterId, sectionId, questionNumber, result) => {
    const updatedQuizBooks = get().quizBooks.map(book => {
      const updatedChapters = book.chapters.map(chapter => {
        if (chapter.id !== chapterId) return chapter;

        // ヘルパー関数: 問題回答を更新
        const updateQuestionAnswer = (answers: QuestionAnswer[] = []) => {
          const existing = answers.find(qa => qa.questionNumber === questionNumber);

          if (existing) {
            // 既存問題に新しい周回追加
            return answers.map(qa =>
              qa.questionNumber === questionNumber
                ? {
                  ...qa,
                  attempts: [
                    ...qa.attempts,
                    { round: qa.attempts.length + 1, result, resultConfirmFlg: false, answeredAt: new Date() }
                  ]
                }
                : qa
            );
          } else {
            // 新しい問題追加
            return [
              ...answers,
              {
                questionNumber,
                attempts: [{ round: 1, result, resultConfirmFlg: false, answeredAt: new Date() }]
              }
            ];
          }
        };

        // 節がある場合
        if (sectionId && chapter.sections) {
          return {
            ...chapter,
            sections: chapter.sections.map(section =>
              section.id === sectionId
                ? { ...section, questionAnswers: updateQuestionAnswer(section.questionAnswers) }
                : section
            )
          };
        }

        // 章に直接保存
        return { ...chapter, questionAnswers: updateQuestionAnswer(chapter.questionAnswers) };
      });

      return { ...book, chapters: updatedChapters };
    });

    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

  // 回答をロック/アンロック
  toggleAnswerLock: (chapterId, sectionId, questionNumber) => {
    const updatedQuizBooks = get().quizBooks.map(book => ({
      ...book,
      chapters: book.chapters.map(chapter => {
        if (chapter.id !== chapterId) return chapter;

        const toggleLock = (answers: QuestionAnswer[] = []) =>
          answers.map(qa =>
            qa.questionNumber === questionNumber
              ? {
                ...qa,
                attempts: qa.attempts.map((att, idx) =>
                  idx === qa.attempts.length - 1
                    ? { ...att, resultConfirmFlg: !att.resultConfirmFlg }
                    : att
                )
              }
              : qa
          );

        if (sectionId && chapter.sections) {
          return {
            ...chapter,
            sections: chapter.sections.map(section =>
              section.id === sectionId
                ? { ...section, questionAnswers: toggleLock(section.questionAnswers) }
                : section
            )
          };
        }

        return { ...chapter, questionAnswers: toggleLock(chapter.questionAnswers) };
      })
    }));

    set({ quizBooks: updatedQuizBooks });
  },

  // メモを保存
  saveMemo: async (chapterId, sectionId, questionNumber, memo) => {
    const updatedQuizBooks = get().quizBooks.map(book => ({
      ...book,
      chapters: book.chapters.map(chapter => {
        if (chapter.id !== chapterId) return chapter;

        const updateMemo = (answers: QuestionAnswer[] = []) =>
          answers.map(qa =>
            qa.questionNumber === questionNumber ? { ...qa, memo } : qa
          );

        if (sectionId && chapter.sections) {
          return {
            ...chapter,
            sections: chapter.sections.map(section =>
              section.id === sectionId
                ? { ...section, questionAnswers: updateMemo(section.questionAnswers) }
                : section
            )
          };
        }

        return { ...chapter, questionAnswers: updateMemo(chapter.questionAnswers) };
      })
    }));

    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

  // 特定問題の回答履歴を取得
  getQuestionAnswers: (chapterId, sectionId, questionNumber) => {
    const data = sectionId
      ? get().getSectionById(sectionId)
      : get().getChapterById(chapterId);

    if (!data) return undefined;

    const answers = sectionId
      ? (data as any).section.questionAnswers
      : (data as any).chapter.questionAnswers;

    return answers?.find((qa: QuestionAnswer) => qa.questionNumber === questionNumber);
  },

  updateLastAnswer: async (chapterId: string, sectionId: string | null, questionNumber: number, result: '○' | '×') => {
    const updatedQuizBooks = get().quizBooks.map(book => ({
      ...book,
      chapters: book.chapters.map(chapter => {
        if (chapter.id !== chapterId) return chapter;

        const updateResult = (answers: QuestionAnswer[] = []) =>
          answers.map(qa =>
            qa.questionNumber === questionNumber
              ? {
                ...qa,
                attempts: qa.attempts.map((att, idx) =>
                  idx === qa.attempts.length - 1 ? { ...att, result } : att
                )
              }
              : qa
          );

        if (sectionId && chapter.sections) {
          return {
            ...chapter,
            sections: chapter.sections.map(section =>
              section.id === sectionId
                ? { ...section, questionAnswers: updateResult(section.questionAnswers) }
                : section
            )
          };
        }

        return { ...chapter, questionAnswers: updateResult(chapter.questionAnswers) };
      })
    }));

    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

  deleteLastAnswer: async (chapterId: string, sectionId: string | null, questionNumber: number) => {
    const updatedQuizBooks = get().quizBooks.map(book => ({
      ...book,
      chapters: book.chapters.map(chapter => {
        if (chapter.id !== chapterId) return chapter;

        const deleteResult = (answers: QuestionAnswer[] = []) =>
          answers.map(qa => {
            if (qa.questionNumber !== questionNumber) return qa;

            const newAttempts = qa.attempts.slice(0, -1);
            return { ...qa, attempts: newAttempts };
          }).filter(qa => qa.attempts.length > 0);

        if (sectionId && chapter.sections) {
          return {
            ...chapter,
            sections: chapter.sections.map(section =>
              section.id === sectionId
                ? { ...section, questionAnswers: deleteResult(section.questionAnswers) }
                : section
            )
          };
        }

        return { ...chapter, questionAnswers: deleteResult(chapter.questionAnswers) };
      })
    }));

    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

  deleteQuizBook: async(id: string) =>{
    const updatedQuizBooks = get().quizBooks.filter(book => book.id !== id);
    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

  updateQuizBook: async (id: string, updates: Partial<QuizBook>) => {
    const updatedQuizBooks = get().quizBooks.map(book =>
      book.id === id ? { ...book, ...updates, updatedAt: new Date() } : book
    );
    set({ quizBooks: updatedQuizBooks });
    await saveToStorage(updatedQuizBooks);
  },

}));