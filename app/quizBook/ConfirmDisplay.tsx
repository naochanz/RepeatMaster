import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../compornents/Header'
import { useQuizBookStore } from './Input/stores/quizBookStore'

const ConfirmDisplay = () => {
    //zustandからデータ取得
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    //データを展開
    const title = currentQuizBook?.title;
    const chapterCount = currentQuizBook?.chapterCount;
    const chapters = currentQuizBook?.chapters || [];

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>確認画面</Text>
                {/*問題集タイトル*/}
                <View style={styles.section}>
                    <Text style={styles.label}>問題集タイトル：</Text>
                    <Text style={styles.value}>{title}</Text>
                </View>
                {/*章数*/}
                <View style={styles.section}>
                    <Text style={styles.label}>問題集タイトル：</Text>
                    <Text style={styles.value}>{chapterCount}</Text>
                </View>
                {/*各章の詳細*/}
                {chapters.map((chapter, chapterIndex) => (
                    <View key={chapterIndex} style={styles.chapterContainer}>
                        <Text style={styles.chapterTitle}>
                            第{chapter.chapterNumber}章: {chapter.title}
                        </Text>
                        {/*節がある場合*/}
                        {chapter.sections && chapter.sections.length > 0 ? (
                            chapter.sections.map((section, sectionIndex) => (
                                <View key={sectionIndex} style={styles.sectionContainer}>
                                    <Text style={styles.sectionText}>
                                        第{section.sectionNumber}節： {section.title}
                                    </Text>
                                    <Text style={styles.questionCount}>
                                        問題数： {section.questionCount}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            /*節がない場合は章の問題数を表示*/
                            <Text style={styles.questionCount}>
                                問題数： {chapter.questionCount || 0}
                            </Text>
                        )}
                    </View>
                ))}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    chapterContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    sectionContainer: {
        marginLeft: 16,
        marginBottom: 8,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#007AFF',
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#555',
    },
    questionCount: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },
});

export default ConfirmDisplay