import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuizBookStore } from './Input/stores/quizBookStore';
import Header from '../compornents/Header';
import QuestionCountInput from './Input/QuestionCountInput';
import ConfirmButton from './Input/ConfirmButton';
import { router } from 'expo-router';

const AddQuestions = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const chapters = currentQuizBook?.chapters || [];

    const handleNext = () => {
        router.push('/quizBook/ConfirmDisplay');
    };

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>問題数を入力</Text>

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
                    <ConfirmButton
                        title="確認画面へ"
                        onPress={handleNext}
                        backgroundColor="#6c757d"
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
});

export default AddQuestions;