import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Typography } from '../components/Typography';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

export const HomeScreen = () => {
  const { user, logout } = useAuth();

  const footer = <PrimaryButton label="Logout" onPress={logout} />;

  return (
    <ScreenContainer footer={footer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Typography variant="subtitle" style={styles.welcomeLabel}>
            Logged in as
          </Typography>
          <Typography variant="title" numberOfLines={1}>
            {user?.name}
          </Typography>
          <Typography variant="body" style={styles.email}>
            {user?.email}
          </Typography>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundSecondary,
    ...theme.shadow.card,
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  welcomeLabel: {
    marginBottom: theme.spacing.xl,
    color: theme.colors.textMuted,
  },
  email: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
});
