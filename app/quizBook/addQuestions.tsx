import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuizBookStore } from './Input/stores/quizBookStore';
import Header from '../compornents/Header';
import QuestionCountInput from './Input/QuestionCountInput';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { theme } from '@/constants/Theme';
import { ListChecks } from 'lucide-react-native';

const AddQuestions = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const chapters = currentQuizBook?.chapters || [];

    const handleNext = () => {
        router.push('./ConfirmDisplay');
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
                    <View style={styles.headerIconContainer}>
                        <ListChecks size={32} color={theme.colors.primary[600]} />
                    </View>
                    <Text style={styles.title}>問題数を入力</Text>
                    <Text style={styles.description}>各章または節ごとの問題数を入力してください</Text>
                </View>

                {currentQuizBook?.chapterCount === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyMessage}>章が設定されていません</Text>
                    </View>
                ) : (
                    <View style={styles.questionsSection}>
                        {chapters.map((chapter, chapterIndex) => {
                            const hasSections = chapter.sections && chapter.sections.length > 0;

                            return (
                                <View key={chapterIndex} style={styles.chapterCard}>
                                    <View style={styles.chapterHeader}>
                                        <View style={styles.chapterBadge}>
                                            <Text style={styles.chapterBadgeText}>第{chapter.chapterNumber}章</Text>
                                        </View>
                                    </View>
                                    {hasSections
                                        ? chapter.sections?.map((section, sectionIndex) => (
                                            <QuestionCountInput
                                                key={`${chapterIndex}-${sectionIndex}`}
                                                title={''}
                                                chapterNumber={chapter.chapterNumber}
                                                chapterIndex={chapterIndex}
                                                sectionNumber={section.sectionNumber}
                                                sectionIndex={sectionIndex}
                                            />
                                        ))
                                        : <QuestionCountInput
                                            key={chapterIndex}
                                            title={`第${chapter.chapterNumber}章問題数`}
                                            chapterNumber={chapter.chapterNumber}
                                            chapterIndex={chapterIndex}
                                        />
                                    }
                                </View>
                            );
                        })}
                    </View>
                )}
                
                <View style={styles.buttonContainer}>
                    <Button
                        title="確認画面へ"
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
        alignItems: 'center',
    },
    headerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.fontSizes['3xl'],
        fontWeight: theme.typography.fontWeights.bold,
        marginBottom: theme.spacing.sm,
        fontFamily: theme.typography.fontFamilies.bold,
        color: theme.colors.secondary[900],
        textAlign: 'center',
    },
    description: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        fontFamily: theme.typography.fontFamilies.regular,
        textAlign: 'center',
    },
    emptyCard: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xxl,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
        ...theme.shadows.sm,
    },
    emptyMessage: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        textAlign: 'center',
        fontFamily: theme.typography.fontFamilies.regular,
    },
    questionsSection: {
        marginBottom: theme.spacing.lg,
    },
    chapterCard: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
        ...theme.shadows.md,
    },
    chapterHeader: {
        marginBottom: theme.spacing.md,
    },
    chapterBadge: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.primary[50],
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        borderWidth: 1,
        borderColor: theme.colors.primary[200],
    },
    chapterBadgeText: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.primary[700],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    buttonContainer: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
});

export default AddQuestions;