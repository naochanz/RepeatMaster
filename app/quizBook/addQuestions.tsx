import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import QuestionCountInput from './Input/QuestionCountInput'
import { useQuizBookStore } from './Input/stores/quizBookStore'
import Header from '../compornents/Header'

const AddQuestions = () => {  // ← 大文字に変更
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const chapters = currentQuizBook?.chapters || [];
    
    console.log('currentQuizBook:', currentQuizBook); // デバッグ用
    console.log('chapters:', chapters); // デバッグ用
    
    return (
        <>
            <Header />
            <ScrollView style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                    問題数を入力
                </Text>
                
                {chapters.length === 0 ? (
                    <Text>章が設定されていません</Text>
                ) : (
                    chapters.flatMap((chapter, chapterIndex) => {
                        const hasSections = chapter.sections && chapter.sections.length > 0;

                        return hasSections
                            ? chapter.sections?.map((section, sectionIndex) => (
                                <QuestionCountInput
                                    key={`${chapterIndex}-${sectionIndex}`}
                                    title={`第${chapter.chapterNumber}章第${section.sectionNumber}節問題数`}
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
                    })
                )}
            </ScrollView>
        </>
    )
}

export default AddQuestions