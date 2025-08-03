// app/quizBook/add-sections.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuizBookStore } from './Input/stores/quizBookStore';
import Header from '../compornents/Header';
import SectionCountInput from './Input/SectionCountInput';
import ConfirmButton from './Input/ConfirmButton';
import { router } from 'expo-router';

const AddSection = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const chapterCount = currentQuizBook?.chapters?.length || 0;

    const handleNext = () => {
        router.push('/quizBook/addQuestions');
    };

    const handleSkipSections = () => {
        // 節をスキップして直接問題数設定へ
        router.push('/quizBook/addQuestions');
    };

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>各章の節数を設定</Text>

                {Array.from({ length: chapterCount }, (_, index) => (
                    <SectionCountInput
                        key={index}
                        chapterNumber={index + 1}
                        chapterIndex={index}
                    />
                ))}

                <View style={styles.buttonContainer}>
                    <ConfirmButton
                        title="問題数入力へ進む"
                        onPress={handleSkipSections}
                        backgroundColor="#6c757d"
                    />
                    <ConfirmButton
                        title="節をスキップ"
                        onPress={handleNext}
                        backgroundColor="#007AFF"
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default AddSection;