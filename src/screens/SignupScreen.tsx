import React, { useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
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
import { useSignupForm } from '../hooks/useSignupForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export const SignupScreen = ({ navigation }: Props) => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { form, errors, submitting, handleChange, handleSubmit } =
    useSignupForm();

  const handleSignupSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      Alert.alert(
        'Signup Successful',
        'Your account has been created. Please login.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  const header = (
    <View>
      <Typography variant="title">Create account</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Sign up to start using the app.
      </Typography>
    </View>
  );

  const footer = (
    <View style={styles.footerRow}>
      <Typography variant="caption">Already have an account?</Typography>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Typography variant="caption" style={styles.footerLink}>
          Log in
        </Typography>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenContainer header={header} footer={footer}>
      <View style={styles.form}>
        <TextField
          label="Name"
          placeholder="Your name"
          autoCapitalize="words"
          returnKeyType="next"
          value={form.name}
          onChangeText={value => handleChange('name', value)}
          blurOnSubmit={false}
          onSubmitEditing={() => emailRef.current?.focus()}
          error={errors.name}
          containerStyle={styles.field}
        />
        <TextField
          ref={emailRef}
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          autoCorrect={false}
          value={form.email}
          onChangeText={value => handleChange('email', value)}
          error={errors.email}
          containerStyle={styles.field}
        />
        <TextField
          ref={passwordRef}
          label="Password"
          placeholder="Create a password"
          autoCapitalize="none"
          secureTextEntry
          secureToggle
          value={form.password}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
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
          label="Signup"
          onPress={handleSignupSubmit}
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
