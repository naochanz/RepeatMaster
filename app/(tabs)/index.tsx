import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Header from '../compornents/Header';
import QuizBookCard from '../compornents/QuizBookCard';
import { Icon } from 'react-native-elements';
import { router } from 'expo-router';

export default function HomeScreen() {

  const handleAddQuiz = () => {
    router.push('/quizBook/Add');
  }

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

  const handleCardPress = () => {
    console.log('カードがタップされました');
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      {item.isAddButton ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddQuiz}
        >
          <Text style={styles.addButtonText}>{item.title}</Text>
        </TouchableOpacity>
      ) : (
        <QuizBookCard
          quizBook={item}
          onPress={handleCardPress}
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
                  <Icon name="warning" color='red' size={20} />
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
  },
  sectionContainer: {
    padding: 10,
    backgroundColor: '#9bbdbf',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  flatListContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,           // 行間の調整
  },
  cardWrapper: {
    width: '48%',
    aspectRatio: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContent: {
    flexDirection: 'row',     // 横並び
    alignItems: 'center',     // 縦方向の中央揃え
    justifyContent: 'center', // 横方向の中央揃え
  },
  emptyText: {
    marginLeft: 8,           // アイコンとテキストの間隔
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    minHeight: 200,
  },
  addButton: {
    width: '100%',           // cardWrapper内で100%
    height: '100%',          // cardWrapper内で100%
    backgroundColor: '#f0f0f0',  // 薄いグレー
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',   // 点線（追加ボタンらしく）
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
});
