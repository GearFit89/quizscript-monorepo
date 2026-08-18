export const theme = {
  colors: {
    primary: "rgb(var(--primary) / <alpha-value>)",
    primaryForeground: "rgb(var(--primary-foreground) / <alpha-value>)",
    background: "rgb(var(--background) / <alpha-value>)",
    foreground: "rgb(var(--foreground) / <alpha-value>)",
    card: "rgb(var(--card) / <alpha-value>)",
    muted: "rgb(var(--muted) / <alpha-value>)",
    mutedForeground: "rgb(var(--muted-foreground) / <alpha-value>)",
  },
  opacity: {
    enabled: "opacity-100",
    disabled: "opacity-60",
  },
} as const;

export type Theme = typeof theme;