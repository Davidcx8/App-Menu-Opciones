import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ProfileCardProps {
  name: string;
  email: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, email }) => {
  return (
    <View style={styles.container}>
      {/* Decorative background orb */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <LinearGradient
        colors={[colors.primaryDark, colors.primary, colors.primaryLight]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={[colors.accent, colors.accentLight]}
            style={styles.avatarRing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.avatarInner}>
              <Image
                source={require('../../assets/images/mi_foto.jpg')}
                style={styles.image}
              />
            </View>
          </LinearGradient>
          <View style={styles.statusDot} />
        </View>

        {/* Name */}
        <Text style={styles.name}>Jose David</Text>
        <Text style={styles.lastName}>Castillo Castillo</Text>

        {/* Gold divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <MaterialCommunityIcons name="star-four-points" size={14} color={colors.accent} />
          <View style={styles.dividerLine} />
        </View>

        {/* Email chip */}
        <View style={styles.emailChip}>
          <MaterialCommunityIcons name="email-outline" size={15} color={colors.accent} />
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* Badge row */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="school" size={14} color={colors.accent} />
            <Text style={styles.badgeText}>ITLA</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="code-tags" size={14} color={colors.accent} />
            <Text style={styles.badgeText}>Developer</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="android" size={14} color={colors.accent} />
            <Text style={styles.badgeText}>Mobile</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  orb1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primaryLight,
    opacity: 0.15,
    top: -40,
    right: -40,
  },
  orb2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    opacity: 0.08,
    bottom: -20,
    left: -20,
  },
  card: {
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.primaryDark,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 2,
  },
  lastName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    width: '70%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,215,0,0.4)',
  },
  emailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  emailText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
  },
  badgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: colors.accent,
  },
});
