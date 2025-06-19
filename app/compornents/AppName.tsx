import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AppName = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appNameText}>RepeatMaster</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ///justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#d0d5d9'
    },
    appNameText:{
        fontSize: 30,
        
    }
});

export default AppName