import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useQuizBookStore } from '@/app/quizBook/Input/stores/quizBookStore'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'

const QuestionList = () => {
    const { id } = useLocalSearchParams();
    const { quizBooks, fetchQuizBooks, getChapterById, getSectionById, isLoading } = useQuizBookStore();

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
});

export default QuestionList;