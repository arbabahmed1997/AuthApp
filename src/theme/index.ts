import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },
  shadow: {
    card: {
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 5,
    },
  },
} as const;

export type Theme = typeof theme;
