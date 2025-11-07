// app/quizBook/add-sections.tsx
import React, { use } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuizBookStore } from './Input/stores/quizBookStore';
import Header from '../compornents/Header';
import SectionCountInput from './Input/SectionCountInput';
import ConfirmButton from './Input/ConfirmButton';
import { router } from 'expo-router';


const AddSection = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook)
    const chapterCount = currentQuizBook?.chapterCount || 0;

    const hasSections = currentQuizBook?.chapters?.some(
        chapter => chapter.sections && chapter.sections.length
    )  || false;

    const handleNext = () => {
        router.push('./quizBook/AddQuestions');
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
                questionCount: 0
            }));

            updateCurrentQuizBook({ chapters });
        };
        router.push('./quizBook/AddQuestions');
    };

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>各章の節数を設定</Text>
                <View style={styles.buttonContainer} >
                    <Text>※節がない場合</Text>
                    <ConfirmButton
                        title="節をスキップ"
                        onPress={handleSkipSections}
                        backgroundColor="#007AFF"
                        disabled={hasSections}
                    />
                </View>


                {Array.from({ length: chapterCount }, (_, index) => {
                    return (
                        <SectionCountInput
                            key={index}
                            chapterNumber={index + 1}
                            chapterIndex={index}
                        />
                    );
                })}

                <View style={styles.buttonContainer}>
                    <ConfirmButton
                        title="問題数入力へ進む"
                        onPress={handleNext}
                        backgroundColor="#6c757d"
                    />
                </View>
            </ScrollView >
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