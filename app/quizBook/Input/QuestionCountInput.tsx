import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useQuizBookStore } from './stores/quizBookStore';
import { theme } from '@/constants/Theme';
import { BookOpen, Hash } from 'lucide-react-native';

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
      <View style={styles.labelContainer}>
        <BookOpen size={18} color={theme.colors.primary[600]} />
        <Text style={styles.label}>{displayTitle}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Hash size={20} color={theme.colors.secondary[400]} style={styles.icon} />
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={questionCount}
          onChangeText={handleChangeText}
          placeholder="問題数を入力"
          placeholderTextColor={theme.colors.secondary[400]}
        />
      </View>
    </View>
  )
}

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
export default QuestionCountInput