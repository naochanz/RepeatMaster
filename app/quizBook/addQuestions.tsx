import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import QuestionCountInput from './Input/QuestionCountInput'
import { useQuizBookStore } from './Input/stores/quizBookStore'

const addQuestions = () => {
    const currentQuizBook = useQuizBookStore(state => state.currentQuizBook);
    const chapters = currentQuizBook?.chapters || [];
    return (
        <ScrollView>
            {chapters.map((chapter, chapterIndex) => {
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
                    ))
                    : <QuestionCountInput
                        key={chapterIndex}
                        title={`第${chapter.chapterNumber}章問題数`}
                        chapterNumber={chapter.chapterNumber}
                        chapterIndex={chapterIndex}
                    />;
            })}
        </ScrollView>
    )
}

export default addQuestions