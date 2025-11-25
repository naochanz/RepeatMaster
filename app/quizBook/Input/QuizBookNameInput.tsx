import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import { useQuizBookStore } from './stores/quizBookStore'

const QuizBookNameInput = () => {
  const [value, setValue] = useState('');
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const handleChangeText = (text: string) => {
    setValue(text);
    updateCurrentQuizBook({ title: text });
  }

  return (
    <Input
      placeholder="例：FP3級、英語検定2級"
      onChangeText={handleChangeText}
      value={value}
    />
  )
}

export default QuizBookNameInput