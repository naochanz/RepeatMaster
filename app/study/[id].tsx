import { Text, View, ScrollView, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { mockQuizBooks } from '../mockData/mockQuizBooks'
import { useLocalSearchParams } from 'expo-router'
import Header from '../compornents/Header'

const StudyHome = () => {
    //モックデータをmockQuizBooks.tsから配列を取得
    const { id } = useLocalSearchParams();
    const quizBook = mockQuizBooks.find(book => book.id === id)

    if (!quizBook) {
        return (
            <>
                <Header />
                <ScrollView style={styles.container}>
                    <Text>問題集が存在しません</Text>
                </ScrollView>
            </>
        )
    }

    const getChapterTotalQuestions = (chapter: typeof quizBook.chapters[0]) => {
        return chapter.sections.reduce((sum, section) => {
            return sum + section.questionCount;
        }, 0);
    };

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{quizBook.title}</Text>
                </View>

                {quizBook.chapters.map((chapter) =>
                    <View key={chapter.id} style={styles.chapterContainer}>
                        <View>
                            <Text style={styles.chapterTitle}>
                                {chapter.chapterNumber}章：{chapter.title}
                            </Text>
                        </View>
                        <View style={styles.chapterDetail}>
                            <Text>
                                正答率： {chapter.chapterRate}％
                            </Text>
                            <Text>（全{getChapterTotalQuestions(chapter)}問）</Text>
                        </View>

                    </View>)}
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
        fontWeight: 'bold',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    chapterContainer: {
        backgroundColor: '#fff',
        marginTop: 16,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    chapterDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
export default StudyHome