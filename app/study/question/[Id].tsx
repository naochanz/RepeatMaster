import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'

type AnswerHistory = {
    [questionNumber: number]: ('○' | '×')[]// 周回ごとの正誤を配列で管理
}

const QuestionList = () => {
    const { id } = useLocalSearchParams();
    const { quizBooks, fetchQuizBooks, getChapterById, getSectionById, isLoading } = useQuizBookStore();
    const [answerHistory, setAnswerHistory] = useState<AnswerHistory>({});
    const lastTap = useRef<number>(0);

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

    const addAnswer = (questionNumber: number, answer: '○' | '×') => {
        setAnswerHistory(prev => ({
            ...prev,
            [questionNumber]: [...(prev[questionNumber] || []), answer]
        }));
    };

    const getCurrentAnswer = (questionNumber: number) => {
        const history = answerHistory[questionNumber];
        return history?.[history.length - 1] || null;
    }

    const getAttemptCount = (questionNumber: number) => {
        return answerHistory[questionNumber]?.length || 0;
    }

    const handleDoubleTap = (questionNumber: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
            toggleAnswer(questionNumber);
        }
        lastTap.current = now;
    }

    const toggleAnswer = (questionNumber: number) => {
        const history = answerHistory[questionNumber] || [];
        const current = getCurrentAnswer(questionNumber);
        
        if (history.length === 0) {
            // 初回は○から始める
            addAnswer(questionNumber, '○');
        } else if (current === '○') {
            // ○を×に変更（最後の要素を置き換え）
            setAnswerHistory(prev => ({
                ...prev,
                [questionNumber]: [...history.slice(0, -1), '×']
            }));
        } else if (current === '×') {
            // ×を削除（最後の要素を削除）
            setAnswerHistory(prev => ({
                ...prev,
                [questionNumber]: history.slice(0, -1)
            }));
        }
    };
    
    // 新しい周回を開始する関数を別途用意
    const startNewAttempt = (questionNumber: number) => {
        addAnswer(questionNumber, '○');
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
                    {Array.from({ length: displayInfo.questionCount }, (_, i) => i + 1).map((num) => {
                        const currentAnswer = getCurrentAnswer(num);
                        const attemptCount = getAttemptCount(num);
                        const history = answerHistory[num] || [];
                        
                        return (
                            <TouchableOpacity
                                key={num}
                                style={[
                                    styles.questionCard,
                                    currentAnswer === '○' && styles.correctCard,
                                    currentAnswer === '×' && styles.incorrectCard,
                                    attemptCount >= 3 && styles.masteredCard,
                                    attemptCount === 0 && styles.unattemptedCard
                                ]}
                                onPress={() => handleDoubleTap(num)}
                            >
                                <Text style={styles.questionNumber}>{num}</Text>
                                {currentAnswer && (
                                    <Text style={[
                                        styles.answerMark,
                                        currentAnswer === '○' ? styles.correctMark : styles.incorrectMark
                                    ]}>
                                        {currentAnswer}
                                    </Text>
                                )}
                                {attemptCount > 0 && (
                                    <Text style={styles.attemptCount}>
                                        {attemptCount}周目
                                    </Text>
                                )}
                                {/* 履歴を小さく表示 */}
                                <View style={styles.historyContainer}>
                                    {history.map((answer, index) => (
                                        <Text key={index} style={[
                                            styles.historyIcon,
                                            answer === '○' ? styles.correctMark : styles.incorrectMark
                                        ]}>
                                            {answer}
                                        </Text>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
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
        minHeight: 80, // 高さを確保
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
    masteredCard: {
        transform: [{ scale: 0.95 }], // 3周以上で少し小さく
        opacity: 0.8,
    },
    unattemptedCard: {
        backgroundColor: '#fff3e0', // 未着手はオレンジ系
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
    attemptCount: {
        fontSize: 10,
        color: '#666',
        marginTop: 5,
        position: 'absolute',
        bottom: 5,
        left: 8,
    },
    historyContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        right: 8,
    },
    historyIcon: {
        fontSize: 10,
        marginLeft: 2,
    },
});

export default QuestionList;