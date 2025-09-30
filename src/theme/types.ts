export interface KlerosTheme {
  mode: "light" | "dark";
  colors: {
    primaryPurple: string;
    secondaryPurple: string;
    mediumPurple: string;
    lightPurple: string;
    primaryBlue: string;
    secondaryBlue: string;
    mediumBlue: string;
    lightBlue: string;
    primaryText: string;
    secondaryText: string;
    stroke: string;
    lightGrey: string;
    whiteBackground: string;
    lightBackground: string;
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    tint: string;
    tintMedium: string;
    tintPurple: string;
  };
  shadows: {
    default: string;
    hovered: string;
    input: string;
  };
  transitions: {
    speed: string;
    ease: string;
  };
  radius: {
    base: string;
    boxDefault: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  animations: {
    fadeIn: string;
    fadeOut: string;
    bounceIn: string;
    scaleIn: string;
    scaleOut: string;
    progressFill: string;
    breathing: string;
    loading: string;
  };
}
