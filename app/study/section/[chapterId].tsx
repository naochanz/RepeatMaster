import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import { useLocalSearchParams, router } from 'expo-router'
import Header from '@/app/compornents/Header'
import { useEffect } from 'react'

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
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionCount: {
    fontSize: 14,
    color: '#666',
  },
  sectionList: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  questionCount: {
    fontSize: 14,
    color: '#666',
  },
  noSectionContainer: {
    alignItems: 'center',
    padding: 32,
  },
  noSectionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default sectionList