import React, { useState, useEffect } from 'react'
import { useQuizBookStore } from '@/stores/quizBookStore';
import CounterInput from '@/app/compornents/CounterInput';


interface ChapterSectionInputProps {
  isEditMode?: boolean;
}

const ChapterSectionInput = ({ isEditMode = false }: ChapterSectionInputProps) => {
  const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);
  
  const [chapterCount, setChapterCount] = useState<number | undefined>(
    currentQuizBook?.chapterCount
  );

  useEffect(() => {
    if (currentQuizBook?.chapterCount !== undefined) {
      setChapterCount(currentQuizBook.chapterCount);
    } else if (!isEditMode) {
      setChapterCount(undefined); // 新規作成時は空
    }
  }, [currentQuizBook?.chapterCount, isEditMode]);

  const handleIncrement = () => {
    const current = chapterCount || 0;
    const newCount = current + 1;
    setChapterCount(newCount);
    updateCurrentQuizBook({ chapterCount: newCount });
    
    // 新しい章を追加
    if (currentQuizBook?.chapters) {
      const newChapter = {
        id: `chapter-${currentQuizBook.chapters.length}`,
        title: `${currentQuizBook.chapters.length + 1}章`,
        chapterNumber: currentQuizBook.chapters.length + 1,
        chapterRate: 0,
      };
      updateCurrentQuizBook({ 
        chapters: [...currentQuizBook.chapters, newChapter]
      });
    }
  };

  const handleDecrement = () => {
    const current = chapterCount || 0;
    if (current > 1) {
      const newCount = current - 1;
      setChapterCount(newCount);
      updateCurrentQuizBook({ chapterCount: newCount });
      
      if (currentQuizBook?.chapters) {
        const updatedChapters = currentQuizBook.chapters.slice(0, -1);
        updateCurrentQuizBook({ chapters: updatedChapters });
      }
    }
  };

  const handleChangeValue = (text: string) => {
    const num = parseInt(text);
    if (!isNaN(num)) {
      setChapterCount(num);
      updateCurrentQuizBook({ chapterCount: num });
    } else {
      setChapterCount(undefined);
      updateCurrentQuizBook({ chapterCount: 0 });
    }
  }

  return (
    <CounterInput
      label="章数"
      value={chapterCount !== undefined ? chapterCount : ''}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      disabled={(chapterCount || 0) <= 1}
      isEditMode={isEditMode}
      onChangeText={!isEditMode ? handleChangeValue : undefined}
      placeholder="登録する章の数を入力（例：5）"
    />
  )
}


export default ChapterSectionInput