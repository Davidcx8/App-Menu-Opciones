import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, TouchableOpacity, Linking, ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ExperienciaScreen() {
  const [notes, setNotes] = useState('');

  const openExternalYouTube = () => {
    Linking.openURL('https://www.youtube.com/watch?v=EDMeg7Hxr-4').catch((err) =>
      console.error('Error al abrir URL:', err)
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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

          {/* Video Card */}
          <View style={styles.videoCard}>
            <View style={styles.videoHeader}>
              <View style={styles.videoLiveIndicator}>
                <View style={styles.videoLiveDot} />
                <Text style={styles.videoLiveText}>Video de la Experiencia</Text>
              </View>
              <TouchableOpacity
                onPress={openExternalYouTube}
                style={styles.playButton}
              >
                <MaterialCommunityIcons
                  name="youtube"
                  size={22}
                  color="#FF0000"
                />
                <Text style={styles.playText}>Abrir YouTube</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.videoFrame}
              onPress={openExternalYouTube}
              activeOpacity={0.9}
            >
              <ImageBackground
                source={{ uri: 'https://i.ytimg.com/vi/EDMeg7Hxr-4/hqdefault.jpg' }}
                style={styles.thumbnailBackground}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                  style={styles.thumbnailOverlay}
                >
                  <View style={styles.youtubePlayButton}>
                    <MaterialCommunityIcons name="play" size={36} color={colors.white} />
                  </View>
                  <Text style={styles.thumbnailTitle}>Toca para ver el video</Text>
                  <Text style={styles.thumbnailSubtitle}>Se abrirá directamente en YouTube</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
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
              placeholder="Escribe aquí cómo te fue con esta tarea, qué aprendiste y cómo fue tu experiencia desarrollando esta aplicación..."
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
    </KeyboardAvoidingView>
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
    letterSpacing: 0.5,
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  videoLiveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  videoLiveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E53935' },
  videoLiveText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: colors.textSecondary },
  playButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  playText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: colors.primary },
  openAppButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  openAppText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: colors.primary },
  videoFrame: { backgroundColor: '#000' },
  thumbnailBackground: {
    width: '100%',
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  youtubePlayButton: {
    width: 64,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 12,
  },
  thumbnailTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
  },
  thumbnailSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
  },

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
