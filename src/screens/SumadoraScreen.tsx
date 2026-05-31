import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Keyboard, ScrollView, Animated, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function SumadoraScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  const handleSum = () => {
    Keyboard.dismiss();
    setError('');
    const parsed1 = parseFloat(num1.replace(',', '.'));
    const parsed2 = parseFloat(num2.replace(',', '.'));

    if (num1.trim() === '' || num2.trim() === '') {
      setError('Por favor completa ambos campos.');
      setResult(null);
      return;
    }
    if (isNaN(parsed1) || isNaN(parsed2)) {
      setError('Solo se aceptan valores numéricos.');
      setResult(null);
      return;
    }

    setResult(parsed1 + parsed2);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.85);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setError('');
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
            <Text style={{ fontSize: 70, marginBottom: 10 }}>🧮</Text>
            <Text style={styles.title}>Calculadora</Text>
            <Text style={styles.subtitle}>Suma dos números al instante</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Número 1</Text>
            <View style={[styles.inputWrapper, focus1 && styles.inputWrapperFocused]}>
              <MaterialCommunityIcons name="numeric-1-box-outline" size={20} color={focus1 ? colors.primary : colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Ej: 45.5"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
                onFocus={() => setFocus1(true)}
                onBlur={() => setFocus1(false)}
              />
            </View>

            <Text style={styles.inputLabel}>Número 2</Text>
            <View style={[styles.inputWrapper, focus2 && styles.inputWrapperFocused]}>
              <MaterialCommunityIcons name="numeric-2-box-outline" size={20} color={focus2 ? colors.primary : colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Ej: 100"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
                onFocus={() => setFocus2(true)}
                onBlur={() => setFocus2(false)}
              />
            </View>

            {error !== '' && (
              <View style={styles.errorChip}>
                <MaterialCommunityIcons name="alert-circle" size={16} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <MaterialCommunityIcons name="refresh" size={20} color={colors.primary} />
                <Text style={styles.resetText}>Limpiar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress={handleSum} activeOpacity={0.8}>
                <LinearGradient
                  colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <MaterialCommunityIcons name="calculator" size={20} color={colors.white} />
                  <Text style={styles.buttonText}>Sumar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Result */}
          {result !== null && (
            <Animated.View style={[styles.resultCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
              <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.resultGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.resultLabel}>Resultado</Text>
                <Text style={styles.resultValue}>{result}</Text>
                <View style={styles.operationRow}>
                  <Text style={styles.operationText}>{num1} + {num2} = {result}</Text>
                </View>
              </LinearGradient>
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
    backgroundColor: colors.primary,
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
  subtitle: { ...typography.body, color: colors.textLight, textAlign: 'center', marginTop: 4 },
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
  inputLabel: { ...typography.label, marginBottom: 8, marginLeft: 2 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 20,
    gap: 10,
  },
  inputWrapperFocused: {
    borderColor: colors.primaryLight,
    backgroundColor: '#F9F4FF',
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    padding: 0,
  },
  errorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    flex: 1,
    lineHeight: 18,
  },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  resetText: { ...typography.body, color: colors.primary, fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
  buttonContainer: { flex: 1, borderRadius: 14, overflow: 'hidden' },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  buttonText: { ...typography.buttonText },
  resultCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  resultGradient: { padding: 28, alignItems: 'center' },
  resultLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  resultValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 52,
    color: colors.accent,
    lineHeight: 60,
    marginBottom: 10,
  },
  operationRow: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
  },
  operationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
});
