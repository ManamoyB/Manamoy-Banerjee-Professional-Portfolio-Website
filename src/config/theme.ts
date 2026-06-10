export const theme = {
  light: {
    background: "oklch(0.985 0.004 106)",
    foreground: "oklch(0.16 0.018 255)",
    card: "oklch(0.998 0.002 106)",
    primary: "oklch(0.45 0.13 190)",
    accent: "oklch(0.54 0.12 145)",
    muted: "oklch(0.94 0.01 245)",
    mutedForeground: "oklch(0.43 0.028 255)",
    border: "oklch(0.88 0.012 245)",
    ring: "oklch(0.55 0.14 190)",
  },
  dark: {
    background: "oklch(0.09 0.012 255)",
    foreground: "oklch(0.97 0.004 255)",
    card: "oklch(0.14 0.016 255)",
    primary: "oklch(0.76 0.16 190)",
    accent: "oklch(0.78 0.15 145)",
    muted: "oklch(0.22 0.018 255)",
    mutedForeground: "oklch(0.74 0.018 255)",
    border: "oklch(1 0 0 / 12%)",
    ring: "oklch(0.76 0.16 190)",
  },
  gradients: {
    brand: "linear-gradient(135deg, var(--primary), var(--accent))",
    hero:
      "radial-gradient(circle at top left, var(--brand-soft), transparent 32rem), radial-gradient(circle at 85% 10%, var(--accent-soft), transparent 26rem), var(--background)",
  },
};

export const openGraphTheme = {
  background: "#111827",
  primary: "#2DD4BF",
  foreground: "#F8FAFC",
  muted: "#CBD5E1",
};
