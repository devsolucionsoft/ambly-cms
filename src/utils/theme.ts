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
  | "blueRed"

export type paletteGradientTypes = "gradientGray"

export const palette = {
  ligth: "#FFFFFF",
  black: "#000000",
  dark: "#181818",
  grayText: "#B3B3B3",
  graySecondary: "#2B2B2B",
  redPrimary: "#FF3437",
  yellowPrimary: "#FBBC02",
  yellowSecondary: "#F8E84B",
  blueText: "#8FDDFE",
  blueRed: "#435B9A",
}

export const paletteGradient = {
  gradientGray: ["#000000", "#4A4A4A"],
  gradientOpacity: ["#181818", "transparent"],
  gradientOpacity2: ["#101010d4", "transparent"],
  gradientOpacity3: ["#242424", "#24242474"],
}
