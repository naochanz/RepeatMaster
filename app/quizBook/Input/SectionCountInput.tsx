// app/quizBook/Input/SectionCountInput.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useQuizBookStore } from './stores/quizBookStore';
import { theme } from '@/constants/Theme';
import { Layers, Hash } from 'lucide-react-native';

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
      <View style={styles.labelContainer}>
        <Layers size={18} color={theme.colors.primary[600]} />
        <Text style={styles.label}>第{chapterNumber}章の節数</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Hash size={20} color={theme.colors.secondary[400]} style={styles.icon} />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sectionCount}
          onChangeText={handleChangeText}
          placeholder="節の数を入力"
          placeholderTextColor={theme.colors.secondary[400]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
    ...theme.shadows.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.secondary[900],
    fontFamily: theme.typography.fontFamilies.bold,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderWidth: 1.5,
    borderColor: theme.colors.secondary[200],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.secondary[900],
    fontFamily: theme.typography.fontFamilies.regular,
  },
});

export default SectionCountInput;