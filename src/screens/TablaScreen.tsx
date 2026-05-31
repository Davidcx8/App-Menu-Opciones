import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Keyboard, Animated, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function TablaScreen() {
  const [num, setNum] = useState('');
  const [tableBase, setTableBase] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const rowAnims = useRef<Animated.Value[]>([]).current;

  if (rowAnims.length === 0) {
    for (let i = 0; i < 13; i++) rowAnims.push(new Animated.Value(0));
  }

  const handleGenerate = () => {
    Keyboard.dismiss();
    const parsed = parseInt(num, 10);
    if (!isNaN(parsed) && parsed !== 0) {
      rowAnims.forEach(a => a.setValue(0));
      setTableBase(parsed);
    }
  };

  useEffect(() => {
    if (tableBase !== null) {
      const anims = rowAnims.map((anim, i) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          delay: i * 60,
          useNativeDriver: true,
        })
      );
      Animated.stagger(60, anims).start();
    }
  }, [tableBase]);

  return (
    <LinearGradient colors={[colors.background, colors.backgroundDark]} style={styles.screen}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Fixed Header */}
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <Text style={{ fontSize: 45, marginRight: 10 }}>✖️</Text>
            <View>
              <Text style={styles.title}>Tabla de Multiplicar</Text>
              <Text style={styles.subtitle}>Del 1 al 13</Text>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}>
              <Text style={styles.xSymbol}>×</Text>
              <TextInput
                style={styles.input}
                placeholder="Número"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={num}
                onChangeText={setNum}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </View>
            <TouchableOpacity onPress={handleGenerate} activeOpacity={0.85}>
              <LinearGradient
                colors={[colors.primaryLight, colors.primaryDark]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialCommunityIcons name="play" size={20} color={colors.white} />
                <Text style={styles.buttonText}>Generar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Table header */}
          {tableBase !== null && (
            <View style={styles.tableHeader}>
              <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.tableHeaderGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.tableHeaderText}>Operación</Text>
                <View style={styles.tableHeaderSeparator} />
                <Text style={styles.tableHeaderText}>Resultado</Text>
              </LinearGradient>
            </View>
          )}
        </View>

        <ScrollView 
          style={styles.tableScroll} 
          contentContainerStyle={styles.tableContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          {tableBase !== null &&
            Array.from({ length: 13 }).map((_, index) => {
              const multiplier = index + 1;
              const result = tableBase * multiplier;
              const isEven = multiplier % 2 === 0;
              return (
                <Animated.View
                  key={multiplier}
                  style={[
                    styles.row,
                    isEven ? styles.rowEven : styles.rowOdd,
                    {
                      opacity: rowAnims[index],
                      transform: [{
                        translateX: rowAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      }],
                    },
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <View style={[styles.multiplierBadge, isEven && styles.multiplierBadgeEven]}>
                      <Text style={[styles.multiplierText, isEven && styles.multiplierTextEven]}>
                        ×{multiplier}
                      </Text>
                    </View>
                    <Text style={styles.equation}>
                      {tableBase} × {multiplier}
                    </Text>
                  </View>
                  <View style={styles.resultBadge}>
                    <Text style={styles.resultText}>{result}</Text>
                  </View>
                </Animated.View>
              );
            })}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  title: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textLight, marginTop: 2 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 8,
  },
  inputWrapperFocused: { borderColor: colors.primaryLight },
  xSymbol: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: colors.primary,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: colors.primary,
    padding: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: { ...typography.buttonText, fontSize: 14 },
  tableHeader: { borderRadius: 12, overflow: 'hidden', marginBottom: 6 },
  tableHeaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tableHeaderText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  tableHeaderSeparator: { width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 8 },
  tableScroll: { flex: 1 },
  tableContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 6 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rowOdd: { backgroundColor: colors.surface },
  rowEven: { backgroundColor: '#EDE7F6' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  multiplierBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiplierBadgeEven: { backgroundColor: colors.primary },
  multiplierText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    color: colors.textSecondary,
  },
  multiplierTextEven: { color: colors.white },
  equation: { ...typography.body, color: colors.textSecondary },
  resultBadge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
  },
  resultText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: colors.accent,
  },
});
