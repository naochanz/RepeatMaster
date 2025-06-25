
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { QuizBook } from '@/types/QuizBook'

interface QuizBookCardProps {
  quizBook: QuizBook;
  onPress: () => void;
}

const QuizBookCard = ({ quizBook, onPress }: QuizBookCardProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.title}>{quizBook.title}</Text>
          <Text style={styles.detail}>正答率：{quizBook.correctRate}%</Text>
          <Text style={styles.detail}>周回回数：{quizBook.currentRound}</Text>
          <Text style={styles.detail}>最終更新：今日</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: '#e7eb8a',
    padding: 15,
    justifyContent: 'center',
    aspectRatio: 1,
  },
  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  detail: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});
export default QuizBookCard