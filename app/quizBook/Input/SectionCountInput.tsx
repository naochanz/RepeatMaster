// app/quizBook/Input/SectionCountInput.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useQuizBookStore } from './stores/quizBookStore';

interface SectionCountInputProps {
  chapterNumber: number;  // 第1章、第2章...
  chapterIndex: number;   // 配列のインデックス（0, 1, 2...）
}

const SectionCountInput = ({ chapterNumber, chapterIndex }: SectionCountInputProps) => {
  const [sectionCount, setSectionCount] = useState('');
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const handleChangeText = (text: string) => {
    setSectionCount(text);

    // Zustandに保存
    const currentQuizBook = useQuizBookStore.getState().currentQuizBook;
    const chapters = currentQuizBook?.chapters || [];

    chapters[chapterIndex] = {
      id: `chapter-${chapterIndex}`,
      title: `第${chapterNumber}章`,
      chapterNumber,
    };

    updateCurrentQuizBook({ chapters });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>第{chapterNumber}章の節数：</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={sectionCount}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
});

export default SectionCountInput;