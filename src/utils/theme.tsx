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

export type paletteGradientTypes = "gradientGray"

export const palette = {
  ligth: "#FFFFFF",
  black: "#000000",
  dark: "#2B2B2B",
  grayText: "#B3B3B3",
  graySecondary: "#2B2B2B",
  redPrimary: "#DB3740",
  yellowPrimary: "#FBBC02",
  yellowSecondary: "#F8E84B"
}

export const paletteGradient = {
  gradientGray: ["#161616", "#4A4A4A"],
}
