import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../compornents/Header'
import QuizBookNameInput from './Input/QuizBookNameInput'
import ConfirmButton from './Input/ConfirmButton'
import ChapterSectionInput from './Input/ChapterSectionInput'
import { router } from 'expo-router'
import { useQuizBookStore } from './Input/stores/quizBookStore'

const goToSectionInput = () => {
    router.push('./quizBook/AddSection')
}


const AddQuizBook = () => {

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>

                <View style={styles.section} >
                    <Text style={styles.sectionTitle}>問題集名：</Text>
                    <View style={styles.placeholder}>
                        <QuizBookNameInput />
                    </View>
                </View>
                <View style={styles.section} >
                    <Text style={styles.sectionTitle}>章：</Text>
                    <View style={styles.placeholder}>
                        <ChapterSectionInput />
                    </View>
                </View>
                <View style={styles.section} >
                    <View style={styles.buttonContainer}>
                        <ConfirmButton
                            title="節の設定へ進む"
                            onPress={goToSectionInput}
                            backgroundColor="#007AFF"
                        />
                    </View>
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
    section: {
        marginTop: 25,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    placeholder: {
        backgroundColor: '#e0e0e0',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    buttonContainer: {
        marginTop: 40,
    },
});

export default AddQuizBook