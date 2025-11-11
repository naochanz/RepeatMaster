import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'

const QuestionList = () => {
    const { id } = useLocalSearchParams();
    const { quizBooks, fetchQuizBooks, getChapterById, getSectionById, isLoading } = useQuizBookStore();
    const [answer, setAnswers] = useState<{ [key: number]: '○' | '×' | null }>({})

    useEffect(() => {
        if (quizBooks.length === 0) {
            fetchQuizBooks();
        }
    }, []);




    const chapterData = getChapterById(String(id));
    const sectionData = getSectionById(String(id));

    const displayInfo = chapterData
        ? {
            type: 'chapter' as const,
            chapterNumber: chapterData.chapter.chapterNumber,
            title: chapterData.chapter.title,
            questionCount: chapterData.chapter.questionCount || 0
        }
        : sectionData
            ? {
                type: 'section' as const,
                chapterNumber: sectionData.chapter.chapterNumber,
                chapterTitle: sectionData.chapter.title,
                sectionNumber: sectionData.section.sectionNumber,
                title: sectionData.section.title,
                questionCount: sectionData.section.questionCount
            }
            : null;

    if (!displayInfo) {
        return (
            <>
                <Header />
                <View style={styles.container}>
                    <Text>データが見つかりません</Text>
                </View>
            </>
        );
    }

    // 〇×をトグルする関数
    const toggleAnswer = (questionNumber: number) => {
        setAnswers(prev => {
            const current = prev[questionNumber];
            let next: '○' | '×' | null = null;

            if (current === null) next = '○';
            else if (current === '○') next = '×';
            else next = null;

            return { ...prev, [questionNumber]: next };
        });
    };

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {displayInfo.type === 'chapter' ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            第{displayInfo.chapterNumber}章：{displayInfo.title}
                        </Text>
                        <Text style={styles.questionCount}>
                            全{displayInfo.questionCount}問
                        </Text>
                    </View>
                ) : (
                    <View style={styles.titleContainer}>
                        <Text style={styles.breadcrumb}>
                            第{displayInfo.chapterNumber}章：{displayInfo.chapterTitle}
                        </Text>
                        <Text style={styles.title}>
                            第{displayInfo.sectionNumber}節：{displayInfo.title}
                        </Text>
                        <Text style={styles.questionCount}>
                            全{displayInfo.questionCount}問
                        </Text>
                    </View>
                )}
                <View>
                    {Array.from({ length: displayInfo.questionCount }, (_, i) => i + 1).map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[
                                styles.questionCard,
                                answer[num] === '○' && styles.correctCard,
                                answer[num] === '×' && styles.incorrectCard
                            ]}
                            onPress={() => toggleAnswer(num)}
                        >
                            <Text style={styles.questionNumber}>{num}</Text>
                            {answer[num] && (
                                <Text style={[
                                    styles.answerMark,
                                    answer[num] === '○' ? styles.correctMark : styles.incorrectMark
                                ]}>
                                    {answer[num]}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))};
            </View>
            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    titleContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    breadcrumb: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    questionCount: {
        fontSize: 14,
        color: '#666',
    },
    // 問題グリッド関連のスタイル
    questionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        justifyContent: 'space-between',
    },
    questionCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 12,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    correctCard: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4caf50',
        borderWidth: 2,
    },
    incorrectCard: {
        backgroundColor: '#ffebee',
        borderColor: '#f44336',
        borderWidth: 2,
    },
    questionNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    answerMark: {
        position: 'absolute',
        top: 8,
        right: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    correctMark: {
        color: '#4caf50',
    },
    incorrectMark: {
        color: '#f44336',
    },
});

export default QuestionList;