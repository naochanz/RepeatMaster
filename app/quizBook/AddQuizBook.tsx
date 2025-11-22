import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../compornents/Header'
import QuizBookNameInput from './Input/QuizBookNameInput'
import ChapterSectionInput from './Input/ChapterSectionInput'
import Button from '@/components/ui/Button'
import { router } from 'expo-router'
import { theme } from '@/constants/Theme'

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
                    <Text style={styles.title}>問題集を作成</Text>
                    <Text style={styles.description}>
                        問題集の基本情報を入力してください
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>問題集名</Text>
                    <QuizBookNameInput />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>章</Text>
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
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.md,
    },
    buttonContainer: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
});

export default AddQuizBook