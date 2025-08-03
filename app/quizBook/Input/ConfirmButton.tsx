import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface ConfirmButtonProps {
  onPress: () => void
  title: string
  backgroundColor: string
}

const ConfirmButton = ({ title, onPress, backgroundColor='#007AFF' }: ConfirmButtonProps) => {
  return (
    <View>
      <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={onPress}
    >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ConfirmButton