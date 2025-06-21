import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AppName from '../compornents/AppName';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
    email: z.string().email('正しいメールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginScreenNavigaionProp = NativeStackNavigationProp<AuthStackParamList, 'login'>;

const signup = () => {
    const navigation = useNavigation<LoginScreenNavigaionProp>();

    const {
        control, //reactだとregisterで入力値参照
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = (data: SignupFormData) => {
        console.log('サインアップデータ', data);
    };

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
                        <Controller
                            control={control}
                            name='email'
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text style={styles.mailText}>メールアドレス：</Text>
                                    <TextInput value={value} onChangeText={onChange} placeholder='example@e-mail.com' style={styles.email} placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                                    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>
                                    }
                                </View>
                            )}
                        />
                    </View>
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passContainer}>
                                <Text style={styles.passText}>パスワード：</Text>
                                <TextInput value={value}
                                    onChangeText={onChange}
                                    placeholder='パスワードを入力してください'
                                    style={styles.password}
                                    secureTextEntry={true}
                                    placeholderTextColor="rgba(100, 100, 100, 0.7)"
                                />
                                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>
                                }
                            </View>
                        )}

                    />
                    <Controller
                        control={control}
                        name='confirmPassword'
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passContainer}>
                                <Text style={styles.passText}>パスワード(確認用)：</Text>
                                <TextInput value={value}
                                    onChangeText={onChange}
                                    placeholder='パスワードを入力してください'
                                    style={styles.password}
                                    secureTextEntry={true}
                                    placeholderTextColor="rgba(100, 100, 100, 0.7)" />
                                {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>
                                }
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.signupButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>新規登録</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}
                    >
                        <Text style={styles.buttonText}>ログイン画面へ戻る</Text>
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

    signupButton: {
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
    loginButton: {
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
    error: {
        color: 'red'
    },
});
export default signup