
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
          <Text>
            {quizBook.title}
            <br/>
            正答率：{quizBook.correctRate}
            <br/>
            周回回数：{quizBook.currentRound}
            <br/>
            最新の更新日：{quizBook.lastStudyDate.toString()}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    width: '48%',  // 2列なので48%（余白考慮）
    aspectRatio: 1,  // 正方形
    backgroundColor: '#e7eb8a',
    borderRadius: 12,
    padding: 15,
  },
  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default QuizBookCard