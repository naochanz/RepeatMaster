import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuizBookStore } from './Input/stores/quizBookStore';
import Header from '../compornents/Header';
import SectionCountInput from './Input/SectionCountInput';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { theme } from '@/constants/Theme';
import { AlertCircle } from 'lucide-react-native';


const AddSection = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook)
    const chapterCount = currentQuizBook?.chapterCount || 0;

    const hasSections = currentQuizBook?.chapters?.some(
        chapter => chapter.sections && chapter.sections.length
    )  || false;

    const handleNext = () => {
        router.push('./AddQuestions');
    };

    const handleSkipSections = () => {
        const currentQuizBook = useQuizBookStore.getState().currentQuizBook;
        const chapterCount = currentQuizBook?.chapterCount || 0;

        // chaptersが存在しない、または空の場合に作成
        if (!currentQuizBook?.chapters || currentQuizBook.chapters.length === 0) {
            const chapters = Array.from({ length: chapterCount }, (_, index) => ({
                id: `chapter-${index}`,
                title: `${index + 1}章`,
                chapterNumber: index + 1,
                questionCount: 0,
                chapterRate: 0
            }));

            updateCurrentQuizBook({ chapters });
        };
        router.push('./AddQuestions');
    };

    return (
        <View style={styles.wrapper}>
            <Header />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>各章の節数を設定</Text>
                    <Text style={styles.description}>
                        各章に含まれる節の数を入力してください
                    </Text>
                </View>

                <View style={styles.skipSection}>
                    <View style={styles.skipInfo}>
                        <AlertCircle size={16} color={theme.colors.secondary[600]} />
                        <Text style={styles.skipText}>節がない場合はスキップできます</Text>
                    </View>
                    <Button
                        title="節をスキップ"
                        onPress={handleSkipSections}
                        variant="outline"
                        size="lg"
                        fullWidth
                        disabled={hasSections}
                    />
                </View>

                <View style={styles.inputsContainer}>
                    {Array.from({ length: chapterCount }, (_, index) => {
                        return (
                            <SectionCountInput
                                key={index}
                                chapterNumber={index + 1}
                                chapterIndex={index}
                            />
                        );
                    })}
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="問題数入力へ進む"
                        onPress={handleNext}
                        variant="primary"
                        size="lg"
                        fullWidth
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.neutral[50],
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: theme.spacing.lg,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.sm,
        fontFamily: 'NotoSansJP-Bold',
    },
    description: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        fontFamily: 'NotoSansJP-Regular',
    },
    skipSection: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
    },
    skipInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.xs,
    },
    skipText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.secondary[600],
        fontFamily: 'NotoSansJP-Regular',
    },
    inputsContainer: {
        marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
        marginBottom: theme.spacing.xxl,
    },
});

export default AddSection;