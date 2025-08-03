import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useQuizBookStore } from './stores/quizBookStore'

const QuizBookNameInput = () => {
  const [value, setValue] = useState('');
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);

  const handleChangeText = (text: string) => {
    setValue(text);
    // リアルタイムでZustandに保存
    updateCurrentQuizBook({ title: text });
  }

  return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="問題集名を入力してください"
          onChangeText={handleChangeText}
          value={value}
        />
      </View>
    )
  }

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: '#333'
  },
})

export default QuizBookNameInput