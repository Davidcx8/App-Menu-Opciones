import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from '../screens/HomeScreen';
import SumadoraScreen from '../screens/SumadoraScreen';
import TraductorScreen from '../screens/TraductorScreen';
import TablaScreen from '../screens/TablaScreen';
import ExperienciaScreen from '../screens/ExperienciaScreen';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const Drawer = createDrawerNavigator();

const MENU_ITEMS = [
  { name: 'Perfil', icon: 'account-circle' },
  { name: 'Sumadora', icon: 'plus-box' },
  { name: 'Número a Letras', icon: 'translate' },
  { name: 'Tabla ×', icon: 'grid' },
  { name: 'Mi Experiencia', icon: 'youtube' },
];

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Gradient Header */}
      <LinearGradient
        colors={[colors.primaryDark, colors.primary, '#8E24AA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Decorative circle */}
        <View style={styles.decorCircle} />
        <View style={styles.decorCircle2} />

        {/* Avatar */}
        <View style={styles.avatarRing}>
          <Image
            source={require('../../assets/images/mi_foto.jpg')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.headerName}>Jose David</Text>
        <Text style={styles.headerLastName}>Castillo Castillo</Text>

        {/* Accent divider */}
        <View style={styles.accentLine} />

        <View style={styles.emailRow}>
          <MaterialCommunityIcons name="email-outline" size={13} color={colors.accent} />
          <Text style={styles.headerEmail} numberOfLines={1}>
            josedavidcastillocastillo75@gmail.com
          </Text>
        </View>

        {/* Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ITLA</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SDK 54</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Section title */}
      <Text style={styles.sectionLabel}>MENÚ PRINCIPAL</Text>

      {/* Drawer Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <View style={styles.footerContent}>
          <MaterialCommunityIcons name="information-outline" size={14} color={colors.textMuted} />
          <Text style={styles.footerText}>App Menu Opciones · v1.0.0</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Perfil"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 18,
          color: colors.white,
        },
        headerRight: () => (
          <View style={{ marginRight: 16, width: 34, height: 34, borderRadius: 17, overflow: 'hidden', borderWidth: 2, borderColor: colors.accent }}>
            <Image
              source={require('../../assets/images/mi_foto.jpg')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        ),
        drawerStyle: {
          backgroundColor: colors.surface,
          width: 290,
        },
        drawerActiveBackgroundColor: '#EDE7F6',
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 15,
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 2,
        },
        keyboardDismissMode: 'none',
      }}
    >
      <Drawer.Screen
        name="Perfil"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sumadora"
        component={SumadoraScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Número a Letras"
        component={TraductorScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="translate" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tabla ×"
        component={TablaScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mi Experiencia"
        component={ExperienciaScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="youtube" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: { paddingTop: 0, flex: 1 },
  header: {
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -40,
    right: -40,
  },
  decorCircle2: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,215,0,0.1)',
    bottom: 10,
    right: 20,
  },
  avatarRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: colors.accent,
    overflow: 'hidden',
    marginBottom: 14,
  },
  avatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  headerName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: colors.white,
    lineHeight: 28,
  },
  headerLastName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  accentLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginBottom: 12,
  },
  emailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  headerEmail: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    flex: 1,
  },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.5)',
  },
  badgeText: { fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: colors.accent },
  sectionLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 1.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  drawerItemsContainer: { paddingHorizontal: 10 },
  footer: { marginTop: 'auto', paddingHorizontal: 20, paddingBottom: 24 },
  footerDivider: { height: 1, backgroundColor: colors.border, marginBottom: 14 },
  footerContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerText: { ...typography.caption, color: colors.textMuted },
});
