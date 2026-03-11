import React, { useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { ScreenContainer } from '../components/ScreenContainer';
import { Typography } from '../components/Typography';
import { TextField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';
import { theme } from '../theme';
import { useLoginForm } from '../hooks/useLoginForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const passwordRef = useRef<TextInput>(null);
  const { form, errors, submitting, handleChange, handleSubmit } =
    useLoginForm();

  const handleLoginSubmit = async () => {
    await handleSubmit();
  };

  const header = (
    <View>
      <Typography variant="title">Welcome back</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Log in to continue where you left off.
      </Typography>
    </View>
  );

  const footer = (
    <View style={styles.footerRow}>
      <Typography variant="caption">Don't have an account?</Typography>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Typography variant="caption" style={styles.footerLink}>
          Create one
        </Typography>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenContainer header={header} footer={footer}>
      <View style={styles.form}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          autoCorrect={false}
          value={form.email}
          onChangeText={value => handleChange('email', value)}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          error={errors.email}
          containerStyle={styles.field}
        />
        <TextField
          ref={passwordRef}
          label="Password"
          placeholder="Enter your password"
          autoCapitalize="none"
          secureTextEntry
          secureToggle
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={form.password}
          onChangeText={value => handleChange('password', value)}
          error={errors.password}
          containerStyle={styles.field}
        />
        {errors.global ? (
          <Typography variant="caption" style={styles.globalError}>
            {errors.global}
          </Typography>
        ) : null}
        <PrimaryButton
          label="Login"
          onPress={handleLoginSubmit}
          loading={submitting}
          style={styles.submitButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  form: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
  globalError: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.accentSecondary,
    textDecorationLine: 'underline',
  },
});
