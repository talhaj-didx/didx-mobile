import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { theme } from '../constants/theme';

export const OfflineScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <WifiOff size={64} color={theme.TEXT_SECONDARY} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.message}>
        Please check your connection and try again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.BACKGROUND,
    padding: theme.SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.TEXT,
    marginTop: theme.SPACING.lg,
    marginBottom: theme.SPACING.sm,
  },
  message: {
    fontSize: 16,
    color: theme.TEXT_SECONDARY,
    textAlign: 'center',
  },
});
