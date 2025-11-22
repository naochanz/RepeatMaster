import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { QuizBook } from '@/types/QuizBook'
import { theme } from '@/constants/Theme'
import { BookOpen, TrendingUp, RotateCw } from 'lucide-react-native'

interface QuizBookCardProps {
  quizBook: QuizBook;
  onPress: () => void;
}

const QuizBookCard = ({ quizBook, onPress }: QuizBookCardProps) => {
  const correctRate = quizBook.correctRate || 0;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <BookOpen size={32} color={theme.colors.primary[600]} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>{quizBook.title}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <TrendingUp size={14} color={theme.colors.secondary[600]} />
            <Text style={styles.statLabel}>正答率</Text>
            <Text style={[styles.statValue, {
              color: correctRate >= 80
                ? theme.colors.success[600]
                : correctRate >= 60
                ? theme.colors.warning[600]
                : theme.colors.error[600]
            }]}>{quizBook.correctRate}%</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <RotateCw size={14} color={theme.colors.secondary[600]} />
            <Text style={styles.statLabel}>周回</Text>
            <Text style={styles.statValue}>{quizBook.currentRound}回</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
    ...theme.shadows.md,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.secondary[900],
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontFamily: 'ZenKaku-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary[200],
  },
  statItem: {
    alignItems: 'center',
    //gap: 2,
  },
  statLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.secondary[600],
    fontFamily: 'ZenKaku-Regular',
  },
  statValue: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.bold,
    fontFamily: 'ZenKaku-Bold',
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.secondary[200],
  },
});
export default QuizBookCard