import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '@/constants/Theme';
import { Plus, Minus } from 'lucide-react-native';

interface CounterInputProps {
    label: string;
    value: number | string;
    onIncrement: () => void;
    onDecrement: () => void;
    disabled?: boolean;
    isEditMode?: boolean;
    onChangeText?: (text: string) => void;
    placeholder?: string;
};

const CounterInput = ({
    label,
    value,
    onIncrement,
    onDecrement,
    disabled = false,
    isEditMode = false,
    onChangeText,
    placeholder
}: CounterInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {isEditMode && (
                    <TouchableOpacity
                        style={[styles.button, disabled && styles.buttonDisabled]}
                        onPress={onDecrement}
                        disabled={disabled}
                    >
                        < Minus size={20} color={theme.colors.secondary[600]} />
                    </TouchableOpacity>
                )}

                <TextInput
                    style={[styles.input, isEditMode && styles.inputEditMode]}
                    value={String(value)}
                    editable={!isEditMode}
                    onChangeText={onChangeText}
                    keyboardType="numeric"
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.secondary[400]}
                />
                {isEditMode && (
                    <TouchableOpacity
                        style={[styles.button, disabled && styles.buttonDisabled]}
                        onPress={onIncrement}
                    >
                        <Plus size={20} color={theme.colors.secondary[600]} />
                    </TouchableOpacity>
                )}
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold as any,
        color: theme.colors.secondary[900],
        marginBottom: theme.spacing.sm,
        fontFamily: 'ZenKaku-Bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.primary[50],
        borderWidth: 1,
        borderColor: theme.colors.primary[300],
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: theme.colors.secondary[50],
        borderColor: theme.colors.secondary[200],
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.secondary[300],
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        fontSize: theme.typography.fontSizes.base,
        backgroundColor: theme.colors.secondary[50],
        color: theme.colors.secondary[600],
        textAlign: 'center',
        fontFamily: 'ZenKaku-Medium',
    },
    inputEditMode: {
        backgroundColor: theme.colors.neutral[100],
    },
});

export default CounterInput;