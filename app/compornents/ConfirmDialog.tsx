import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '@/constants/Theme';
import { AlertTriangle } from 'lucide-react-native';

interface ConfirmDialogProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ visible, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <View style={styles.iconContainer}>
                        <AlertTriangle size={48} color={theme.colors.warning[600]} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>キャンセル</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmButtonText}>削除</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    dialog: {
        backgroundColor: theme.colors.neutral.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        width: '100%',
        maxWidth: 400,
        ...theme.shadows.xl,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.fontSizes.xl,
        fontWeight: theme.typography.fontWeights.bold as any,
        color: theme.colors.secondary[900],
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
        fontFamily: 'ZenKaku-Bold',
    },
    message: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.secondary[600],
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        fontFamily: 'ZenKaku-Regular',
    },
    buttons: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.secondary[300],
        backgroundColor: theme.colors.neutral.white,
    },
    cancelButtonText: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold as any,
        color: theme.colors.secondary[700],
        textAlign: 'center',
        fontFamily: 'ZenKaku-Bold',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.error[600],
    },
    confirmButtonText: {
        fontSize: theme.typography.fontSizes.base,
        fontWeight: theme.typography.fontWeights.semibold as any,
        color: theme.colors.neutral.white,
        textAlign: 'center',
        fontFamily: 'ZenKaku-Bold',
    },
});

export default ConfirmDialog;
