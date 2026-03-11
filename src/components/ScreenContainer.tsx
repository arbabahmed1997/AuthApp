import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  statusBarColor?: string;
};

export const ScreenContainer = ({
  children,
  header,
  footer,
  contentContainerStyle,
  statusBarColor = theme.colors.backgroundPrimary,
}: Props) => {
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: statusBarColor }]}
    >
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />

      <View style={styles.gradientOverlay} />

      <KeyboardAwareScrollView
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll
      >
        {header ? <View style={styles.header}>{header}</View> : null}

        <View style={styles.body}>{children}</View>

        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  header: {
    marginVertical: theme.spacing.xl,
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    marginVertical: theme.spacing.xl,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.backgroundSecondary,
    pointerEvents: 'none',
  },
});
