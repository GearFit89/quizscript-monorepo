export const theme = {
  colors: {
    primary: "rgb(var(--primary) / <alpha-value>)",
    primaryForeground: "rgb(var(--primary-foreground) / <alpha-value>)",
    secondary: "rgb(var(--secondary) / <alpha-value>)",
    secondaryForeground: "rgb(var(--secondary-foreground) / <alpha-value>)",
    accent: "rgb(var(--accent) / <alpha-value>)",
    accentForeground: "rgb(var(--accent-foreground) / <alpha-value>)",
    background: "rgb(var(--background) / <alpha-value>)",
    foreground: "rgb(var(--foreground) / <alpha-value>)",
    card: "rgb(var(--card) / <alpha-value>)",
    cardForeground: "rgb(var(--card-foreground) / <alpha-value>)",
    muted: "rgb(var(--muted) / <alpha-value>)",
    mutedForeground: "rgb(var(--muted-foreground) / <alpha-value>)",
    border: "rgb(var(--border) / <alpha-value>)",
    destructive: "rgb(var(--destructive) / <alpha-value>)",
    destructiveForeground: "rgb(var(--destructive-foreground) / <alpha-value>)",
    success: "rgb(var(--success) / <alpha-value>)",
    successForeground: "rgb(var(--success-foreground) / <alpha-value>)",
  },
  opacity: {
    enabled: "opacity-100",
    disabled: "opacity-60",
  },
} as const;

export type Theme = typeof theme;