import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AppName from '../compornents/AppName'

const login = () => {
    return (
        <>
            <View>
                <AppName />
            </View>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginContainerText}>ログイン情報を入力してください</Text>
                </View>
                <View style={styles.mailContainer}>
                    <Text style={styles.mailText}>メールアドレス：</Text>
                    <TextInput placeholder='example@e-mail.com' style={styles.email} placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                </View>
                <View style={styles.passContainer}>
                    <Text style={styles.passText}>パスワード：</Text>
                    <TextInput placeholder='パスワードを入力してください' style={styles.password} placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.buttonText}>ログイン</Text>
                </TouchableOpacity>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#525150'
    },
    loginContainer: {
        padding: 40,
        //flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainerText: {
        //fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    mailContainer: {
        padding: 10,
    },
    mailText: {
        color: 'white',
        paddingVertical: 5
    },
    email: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        width: 400,
        backgroundColor: 'white'
    },
    passContainer: {
        padding: 10,
    },
    passText: {
        color: 'white',
        paddingVertical: 5
    },
    password: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        width: 400,
        backgroundColor: 'white'
    },

    loginButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        backgroundColor: '#418cba',
        margin: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold'
    },
});
export default login