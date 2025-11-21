import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'
import MemoModal from './compornent/MemoModal'
import { theme } from '@/constants/Theme'

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

    //最新の回答履歴を取得
    const getCurrentAnswer = (questionNumber: number) => {
        const history = answerHistory[questionNumber]?.answer;
        return history?.[history.length - 1]?.result || null;
    }

    //ダブルタップ時の処理
    const handleDoubleTap = (questionNumber: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
            const history = answerHistory[questionNumber];

            // 未回答の場合は○から開始
            if (!history || history.answer.length === 0) {
                addAnswer(questionNumber, '○');
                lastTap.current = now;
                return;
            }

            const isLocked = history?.answer?.[history.answer.length - 1]?.resultConfirmFlg;

            if (isLocked) {
                // ロック済みの場合 → 新しいカードを追加
                addAnswer(questionNumber, '○');
            } else {
                // 未ロック → 通常のトグル処理
                toggleAnswer(questionNumber);
            }
        }
        lastTap.current = now;
    };

    //長押し時の処理
    const handleLongPress = (questionNumber: number) => {
        const history = answerHistory[questionNumber];
        const isLocked = history?.answer?.[history.answer.length - 1]?.resultConfirmFlg;

        if (isLocked) {
            unlockAnswer(questionNumber);
        } else {
            confirmAnswer(questionNumber);
        }
    };

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

    //回答のロックを外す処理
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

    //正誤の切り替え処理
    const toggleAnswer = (questionNumber: number) => {
        const current = getCurrentAnswer(questionNumber);
        const history = answerHistory[questionNumber];
        const isLocked = history?.answer?.[history.answer.length - 1]?.resultConfirmFlg;

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
                    {/*カードの表示*/}
                    {Array.from({ length: displayInfo.questionCount }, (_, i) => i + 1).map((num) => {
                        const history = answerHistory[num];
                        const actualCount = history?.answer?.length || 0;
                        const lastIsLocked = history?.answer?.[history.answer.length - 1]?.resultConfirmFlg;
                        const displayCount = lastIsLocked ? actualCount + 1 : actualCount;
                        const [modalVisible, setModalVisible] = useState(false);
                        const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
                        const [memoText, setMemoText] = useState('');
                        const handleSaveMemo = (text: string) => {
                            // ここで保存処理を実装（後で）
                            console.log(`問題${selectedQuestion}のメモ:`, text);
                        };

                        // 周回数に応じた幅を計算
                        const getCardWidth = () => {
                            if (displayCount === 0) return undefined;
                            if (displayCount === 1) return undefined;
                            if (displayCount === 2) return '48%';
                            if (displayCount === 3) return '31%';
                            return 150;
                        };

                        const cardWidth = getCardWidth();
                        const needsScroll = displayCount >= 4;

                        return (
                            <View key={num} style={styles.questionGroup}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.questionNumberLabel}>問題 {num}</Text>
                                    {/*メモボタンを押下してメモ編集画面を表示*/}
                                    <TouchableOpacity
                                        style={styles.memoButton}
                                        onPress={() => {
                                            setSelectedQuestion(num);
                                            setModalVisible(true);
                                        }}
                                    >
                                        <Text style={styles.memoText}>MEMO</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* メモモーダル */}
                                <MemoModal
                                    visible={modalVisible}
                                    questionNumber={selectedQuestion}
                                    memoText={memoText}
                                    onClose={() => setModalVisible(false)}
                                    onSave={handleSaveMemo}
                                    onChangeText={setMemoText}
                                />
                                {needsScroll ? (
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.cardRow}
                                    >
                                        {history?.answer.map((attempt, attemptIndex) => {
                                            const isLocked = attempt.resultConfirmFlg;
                                            const isLastAttempt = attemptIndex === history.answer.length - 1;

                                            return (
                                                <TouchableOpacity
                                                    key={`${num}-${attemptIndex}`}
                                                    style={[
                                                        styles.questionCard,
                                                        { width: 110 },
                                                        attempt.result === '○' && styles.correctCard,
                                                        attempt.result === '×' && styles.incorrectCard,
                                                        isLocked && styles.lockedCard,
                                                    ]}
                                                    onPress={isLastAttempt ? () => handleDoubleTap(num) : undefined}
                                                    onLongPress={isLastAttempt ? () => handleLongPress(num) : undefined}
                                                    delayLongPress={500}
                                                    disabled={!isLastAttempt}
                                                >
                                                    {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                                                    <Text style={styles.attemptNumber}>{attemptIndex + 1}周目</Text>
                                                    <Text style={[
                                                        styles.answerMark,
                                                        attempt.result === '○' ? styles.correctMark : styles.incorrectMark
                                                    ]}>
                                                        {attempt.result}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                        {lastIsLocked && (
                                            <TouchableOpacity
                                                style={[styles.questionCard, styles.unattemptedCard, { width: 110 }]}
                                                onPress={() => handleDoubleTap(num)}
                                            >
                                                <Text style={styles.attemptNumber}>{actualCount + 1}周目</Text>
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                ) : (
                                    <View style={styles.cardRowNonScroll}>
                                        {history && history.answer && history.answer.length > 0 ? (
                                            <>
                                                {history.answer.map((attempt, attemptIndex) => {
                                                    const isLocked = attempt.resultConfirmFlg;
                                                    const isLastAttempt = attemptIndex === history.answer.length - 1;

                                                    return (
                                                        <TouchableOpacity
                                                            key={`${num}-${attemptIndex}`}
                                                            style={[
                                                                styles.questionCard,
                                                                cardWidth ? { width: cardWidth } : { flex: 1 },
                                                                attempt.result === '○' && styles.correctCard,
                                                                attempt.result === '×' && styles.incorrectCard,
                                                                isLocked && styles.lockedCard,
                                                            ]}
                                                            onPress={isLastAttempt ? () => handleDoubleTap(num) : undefined}
                                                            onLongPress={isLastAttempt ? () => handleLongPress(num) : undefined}
                                                            delayLongPress={500}
                                                            disabled={!isLastAttempt}
                                                        >
                                                            {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                                                            <Text style={styles.attemptNumber}>{attemptIndex + 1}周目</Text>
                                                            <Text style={[
                                                                styles.answerMark,
                                                                attempt.result === '○' ? styles.correctMark : styles.incorrectMark
                                                            ]}>
                                                                {attempt.result}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    );
                                                })}

                                                {lastIsLocked && (
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.questionCard,
                                                            styles.unattemptedCard,
                                                            cardWidth ? { width: cardWidth } : { flex: 1 }
                                                        ]}
                                                        onPress={() => handleDoubleTap(num)}
                                                    >
                                                        <Text style={styles.attemptNumber}>{actualCount + 1}周目</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </>
                                        ) : (
                                            <TouchableOpacity
                                                style={[styles.questionCard, styles.unattemptedCard, { flex: 1 }]}
                                                onPress={() => handleDoubleTap(num)}
                                            >
                                                <Text style={styles.questionNumber}>{num}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                            </View>
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
        backgroundColor: theme.colors.neutral[50],
    },
    titleContainer: {
        backgroundColor: theme.colors.neutral.white,
        padding: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary[200],
    },
    breadcrumb: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.secondary[600],
        marginBottom: theme.spacing.xs,
    },
    title: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.sm,
    },
    questionCount: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.secondary[600],
    },
    correctCard: {
        backgroundColor: theme.colors.success[50],
        borderColor: theme.colors.success[500],
        borderWidth: 2,
    },
    incorrectCard: {
        backgroundColor: theme.colors.error[50],
        borderColor: theme.colors.error[500],
        borderWidth: 2,
    },
    masteredCard: {
        transform: [{ scale: 0.95 }],
        opacity: 0.8,
    },
    unattemptedCard: {
        backgroundColor: theme.colors.warning[50],
        borderWidth: 2,
        borderColor: theme.colors.warning[300],
        borderStyle: 'dashed',
    },
    lockedCard: {
        borderWidth: 4,
        opacity: 0.75,
        transform: [{ scale: 0.97 }],
    },
    questionNumber: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
    },
    answerMark: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
    },
    correctMark: {
        color: theme.colors.success[600],
    },
    incorrectMark: {
        color: theme.colors.error[600],
    },
    lockIcon: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        fontSize: 16,
    },
    questionGroup: {
        marginBottom: theme.spacing.lg,
    },
    questionNumberLabel: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.secondary[900],
    },
    cardRow: {
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    questionCard: {
        backgroundColor: theme.colors.neutral.white,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
        minHeight: 80,
    },
    attemptNumber: {
        position: 'absolute',
        top: theme.spacing.sm,
        left: theme.spacing.sm,
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.secondary[600],
    },
    cardRowNonScroll: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    memoButton: {
        backgroundColor: theme.colors.neutral.white,
        borderColor: theme.colors.primary[600],
        borderWidth: 1.5,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        ...theme.shadows.sm,
    },
    memoText: {
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.primary[600],
    },
    // モーダル関連のスタイル
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        height: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeIcon: {
        padding: 4,
    },
    closeIconText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    memoInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#4caf50',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default QuestionList;