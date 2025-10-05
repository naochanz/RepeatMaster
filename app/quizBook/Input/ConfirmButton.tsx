import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface ConfirmButtonProps {
  onPress: () => void
  title: string
  backgroundColor: string
  disabled?: boolean
}

const ConfirmButton = ({ title, onPress, backgroundColor = '#007AFF', disabled = false }: ConfirmButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button,
        { backgroundColor },
        disabled && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[
          styles.buttonText,
          disabled && styles.disabledText
        ]}>
          {title}
        </Text>
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
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#ccc',
  }
})
export default ConfirmButton