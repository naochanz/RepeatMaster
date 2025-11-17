import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import Header from '../compornents/Header'
import { useQuizBookStore } from '../quizBook/Input/stores/quizBookStore';


const StudyHome = () => {
    //モックデータをmockQuizBooks.tsから配列を取得
    const { id } = useLocalSearchParams();
    const { quizBooks, fetchQuizBooks, getQuizBookById } = useQuizBookStore();

    useEffect(() => {
        if (quizBooks.length === 0) {
            fetchQuizBooks();
        }
    }, []);

    const quizBook = getQuizBookById(id as string);

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
    //章のトータルの設問数を取得
    const getChapterTotalQuestions = (chapter: typeof quizBook.chapters[0]) => {
        if (chapter.sections && chapter.sections.length > 0) {
            return chapter.sections.reduce((sum, section) => {
                return sum + section.questionCount;

            }, 0);
        } else {
            return chapter.questionCount || 0;
        };
    }

    const handleChapterPress = (chapter: typeof quizBook.chapters[0]) => {
        if (chapter.sections && chapter.sections.length > 0) {
            router.push({
                pathname: '/study/section/[chapterId]',
                params: { chapterId: chapter.id }
            })
        } else {
            router.push({
                pathname: '/study/question/[id]', // 節を設定していない場合
                params: { id: chapter.id }

            })
        };
    }

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{quizBook.title}</Text>
                </View>

                {quizBook.chapters.map((chapter) =>
                    <TouchableOpacity
                        key={chapter.id}
                        style={styles.chapterContainer}
                        onPress={() => handleChapterPress(chapter)}
                    >
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

                    </TouchableOpacity>)}
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
        padding: 16, // paddingを調整
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', // 色を調整
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    chapterContainer: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16, // 左右の余白を統一
        padding: 20,
        borderRadius: 12, // より見やすい角丸に
        // iOS用の影
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Android用の影
        elevation: 3,
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    chapterDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // 縦方向の配置を揃える
    }
})
export default StudyHome