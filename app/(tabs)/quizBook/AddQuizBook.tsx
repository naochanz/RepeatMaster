import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../compornents/Header'
import QuizBookNameInput from './Input/QuizBookNameInput'
import ChapterSectionInput from './Input/ChapterSectionInput'
import Button from '@/components/ui/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { theme } from '@/constants/Theme'
import { BookPlus, Layers } from 'lucide-react-native'
import { useQuizBookStore } from '@/stores/quizBookStore'


const goToSectionInput = () => {
    router.push('./AddSection')
}

const AddQuizBook = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const { editId } = useLocalSearchParams();
    const setCurrentQuizBook = useQuizBookStore(state => state.setCurrentQuizBook);
    const getQuizBookById = useQuizBookStore(state => state.getQuizBookById);

    //ボタンdisable用（問題集タイトル＆章入力確認）
    const isFormValid =
        currentQuizBook?.title &&
        currentQuizBook?.title.length > 0 &&
        currentQuizBook?.chapterCount &&
        currentQuizBook?.chapterCount > 0;

    useEffect(() => {
        if (editId) {
            const quizBook = getQuizBookById(String(editId));
            if (quizBook) {
                setCurrentQuizBook(quizBook);
            }
        }
    }, [editId]);

    const isEditMode = !!editId;


    return (
        <View style={styles.wrapper}>
            <Header />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <View style={styles.headerIconContainer}>
                            <BookPlus size={24} color={theme.colors.primary[600]} />
                        </View>
                        <Text style={styles.title}>
                            {isEditMode ? '問題集を編集' : '問題集を作成'}
                        </Text>
                        <Text style={styles.description}>
                            問題集の基本情報を入力してください
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIconWrapper}>
                                <BookPlus size={20} color={theme.colors.primary[600]} />
                            </View>
                            <Text style={styles.sectionTitle}>問題集名</Text>
                        </View>
                        <QuizBookNameInput />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIconWrapper}>
                                <Layers size={20} color={theme.colors.primary[600]} />
                            </View>
                            <Text style={styles.sectionTitle}>章の設定</Text>
                        </View>
                        <ChapterSectionInput />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="次へ：節の設定"
                            onPress={goToSectionInput}
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={!isFormValid}
                        />
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.neutral[50],
    },
    keyboardAvoidingView: {
        flex: 1,
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
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    title: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold as any,
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    description: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        textAlign: 'center',
    },
    card: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
        ...theme.shadows.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    sectionIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: theme.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold as any,
        color: theme.colors.secondary[900],
    },
    buttonContainer: {
        marginBottom: theme.spacing.xxl,
    },
});

export default AddQuizBook