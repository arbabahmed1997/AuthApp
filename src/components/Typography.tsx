import React, { ReactNode } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'button';

type Props = TextProps & {
  children: ReactNode;
  variant?: Variant;
};

export const Typography = ({
  children,
  style,
  variant = 'body',
  ...rest
}: Props) => {
  const variantStyle = styles[variant];

  return (
    <Text style={[styles.base, variantStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary.regular,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.lineHeight.xl,
    fontFamily: theme.typography.fontFamily.primary.bold,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.lg,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary.medium,
  },
  body: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  caption: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.sm,
    color: theme.colors.textMuted,
  },
  button: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.md,
    fontFamily: theme.typography.fontFamily.primary.semiBold,
  },
});
