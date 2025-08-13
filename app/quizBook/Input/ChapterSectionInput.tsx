import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useQuizBookStore } from './stores/quizBookStore'

const ChapterSectionInput = () => {
  const [value, setValue] = useState("");
  const updateCurrentQuizBook = useQuizBookStore(state => state.updateCurrentQuizBook);



  const handleChangeText = (text: string) => {
    setValue(text);
    // 章数を保存
    updateCurrentQuizBook({ chapterCount: parseInt(text) || 0 });

  }

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="登録する章の数を入力してください"
          onChangeText={handleChangeText}
          value={value}
          keyboardType="numeric"
        />
      </View>
</>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: '#333',
  },
})

export default ChapterSectionInput