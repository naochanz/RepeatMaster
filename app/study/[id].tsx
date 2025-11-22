import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import Header from '../compornents/Header'
import { useQuizBookStore } from '../quizBook/Input/stores/quizBookStore';
import { theme } from '@/constants/Theme';
import Card from '@/components/ui/Card';


const StudyHome = () => {
    //モックデータをmockQuizBooks.tsから配列を取得
    const { id } = useLocalSearchParams();
    const { quizBooks, fetchQuizBooks, getQuizBookById } = useQuizBookStore();

    useEffect(() => {
        if (quizBooks.length === 0) {
            fetchQuizBooks();
        }
    }, []);

    const quizBook = getQuizBookById(id as string);

    if (!quizBook) {
        return (
            <>
                <Header />
                <ScrollView style={styles.container}>
                    <Text>問題集が存在しません</Text>
                </ScrollView>
            </>
        )
    }
    //章のトータルの設問数を取得
    const getChapterTotalQuestions = (chapter: typeof quizBook.chapters[0]) => {
        if (chapter.sections && chapter.sections.length > 0) {
            return chapter.sections.reduce((sum, section) => {
                return sum + section.questionCount;

            }, 0);
        } else {
            return chapter.questionCount || 0;
        };
    }

    const handleChapterPress = (chapter: typeof quizBook.chapters[0]) => {
        if (chapter.sections && chapter.sections.length > 0) {
            router.push({
                pathname: '/study/section/[chapterId]',
                params: { chapterId: chapter.id }
            })
        } else {
            router.push({
                pathname: '/study/question/[id]', // 節を設定していない場合
                params: { id: chapter.id }

            })
        };
    }

    return (
        <View style={styles.wrapper}>
            <Header />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{quizBook.title}</Text>
                <Text style={styles.subtitle}>
                    {quizBook.chapters.length}個の章
                </Text>
            </View>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {quizBook.chapters.map((chapter) =>
                    <TouchableOpacity
                        key={chapter.id}
                        onPress={() => handleChapterPress(chapter)}
                        activeOpacity={0.7}
                        style={styles.cardWrapper}
                    >
                        <Card style={styles.chapterCard}>
                            <View style={styles.chapterHeader}>
                                <Text style={styles.chapterTitle}>
                                    {chapter.chapterNumber}章：{chapter.title}
                                </Text>
                            </View>
                            <View style={styles.chapterStats}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>正答率</Text>
                                    <Text style={[styles.statValue, {
                                        color: chapter.chapterRate >= 80
                                            ? theme.colors.success[600]
                                            : chapter.chapterRate >= 60
                                                ? theme.colors.warning[600]
                                                : theme.colors.error[600]
                                    }]}>
                                        {chapter.chapterRate}%
                                    </Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statLabel}>問題数</Text>
                                    <Text style={styles.statValue}>
                                        {getChapterTotalQuestions(chapter)}問
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
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
        fontFamily: 'ZenKaku-Bold',
    },
    subtitle: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.secondary[600],
        fontFamily: 'ZenKaku-Regular',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    cardWrapper: {
        marginBottom: theme.spacing.sm,
    },
    chapterCard: {
        padding: theme.spacing.md,
    },
    chapterHeader: {
        marginBottom: theme.spacing.sm,
    },
    chapterTitle: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: 'ZenKaku-Bold',
    },
    chapterStats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary[200],
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.secondary[600],
        marginBottom: 2,
        fontFamily: 'ZenKaku-Regular',
    },
    statValue: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: 'ZenKaku-Bold',
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: theme.colors.secondary[200],
    },
})
export default StudyHome