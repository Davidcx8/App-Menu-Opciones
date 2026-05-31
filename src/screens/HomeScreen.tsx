import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileCard } from '../components/ProfileCard';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundDark, '#DDD5F5']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          name="Jose David Castillo Castillo"
          email="josedavidcastillocastillo75@gmail.com"
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 40,
  },
});
