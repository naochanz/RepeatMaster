import { View, TextInput, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { useQuizBookStore } from './stores/quizBookStore'

const ChapterSectionInput = () => {
  const [value, setValue] = useState("");
  const updateChapter = useQuizBookStore(state => state.updateChapter);

  const handleChangeText = (text: string) => {
    setValue(text);
    updateChapter(0, { title: text })
  }
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="登録する章の数を入力してください"
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
    color: '#333',
  },
})

export default ChapterSectionInput