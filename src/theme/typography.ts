import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
    color: '#1A0A2E',
  },
  h2: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    lineHeight: 30,
    color: '#1A0A2E',
  },
  h3: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    lineHeight: 24,
    color: '#1A0A2E',
  },
  body: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#3D2B5E',
  },
  caption: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
    color: '#7B6F8C',
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    letterSpacing: 0.8,
    color: '#7B6F8C',
    textTransform: 'uppercase',
  },
});
