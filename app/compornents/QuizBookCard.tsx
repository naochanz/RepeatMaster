import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { QuizBook } from '@/types/QuizBook'
import { theme } from '@/constants/Theme'
import { BookOpen, TrendingUp, RotateCw, MoreVertical, Edit, Trash2 } from 'lucide-react-native'

interface QuizBookCardProps {
  quizBook: QuizBook;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const QuizBookCard = ({ quizBook, onPress, onEdit, onDelete }: QuizBookCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const correctRate = quizBook.correctRate || 0;

  const handleMenuPress = (e: any) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        {/* メニューボタン */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MoreVertical size={20} color={theme.colors.secondary[600]} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <BookOpen size={32} color={theme.colors.primary[600]} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {quizBook.title}
            </Text>
          </View>
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
              <Text style={styles.statValue}>{quizBook.currentRound || 0}回</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* メニュー展開 */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
            <Edit size={16} color={theme.colors.primary[600]} />
            <Text style={styles.menuText}>編集</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
            <Trash2 size={16} color={theme.colors.error[600]} />
            <Text style={[styles.menuText, { color: theme.colors.error[600] }]}>削除</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
    ...theme.shadows.md,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 10,
    padding: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.bold as any,
    color: theme.colors.secondary[900],
    textAlign: 'center',
    fontFamily: 'ZenKaku-Bold',
  },
  titleInput: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.bold as any,
    color: theme.colors.secondary[900],
    textAlign: 'center',
    fontFamily: 'ZenKaku-Bold',
    borderWidth: 1,
    borderColor: theme.colors.primary[300],
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.primary[50],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary[200],
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.secondary[600],
    fontFamily: 'ZenKaku-Regular',
  },
  statValue: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.bold as any,
    fontFamily: 'ZenKaku-Bold',
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.secondary[200],
  },
  menu: {
    position: 'absolute', 
    top: '100%', 
    left: 0,
    right: 0,
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.secondary[200],
    ...theme.shadows.lg,
    overflow: 'hidden',
    zIndex: 100, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.secondary[200],
  },
  menuText: {
    fontSize: theme.typography.fontSizes.base,
    fontFamily: 'ZenKaku-Medium',
    color: theme.colors.secondary[900],
  },
});

export default QuizBookCard
