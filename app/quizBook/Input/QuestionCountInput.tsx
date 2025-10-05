import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useQuizBookStore } from './stores/quizBookStore';

interface QuestionCountInputprops {
  title: string,
  chapterNumber: number;  // 第1章、第2章...
  chapterIndex: number;   // 配列のインデックス（0, 1, 2...）
  sectionNumber?: number;  // 第1節、第2節...
  sectionIndex?: number;   // 配列のインデックス（0, 1, 2...）
}

const QuestionCountInput = ({ 
  title, 
  chapterNumber, 
  chapterIndex, 
  sectionNumber, 
  sectionIndex = -1 }: QuestionCountInputprops) => {
  const [questionCount, setQuestionCount] = useState('');
  const setQuestionCountStore = useQuizBookStore(state => state.setQuestionCount);

  const handleChangeText = (text: string) => {
    setQuestionCount(text);

    const count = parseInt(text) || 0;
    setQuestionCountStore(chapterIndex, sectionIndex, count);
  };

  const displayTitle = sectionNumber
  ? `第${chapterNumber}章 第${sectionNumber}節 ${title}`
  : `第${chapterNumber}章 ${title}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}：</Text>
      <TextInput
      style={styles.input} 
      keyboardType='numeric' 
      value={questionCount} 
      onChangeText={handleChangeText} 
      placeholder="問題数を入力">
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
export default QuestionCountInput