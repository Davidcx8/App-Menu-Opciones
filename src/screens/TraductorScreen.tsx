import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Keyboard, Animated, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { numberToWords } from '../utils/numberToWords';

export default function TraductorScreen() {
  const [num, setNum] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [focused, setFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const handleTranslate = () => {
    Keyboard.dismiss();
    const parsed = parseInt(num, 10);

    if (num.trim() === '' || isNaN(parsed) || parsed < 1 || parsed > 1000) {
      setIsError(true);
      setResult('Ingresa un número entero entre 1 y 1,000');
      animateIn();
      return;
    }
    setIsError(false);
    setResult(numberToWords(parsed));
    animateIn();
  };

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient colors={[colors.background, colors.backgroundDark]} style={styles.screen}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scroll} 
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >

          {/* Header */}
          <View style={styles.headerBlock}>
            <Text style={{ fontSize: 70, marginBottom: 10 }}>🔠</Text>
            <Text style={styles.title}>Número a Letras</Text>
            <Text style={styles.subtitle}>Convierte cualquier número al español</Text>

            {/* Range chip */}
            <View style={styles.rangeChip}>
              <MaterialCommunityIcons name="information-outline" size={14} color={colors.primary} />
              <Text style={styles.rangeText}>Rango válido: 1 — 1,000</Text>
            </View>
          </View>

          {/* Input Card */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Ingresa un número</Text>
            <View style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}>
              <MaterialCommunityIcons
                name="pound"
                size={22}
                color={focused ? colors.primary : colors.textMuted}
              />
              <TextInput
                style={styles.input}
                placeholder="Ej: 547"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={num}
                onChangeText={setNum}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                maxLength={4}
              />
              {num !== '' && (
                <TouchableOpacity onPress={() => { setNum(''); setResult(null); }}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={handleTranslate} activeOpacity={0.85}>
              <LinearGradient
                colors={[colors.accent, '#E6AA00']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <MaterialCommunityIcons name="translate" size={20} color={colors.primaryDark} />
                <Text style={styles.buttonText}>Convertir</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Result */}
          {result !== null && (
            <Animated.View
              style={[
                styles.resultCard,
                isError && styles.resultCardError,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              {isError ? (
                <View style={styles.resultInner}>
                  <MaterialCommunityIcons name="alert-circle" size={36} color={colors.error} />
                  <Text style={[styles.resultText, styles.resultTextError]}>{result}</Text>
                </View>
              ) : (
                <View>
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberBadgeText}>{num}</Text>
                  </View>
                  <View style={styles.resultInner}>
                    <MaterialCommunityIcons name="format-letter-case" size={30} color={colors.accent} />
                    <Text style={styles.resultLabel}>En español:</Text>
                    <Text style={styles.resultText}>{result}</Text>
                  </View>
                </View>
              )}
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 48 },
  headerBlock: { alignItems: 'center', marginBottom: 28 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: { ...typography.h1, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textLight, textAlign: 'center', marginTop: 4, marginBottom: 14 },
  rangeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rangeText: { fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: colors.primary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  inputLabel: { ...typography.label, marginBottom: 10 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 20,
    gap: 12,
  },
  inputWrapperFocused: {
    borderColor: colors.primaryLight,
    backgroundColor: '#F9F4FF',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    color: colors.primary,
    padding: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: colors.primaryDark,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    borderLeftWidth: 5,
    borderLeftColor: colors.accent,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  resultCardError: { borderLeftColor: colors.error },
  numberBadge: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
    alignItems: 'center',
  },
  numberBadgeText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 36,
    color: colors.accent,
    letterSpacing: 2,
  },
  resultInner: { alignItems: 'center', padding: 24, gap: 8 },
  resultLabel: {
    ...typography.label,
    color: colors.textLight,
  },
  resultText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 32,
    textTransform: 'capitalize',
  },
  resultTextError: { color: colors.error, fontSize: 16 },
});
