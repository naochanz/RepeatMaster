import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { mockQuizBooks } from '../mockData/mockQuizBooks'
import { useLocalSearchParams } from 'expo-router'

const StudyHome = () => {

    const { id } = useLocalSearchParams();
    const quizBook = mockQuizBooks.find(book => book.id === id)

    return (
        <ScrollView>
            <Text></Text>
        </ScrollView>
    )
}

export default StudyHome