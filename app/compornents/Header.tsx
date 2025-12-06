import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import { Settings } from 'lucide-react-native'

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>RepeatMaster</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={theme.colors.secondary[700]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary[200],
    ...theme.shadows.sm,
  },
  appTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold as any,
    color: theme.colors.secondary[900],
    fontFamily: 'ZenKaku-Bold',
    letterSpacing: 0.5,
  },
  settingsButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
});

export default Header