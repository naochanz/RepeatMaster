import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { useQuizBookStore } from '@/stores/quizBookStore';
import { BookMarked } from 'lucide-react-native'
import { theme } from '@/constants/Theme'

const QuizBookNameInput = () => {
  const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const [value, setValue] = useState(currentQuizBook?.title || '');

  // 編集モード時、既存データを反映
  useEffect(() => {
    if (currentQuizBook?.title) {
      setValue(currentQuizBook.title);
    } else {
      setValue(''); // クリア
    }
  }, [currentQuizBook?.title]); 

  const handleChangeText = (text: string) => {
    setValue(text);
    updateCurrentQuizBook({ title: text });
  }

  return (
    <Input
      placeholder="例：FP3級、英語検定2級"
      onChangeText={handleChangeText}
      value={value}
      leftIcon={<BookMarked size={20} color={theme.colors.primary[600]} />}
    />
  )
}

export default QuizBookNameInput