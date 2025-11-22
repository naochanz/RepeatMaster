import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Header from '../compornents/Header';
import QuizBookCard from '../compornents/QuizBookCard';
import { router } from 'expo-router';
import { useQuizBookStore } from '../quizBook/Input/stores/quizBookStore';
import { theme } from '@/constants/Theme';
import { Plus, AlertCircle } from 'lucide-react-native';

export default function HomeScreen() {
  
  const handleAddQuiz = () => {
    router.push('/quizBook/AddQuizBook');
  }

  const handleCardPress = (quizBookId: string) => {
    router.push({
      pathname: '/study/[id]',
      params: { id: quizBookId },
    });
  };

  {/* 後ほどAPI作成しGETで取得*/ }
  const dummyQuizBook = [
    {
      id: '1',
      title: 'FP3級',
      currentRound: 3,
      totalRounds: 5,
      correctRate: 85,
      lastStudyDate: new Date(),
    }, {
      id: '2',
      title: 'FP3級',
      currentRound: 3,
      totalRounds: 5,
      correctRate: 85,
      lastStudyDate: new Date()
    }, {
      id: '3',
      title: 'FP3級',
      currentRound: 3,
      totalRounds: 5,
      correctRate: 85,
      lastStudyDate: new Date()
    },
    {
      id: 'addButton',
      title: '+ 問題集を追加',
      isAddButton: true,
    }
  ]

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      {item.isAddButton ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddQuiz}
          activeOpacity={0.7}
        >
          <Plus size={32} color={theme.colors.primary[600]} strokeWidth={2.5} />
          <Text style={styles.addButtonText}>問題集を追加</Text>
        </TouchableOpacity>
      ) : (
        <QuizBookCard
          quizBook={item}
          onPress={() => { handleCardPress(item.id) }}
        />
      )
      }
    </View>
  )


  return (
    <>
      <View>
        <Header />
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>登録済み問題集</Text>
          </View>
          {dummyQuizBook.length === 1 ? (
            <View>
              <View style={styles.emptyState}>
                <View style={styles.emptyContent}>
                  <AlertCircle size={20} color={theme.colors.warning[600]} />
                  <Text style={styles.emptyText}>まだ問題集が登録されていません</Text>
                </View>
              </View>
              <FlatList
                data={dummyQuizBook}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.flatListContainer}
              />
            </View>

          ) : (
            <FlatList
              data={dummyQuizBook}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary[200],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.secondary[900],
    fontFamily: 'NotoSansJP-Bold',
  },
  flatListContainer: {
    padding: theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  cardWrapper: {
    width: '48%',
    aspectRatio: 1,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.secondary[600],
    fontFamily: 'NotoSansJP-Regular',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
    minHeight: 200,
  },
  addButton: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 2,
    borderColor: theme.colors.primary[300],
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  addButtonText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.bold,
    fontFamily: 'NotoSansJP-Bold',
  },
});
