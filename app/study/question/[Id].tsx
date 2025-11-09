import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { mockQuizBooks } from '../../mockData/mockQuizBooks'
import Header from '../../compornents/Header'
import { useLocalSearchParams } from 'expo-router'
const questionList = () => {
    const { id, type, title, chapterNumber, sectionNumber, chapterTitle } = useLocalSearchParams();
    return (
        <>
            <Header />
            <ScrollView>
                {type === 'chpter' ? (
                    //章から来た場合
                    <Text>
                        {chapterNumber}章：{title}
                    </Text>
                ) : (
                    //節から来た場合
                    <Text>
                        第{sectionNumber}節
                    </Text>
                )}
            </ScrollView>
        </>
    )
}


export default questionList