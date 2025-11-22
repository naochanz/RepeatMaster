import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import { useQuizBookStore } from './stores/quizBookStore'
import { BookType } from 'lucide-react-native'
import { theme } from '@/constants/Theme'

const ChapterSectionInput = () => {
  const [value, setValue] = useState("");
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const handleChangeText = (text: string) => {
    setValue(text);
    updateCurrentQuizBook({ chapterCount: parseInt(text) || 0 });
  }

  return (
    <Input
      placeholder="登録する章の数を入力（例：5）"
      onChangeText={handleChangeText}
      value={value}
      keyboardType="numeric"
      leftIcon={<BookType size={20} color={theme.colors.primary[600]} />}
    />
  )
}

export default ChapterSectionInput