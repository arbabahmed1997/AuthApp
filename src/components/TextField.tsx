import React, { useState, forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import { Typography } from './Typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  secureToggle?: boolean;
};

export const TextField = forwardRef<TextInput, Props>(
  (
    {
      label,
      error,
      containerStyle,
      secureTextEntry,
      secureToggle = false,
      ...rest
    },
    ref,
  ) => {
    const [isSecure, setIsSecure] = useState<boolean>(!!secureTextEntry);

    const shouldShowToggle = secureToggle;

    return (
      <View style={containerStyle}>
        <Typography variant="caption" style={styles.label}>
          {label}
        </Typography>
        <View
          style={[
            styles.inputContainer,
            error ? styles.inputContainerError : undefined,
          ]}
        >
          <TextInput
            ref={ref}
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            secureTextEntry={isSecure}
            {...rest}
          />
          {shouldShowToggle && (
            <Icon
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.colors.textSecondary}
              onPress={() => setIsSecure(prev => !prev)}
            />
          )}
        </View>
        {error ? (
          <Typography variant="caption" style={styles.errorText}>
            {error}
          </Typography>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: theme.spacing.md,
    height: 52,
  },
  inputContainerError: {
    borderColor: theme.colors.danger,
  },
  input: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.primary.regular,
  },
  errorText: {
    marginTop: theme.spacing.xs,
    color: theme.colors.danger,
  },
});
