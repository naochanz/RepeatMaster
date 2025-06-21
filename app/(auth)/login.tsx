import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AppName from '../compornents/AppName';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigaionProp = NativeStackNavigationProp<AuthStackParamList, 'login'>;
const login = () => {
    const navigation = useNavigation<LoginScreenNavigaionProp>();

    return (
        <>
            <View>
                <AppName />
            </View>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginContainerText}>ログイン情報を入力してください</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.mailContainer}>
                        <Text style={styles.mailText}>メールアドレス：</Text>
                        <TextInput placeholder='example@e-mail.com' style={styles.email} placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                    </View>
                    <View style={styles.passContainer}>
                        <Text style={styles.passText}>パスワード：</Text>
                        <TextInput placeholder='パスワードを入力してください' style={styles.password} placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('app')}>ログイン</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('signup')}
                    >
                        <Text style={styles.buttonText}>新規登録</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </View>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#525150'
    },
    loginContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainerText: {
        //fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    formContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    mailContainer: {
        //marginTop: 10,
        marginBottom: 10,
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
        width: '100%',
        backgroundColor: 'white'
    },
    passContainer: {
        marginTop: 10,
        marginBottom: 10,
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
        width: '100%',
        backgroundColor: 'white'
    },

    loginButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#418cba',
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    signupButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#de6f2f',
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold'
    },
});
export default login