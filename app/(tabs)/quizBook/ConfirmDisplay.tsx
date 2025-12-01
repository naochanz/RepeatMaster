import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../../compornents/Header'
import { useQuizBookStore } from '@/stores/quizBookStore';
import { theme } from '@/constants/Theme'
import { CheckCircle2, BookMarked, Layers, FileMinus } from 'lucide-react-native'
import Button from '@/components/ui/Button';
import { router } from 'expo-router';


const ConfirmDisplay = () => {
    //zustandからデータ取得
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const addQuizBook = useQuizBookStore(state => state.addQuizBook);
    const clearCurrentQuizBook = useQuizBookStore(state => state.clearCurrentQuizBook);
    const updateQuizBook = useQuizBookStore(state => state.updateQuizBook);
    //データを展開
    const title = currentQuizBook?.title;
    const chapters = currentQuizBook?.chapters || [];

    const conserveQuizBook = async () => {
        //ここは後々データベース登録を実装
        try {
            if (currentQuizBook) {
                if (currentQuizBook.id) {
                    // 編集モード: 更新
                    await updateQuizBook(currentQuizBook.id, currentQuizBook as any);
                } else {
                    const quizBookToSave = {
                        ...currentQuizBook,
                        id: `quiz-${Date.now()}`,
                        currentRate: 0,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };

                    await addQuizBook(quizBookToSave as any);
                    clearCurrentQuizBook();

                    router.push('/(tabs)');
                }
            }
        } catch {
            console.error('問題集の取得に失敗：', Error);
        }
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
                        <CheckCircle2 size={24} color={theme.colors.success[600]} />
                    </View>
                    <Text style={styles.title}>確認画面</Text>
                    <Text style={styles.description}>入力内容を確認してください</Text>
                </View>

                {/*問題集タイトル*/}
                <View style={styles.titleCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconWrapper}>
                            <BookMarked size={20} color={theme.colors.primary[600]} />
                        </View>
                        <Text style={styles.cardTitle}>問題集情報</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>タイトル</Text>
                        <Text style={styles.value}>{title}</Text>
                    </View>
                </View>
                {/*各章の詳細*/}
                <View style={styles.chaptersSection}>
                    <View style={styles.sectionHeaderContainer}>
                        <Layers size={20} color={theme.colors.primary[600]} />
                        <Text style={styles.sectionHeaderText}>章・節の構成</Text>
                    </View>
                    {chapters.map((chapter, chapterIndex) => (
                        <View key={chapterIndex} style={styles.chapterCard}>
                            <View style={styles.chapterHeader}>
                                <View style={styles.chapterBadge}>
                                    <Text style={styles.chapterBadgeText}>第{chapter.chapterNumber}章</Text>
                                </View>
                            </View>
                            {/*節がある場合*/}
                            {chapter.sections && chapter.sections.length > 0 ? (
                                chapter.sections.map((section, sectionIndex) => (
                                    <View key={sectionIndex} style={styles.sectionRow}>
                                        <View style={styles.sectionInfo}>
                                            <FileMinus size={16} color={theme.colors.secondary[500]} />
                                            <Text style={styles.sectionText}>
                                                第{section.sectionNumber}節
                                            </Text>
                                        </View>
                                        <View style={styles.questionBadge}>
                                            <Text style={styles.questionBadgeText}>{section.questionCount}問</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                /*節がない場合は章の問題数を表示*/
                                <View style={styles.sectionRow}>
                                    <Text style={styles.noSectionText}>節なし</Text>
                                    <View style={styles.questionBadge}>
                                        <Text style={styles.questionBadgeText}>{chapter.questionCount || 0}問</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
                <View>
                    <Button
                        title="登録"
                        onPress={conserveQuizBook}
                        variant="primary"
                        size="lg"
                        fullWidth
                    >

                    </Button>
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
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.success[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    title: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold,
        marginBottom: theme.spacing.xs,
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
    titleCard: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.primary[200],
        ...theme.shadows.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: theme.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    infoRow: {
        paddingVertical: theme.spacing.sm,
    },
    label: {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.secondary[500],
        marginBottom: 4,
        fontFamily: theme.typography.fontFamilies.regular,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    chaptersSection: {
        marginBottom: theme.spacing.xxl,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    sectionHeaderText: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: theme.typography.fontFamilies.bold,
    },
    chapterCard: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.secondary[200],
        ...theme.shadows.sm,
    },
    chapterHeader: {
        marginBottom: theme.spacing.sm,
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
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary[100],
    },
    sectionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    sectionText: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[700],
        fontFamily: theme.typography.fontFamilies.medium,
    },
    noSectionText: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[500],
        fontFamily: theme.typography.fontFamilies.regular,
        fontStyle: 'italic',
    },
    questionBadge: {
        backgroundColor: theme.colors.primary[100],
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.md,
    },
    questionBadgeText: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.primary[700],
        fontFamily: theme.typography.fontFamilies.bold,
    },
});

export default ConfirmDisplay