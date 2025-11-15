import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'

type AnswerHistory = {
    [questionNumber: number]: {
        answer: {
            result: '○' | '×',
            resultConfirmFlg: boolean
        }[]
    }
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
        setAnswerHistory(prev => {
            const current = prev[questionNumber];

            if (current?.answer) {
                const lastAnswer = current.answer[current.answer.length - 1];
                if (lastAnswer.resultConfirmFlg) {
                    return prev;
                }
            }

            return {
                ...prev,
                [questionNumber]: {
                    answer: [
                        ...(current?.answer || []),
                        {
                            result: answer,
                            resultConfirmFlg: false
                        }
                    ]
                }
            }
        });
    };

    const getCurrentAnswer = (questionNumber: number) => {
        const history = answerHistory[questionNumber]?.answer;
        return history?.[history.length - 1]?.result || null;
    }

    const getAttemptCount = (questionNumber: number) => {
        return answerHistory[questionNumber]?.answer.length || 0;
    }

    const handleDoubleTap = (questionNumber: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
            const history = answerHistory[questionNumber];
            const isLocked = history?.answer?.[history.answer.length - 1]?.resultConfirmFlg;
            if (isLocked) {
                const hasNextUnlockedCard = history.answer.length > 1 && !history.answer[history.answer.length - 1].resultConfirmFlg;

                if (hasNextUnlockedCard) {
                    setAnswerHistory(prev => {
                        const updated = [...prev[questionNumber].answer];
                        updated.pop(); //最後の要素を削除

                        return {
                            ...prev,
                            [questionNumber]: {
                                answer: updated
                            }
                        };
                    })
                }
            } else {
                //新しいカードがない場合　→　追加
                addAnswer(questionNumber, `○`);
            }
        } else {
            toggleAnswer(questionNumber);
        }
        lastTap.current = now;
    }

    const confirmAnswer = (questionNumber: number) => {
        setAnswerHistory(prev => {
            const current = prev[questionNumber];

            if (!current || current.answer.length === 0) {
                return prev;
            }

            const updated = [...current.answer];
            const lastIndex = updated.length - 1;

            updated[lastIndex] = {
                ...updated[lastIndex],
                resultConfirmFlg: true
            };

            return {
                ...prev,
                [questionNumber]: {
                    answer: updated
                }
            }
        });
    };

    const unlockAnswer = (questionNumber: number) => {
        setAnswerHistory(prev => {
            const current = prev[questionNumber];

            if (!current || current.answer.length === 0) {
                return prev;
            }

            const updated = [...current.answer];
            const lastIndex = updated.length - 1;

            // 最後の回答のロックを解除
            updated[lastIndex] = {
                ...updated[lastIndex],
                resultConfirmFlg: false
            };

            return {
                ...prev,
                [questionNumber]: {
                    answer: updated
                }
            }
        });
    };

    const handleLongPress = (questionNumber: number) => {
        const history = answerHistory[questionNumber];
        const isLocked = history?.answer[answerHistory[questionNumber].answer.length - 1]?.resultConfirmFlg;

        if (isLocked) {
            unlockAnswer(questionNumber);
        } else {
            confirmAnswer(questionNumber);
        }
    };

    const toggleAnswer = (questionNumber: number) => {
        const current = getCurrentAnswer(questionNumber);
        const history = answerHistory[questionNumber];
        const isLocked = history?.answer[history.answer.length - 1]?.resultConfirmFlg;

        if (isLocked) {
            return;
        }

        if (!history || history.answer.length === 0) {
            addAnswer(questionNumber, '○');
        } else if (current === '○') {
            setAnswerHistory(prev => {
                const updated = [...prev[questionNumber].answer];
                updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    result: '×'
                };
                return {
                    ...prev,
                    [questionNumber]: {
                        answer: updated
                    }
                };
            });
        } else if (current === '×') {
            setAnswerHistory(prev => {
                const updated = [...prev[questionNumber].answer];
                updated.pop();

                if (updated.length === 0) {
                    const { [questionNumber]: _, ...rest } = prev;
                    return rest;
                }

                return {
                    ...prev,
                    [questionNumber]: {
                        answer: updated
                    }
                };
            });
        }
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
                        const isLocked = answerHistory[num]?.answer[answerHistory[num].answer.length - 1]?.resultConfirmFlg;

                        return (
                            <TouchableOpacity
                                key={num}
                                style={[
                                    styles.questionCard,
                                    currentAnswer === '○' && styles.correctCard,
                                    currentAnswer === '×' && styles.incorrectCard,
                                    attemptCount >= 3 && styles.masteredCard,
                                    attemptCount === 0 && styles.unattemptedCard,
                                    isLocked && styles.lockedCard,
                                ]}
                                onPress={() => handleDoubleTap(num)}
                                onLongPress={() => handleLongPress(num)}
                                delayLongPress={500}
                            >
                                {/* ロックアイコン */}
                                {currentAnswer && isLocked && (
                                    <Text style={styles.lockIcon}>🔒</Text>
                                )}

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
                                    {answerHistory[num]?.answer.map((attempt, index) => (
                                        <Text key={index} style={[
                                            styles.historyIcon,
                                            attempt.result === '○' ? styles.correctMark : styles.incorrectMark
                                        ]}>
                                            {attempt.result}
                                        </Text>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
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
        minHeight: 80,
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
        transform: [{ scale: 0.95 }],
        opacity: 0.8,
    },
    unattemptedCard: {
        backgroundColor: '#fff3e0',
    },
    lockedCard: {
        borderWidth: 4, // 枠線を太くして確定感を出す
        opacity: 0.75, // 少し薄くして「終わった感」
        transform: [{ scale: 0.97 }], // わずかに縮小
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
    lockIcon: {
        position: 'absolute',
        top: 8,
        left: 8,
        fontSize: 16,
    },
});

export default QuestionList;