// ExperienciaScreen.web.tsx - Versión WEB únicamente
// Metro usa este archivo automáticamente en web, en lugar de ExperienciaScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ExperienciaScreen() {
  const [notes, setNotes] = useState('');

  return (
    <LinearGradient colors={[colors.background, colors.backgroundDark]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero Header */}
        <LinearGradient
          colors={[colors.primaryDark, colors.primary, '#8E24AA']}
          style={styles.heroHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroBadge}>
            <MaterialCommunityIcons name="youtube" size={16} color={colors.primaryDark} />
            <Text style={styles.heroBadgeText}>Video</Text>
          </View>
          <Text style={styles.heroTitle}>Mi Experiencia</Text>
          <Text style={styles.heroSubtitle}>con esta Tarea</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="account" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.metaText}>Jose David Castillo</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="school" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.metaText}>ITLA · 2025</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Video Card — using iframe on web */}
        <View style={styles.videoCard}>
          <View style={styles.videoHeader}>
            <View style={styles.videoLiveIndicator}>
              <View style={styles.videoLiveDot} />
              <Text style={styles.videoLiveText}>Video</Text>
            </View>
          </View>
          {/* Native iframe for web */}
          <View style={styles.iframeContainer}>
            <iframe
              width="100%"
              height="210"
              src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
              title="Mi Experiencia con esta Tarea"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block', border: 'none' }}
            />
          </View>
        </View>

        {/* Notes Card */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <View style={styles.notesIconWrap}>
              <MaterialCommunityIcons name="notebook-edit-outline" size={22} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.notesTitle}>Notas Personales</Text>
              <Text style={styles.notesSubtitle}>Reflexiones sobre la tarea</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={6}
            placeholder="Escribe aquí cómo te fue con esta tarea..."
            placeholderTextColor={colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
          <View style={styles.charCountRow}>
            <MaterialCommunityIcons name="pencil-outline" size={14} color={colors.textMuted} />
            <Text style={styles.charCount}>{notes.length} caracteres</Text>
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 48 },
  heroHeader: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
    marginBottom: 14,
  },
  heroBadgeText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 11,
    color: colors.primaryDark,
  },
  heroTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 34,
    color: colors.white,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 16,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.5)' },
  videoCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  videoLiveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  videoLiveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E53935' },
  videoLiveText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: colors.textSecondary },
  iframeContainer: { backgroundColor: '#000', overflow: 'hidden' },
  notesCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  notesHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  notesIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notesTitle: { ...typography.h3, color: colors.text },
  notesSubtitle: { ...typography.caption, color: colors.textLight, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 16 },
  textArea: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
    ...typography.body,
    minHeight: 140,
    borderWidth: 1.5,
    borderColor: colors.border,
    color: colors.text,
    marginBottom: 12,
  },
  charCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-end',
  },
  charCount: { ...typography.caption, color: colors.textMuted },
});
