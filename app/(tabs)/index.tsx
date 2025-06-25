import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Header from '../compornents/Header';
import QuizBookCard from '../compornents/QuizBookCard';

export default function HomeScreen() {

  const dummyQuizBook = {
    id: '1',
    title: 'FP3級',
    currentRound: 3,
    totalRounds: 5,
    correctRate: 85,
    lastStudyDate: new Date(),
  };

  const handleCardPress = () => {
    console.log('カードがタップされました');
  };

  return (
    <>
      <View>
        <Header />
      </View>
      <View>
        <ScrollView style={styles.content}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>登録済み問題集</Text>
          </View>
          {/* 問題集がない場合の表示 */}
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>まだ問題集が登録されていません</Text>
          </View>
        </ScrollView>
      </View>
      <QuizBookCard
        quizBook={dummyQuizBook}
        onPress={handleCardPress}
      />
      <TouchableOpacity style={styles.addButton}>
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButtonText}>+ 問題集を追加</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    padding: 10,
    backgroundColor: '#9bbdbf',
  },
  content: {

  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  emptyState: {

  },
  emptyText: {

  },
  addButton: {
    width: '48%',  // 2列なので48%（余白考慮）
    aspectRatio: 1,  // 正方形
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 15,
  },
});
