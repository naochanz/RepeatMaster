import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../compornents/Header'
import QuizBookNameInput from './Input/QuizBookNameInput'
import ChapterSectionInput from './Input/ChapterSectionInput'
import Button from '@/components/ui/Button'
import { router } from 'expo-router'
import { theme } from '@/constants/Theme'
import { BookPlus, Layers } from 'lucide-react-native'

const goToSectionInput = () => {
    router.push('./AddSection')
}


const AddQuizBook = () => {

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
                        <BookPlus size={32} color={theme.colors.primary[600]} />
                    </View>
                    <Text style={styles.title}>問題集を作成</Text>
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
                    />
                </View>
            </ScrollView>
        </View>

    )
}

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
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.sm,
        fontFamily: 'ZenKaku-Bold',
        textAlign: 'center',
    },
    description: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        fontFamily: 'ZenKaku-Regular',
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
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        fontFamily: 'ZenKaku-Bold',
    },
    buttonContainer: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
});

export default AddQuizBook