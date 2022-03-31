import { Dimensions } from "react-native";


export const COLORS = {
  // colors
  pink: '#f4717f',
  lightPink: '#bd969a',
  white: '#FFFFFF',
  lightGray: '#dad8d9',
  notSoGray: '#7F7E85',
  gray: '#181818',
  black: '#000000',
  gold: '#f5c518',
  darkGray: "#1f1f1f",
  red: '#D91438',
  orange: '#F9B243',
  green: '#60A679',
};

export const SIZES = {
  biggerText: 50,
  bigText: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
}

export const MARGIN = {
  m1: Dimensions.get('window').width * 0.02,
  m2: Dimensions.get("window").width * 0.003,
  m3: Dimensions.get("window").height * 0.02,
  m4: Dimensions.get("window").height * 0.008,
  m5_big: Dimensions.get("window").height * 0.04,
  m6: Dimensions.get("window").width * 0.05,
  m7: Dimensions.get("window").width * 0.012,
}

export const PADDING = {
  pd1: 35,
  pd2: 30,
  pd3: 27,
  pd4: 25,
  pd5: 20,
}
export const TOTAL_HEIGHT = Dimensions.get('window').height
export const TOTAL_WIDTH = Dimensions.get('window').width
