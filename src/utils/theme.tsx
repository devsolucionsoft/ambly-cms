export type iconsTypes = "Mail" | "Password"
export type paletteTypes =
  | "ligth"
  | "black"
  | "dark"
  | "graySecondary"
  | "grayText"
  | "redPrimary"
  | "yellowPrimary"
  | "yellowSecondary"
  | "blueText"

export type paletteGradientTypes = "gradientGray"

export const palette = {
  ligth: "#FFFFFF",
  black: "#000000",
  dark: "#181818",
  grayText: "#B3B3B3",
  graySecondary: "#2B2B2B",
  redPrimary: "#DB3740",
  yellowPrimary: "#FBBC02",
  yellowSecondary: "#F8E84B",
  blueText: "#8FDDFE",
}

export const paletteGradient = {
  gradientGray: ["#000000", "#4A4A4A"],
  gradientOpacity: ["#181818", "transparent"],
  gradientOpacity2: ["#101010d4", "transparent"],
}
