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
    const count = parseInt(text) || 0;
    const currentQuizBook = useQuizBookStore.getState().currentQuizBook;
    const chapters = [...(currentQuizBook?.chapters || [])];

    const exsistingChapter = chapters[chapterIndex]

    chapters[chapterIndex] = {
      id: exsistingChapter?.id || `chapter-${chapterIndex}`,
      title: exsistingChapter?.title || `第${chapterNumber}章`,
      chapterNumber,
      sections: count > 0
        ? Array.from({ length: count }, (_, i) => ({
          id: `section-${chapterIndex}-${i}`,
          title: `第${i + 1}節`,
          sectionNumber: i + 1,
          questionCount: 0
        }))
        : undefined,
      questionCount: exsistingChapter?.questionCount //既存の問題数を保持
    };

    updateCurrentQuizBook({ chapters });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>第{chapterNumber}章の節数：</Text>
      <TextInput
        style={styles.input}
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