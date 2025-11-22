import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import { useLocalSearchParams, router } from 'expo-router'
import Header from '@/app/compornents/Header'
import { theme } from '@/constants/Theme'
import Card from '@/components/ui/Card'

const sectionList = () => {
  const { chapterId } = useLocalSearchParams();
  const { quizBooks, fetchQuizBooks, getChapterById } = useQuizBookStore();
  const chapterData = getChapterById(String(chapterId));

  useEffect(() => {
    if (quizBooks.length === 0) {
      fetchQuizBooks();
    }
  }, []);

  if (!chapterData) {
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text>章が見つかりません</Text>
        </View>
      </>
    );
  }

  const { chapter } = chapterData;
  const sections = chapter.sections || [];
  const handleSections = (sectionId: string) => {
    router.push(`/study/question/${sectionId}`);
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            第{chapter.chapterNumber}章
          </Text>
          <Text style={styles.sectionCount}>
            全{sections.length}節
          </Text>
        </View>

        <View style={styles.sectionList}>
          {sections.length > 0 ? (
            sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={styles.sectionCard}
                onPress={() => handleSections(section.id)}
              >
                <Text style={styles.sectionNumber}>
                  第{section.sectionNumber}節
                </Text>
                <Text style={styles.sectionTitle}>
                  {section.title}
                </Text>
                <Text style={styles.questionCount}>
                  {section.questionCount}問
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noSectionContainer}>
              <Text style={styles.noSectionText}>
                この章には節がありません
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleSections(chapter.id)}
              >
                <Text style={styles.startButtonText}>
                  問題を開始
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary[200],
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.secondary[900],
    fontFamily: theme.typography.fontFamilies.bold,
  },
  sectionCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.secondary[600],
    fontFamily: theme.typography.fontFamilies.regular,
  },
  sectionList: {
    padding: theme.spacing.md,
  },
  sectionCard: {
    backgroundColor: theme.colors.neutral.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },
  sectionNumber: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary[600],
    marginBottom: 4,
    fontFamily: theme.typography.fontFamilies.bold,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.secondary[900],
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.fontFamilies.bold,
  },
  questionCount: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.secondary[600],
    fontFamily: theme.typography.fontFamilies.regular,
  },
  noSectionContainer: {
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  noSectionText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.secondary[600],
    marginBottom: theme.spacing.lg,
    fontFamily: theme.typography.fontFamilies.regular,
  },
  startButton: {
    backgroundColor: theme.colors.primary[600],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  startButtonText: {
    color: theme.colors.neutral.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.bold,
    fontFamily: theme.typography.fontFamilies.bold,
  },
})
export default sectionList