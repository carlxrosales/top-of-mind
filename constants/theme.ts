/**
 * Color palette for the Top of Mind game theme.
 * Black, white, and yellow color scheme matching the physical card game.
 */
export const Colors = {
  yellow: "rgb(255, 220, 0)",
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
};

/**
 * Spacing values for consistent layout spacing throughout the app.
 */
export const Spacing = {
  small: 16,
  medium: 32,
  large: 48,
};

/**
 * Animation configuration constants.
 */
export const Animation = {
  spring: {
    damping: 24,
    stiffness: 142,
  },
  duration: {
    fast: 200,
    normal: 300,
    medium: 400,
    slow: 600,
    toast: 5000,
  },
  opacity: {
    hidden: 0,
    visible: 1,
  },
  translate: {
    toast: {
      top: -100,
      bottom: 100,
    },
  },
};
