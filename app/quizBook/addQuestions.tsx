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
                    <Text style={styles.emptyMessage}>章が設定されていません</Text>
                ) : (
                    <View style={styles.inputContainer}>
                        {chapters.flatMap((chapter, chapterIndex) => {
                            const hasSections = chapter.sections && chapter.sections.length > 0;

                            return hasSections
                                ? chapter.sections?.map((section, sectionIndex) => (
                                    <QuestionCountInput
                                        key={`${chapterIndex}-${sectionIndex}`}
                                        title={''}
                                        chapterNumber={chapter.chapterNumber}
                                        chapterIndex={chapterIndex}
                                        sectionNumber={section.sectionNumber}
                                        sectionIndex={sectionIndex}
                                    />
                                )) || []
                                : [<QuestionCountInput
                                    key={chapterIndex}
                                    title={`第${chapter.chapterNumber}章問題数`}
                                    chapterNumber={chapter.chapterNumber}
                                    chapterIndex={chapterIndex}
                                />];
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
    emptyMessage: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        textAlign: 'center',
        marginTop: theme.spacing.xl,
        fontFamily: theme.typography.fontFamilies.regular,
    },
    inputContainer: {
        marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
});

export default AddQuestions;