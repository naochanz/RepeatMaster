import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useQuizBookStore } from './stores/quizBookStore';

interface QuestionCountInputprops {
  chapterNumber: number;  // 第1章、第2章...
  chapterIndex: number;   // 配列のインデックス（0, 1, 2...）
  sectionNumber: number;  // 第1節、第2節...
  sectionIndex: number;   // 配列のインデックス（0, 1, 2...）
}

const QuestionCountInput = ({ chapterNumber, chapterIndex, sectionNumber, sectionIndex }: QuestionCountInputprops) => {
  const [questionCount, setQuestionCount] = useState('');
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const handleChangeText = (text: string) => {
    setQuestionCount(text);

    const currentQuizBook = useQuizBookStore.getState().currentQuizBook;
    const chapters = currentQuizBook?.chapters || [];

    chapters[chapterIndex] = {
      id: `chapter-${chapterIndex}`,
      title: `第${chapterNumber}章`,
      chapterNumber,
    };

    
  }

  return (
    <View>
      <Text>QuestionCountInput</Text>
    </View>
  )
}

export default QuestionCountInput