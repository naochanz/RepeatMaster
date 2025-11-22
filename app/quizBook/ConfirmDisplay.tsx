import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../compornents/Header'
import { useQuizBookStore } from './Input/stores/quizBookStore'
import { theme } from '@/constants/Theme'

const ConfirmDisplay = () => {
    //zustandからデータ取得
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    //データを展開
    const title = currentQuizBook?.title;
    const chapterCount = currentQuizBook?.chapterCount;
    const chapters = currentQuizBook?.chapters || [];

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>確認画面</Text>
                {/*問題集タイトル*/}
                <View style={styles.section}>
                    <Text style={styles.label}>問題集タイトル：</Text>
                    <Text style={styles.value}>{title}</Text>
                </View>
                {/*各章の詳細*/}
                {chapters.map((chapter, chapterIndex) => (
                    <View key={chapterIndex} style={styles.chapterContainer}>
                        <Text style={styles.chapterTitle}>
                            {chapter.chapterNumber}章
                        </Text>
                        {/*節がある場合*/}
                        {chapter.sections && chapter.sections.length > 0 ? (
                            chapter.sections.map((section, sectionIndex) => (
                                <View key={sectionIndex} style={styles.sectionContainer}>
                                    <Text style={styles.sectionText}>
                                        {section.sectionNumber}節
                                    </Text>
                                    <Text style={styles.questionCount}>
                                        問題数： {section.questionCount}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            /*節がない場合は章の問題数を表示*/
                            <Text style={styles.questionCount}>
                                問題数： {chapter.questionCount || 0}
                            </Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.neutral[50],
    },
    title: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        marginBottom: theme.spacing.xl,
        fontFamily: theme.typography.fontFamilies.bold,
        color: theme.colors.secondary[900],
    },
    section: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.sm,
    },
    label: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.secondary[600],
        marginBottom: 4,
        fontFamily: theme.typography.fontFamilies.regular,
    },
    value: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.secondary[900],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    chapterContainer: {
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
        ...theme.shadows.sm,
    },
    chapterTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
        marginBottom: theme.spacing.md,
        color: theme.colors.secondary[900],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    sectionContainer: {
        marginLeft: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
        borderLeftWidth: 2,
        borderLeftColor: theme.colors.primary[600],
    },
    sectionText: {
        fontSize: theme.typography.fontSizes.base,
        marginBottom: 4,
        color: theme.colors.secondary[700],
        fontFamily: theme.typography.fontFamilies.medium,
    },
    questionCount: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary[600],
        fontWeight: theme.typography.fontWeights.medium,
        fontFamily: theme.typography.fontFamilies.medium,
    },
});

export default ConfirmDisplay