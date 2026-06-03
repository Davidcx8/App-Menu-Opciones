# App Menu Opciones

App Menu Opciones es una aplicación móvil desarrollada con Expo y React Native que demuestra un menú lateral (drawer) con varias utilidades interactivas. El proyecto incluye pantallas para perfil personal, una sumadora, conversión de números a texto, tabla de multiplicar y una presentación de experiencia.

## Características

- Navegación lateral (drawer) personalizada
- Pantalla de perfil con diseño moderno y avatar
- Sumadora con validación de entrada y animaciones
- Conversor de número a letras en español
- Tabla de multiplicar visual
- Sección de experiencia personal con contenido multimedia
- Uso de fuentes personalizadas y degradados 
- Compatible con Android, iOS y web a través de Expo

## Tecnologías

- Expo SDK 54
- React Native 0.81
- TypeScript
- React Navigation Drawer
- Expo Google Fonts (Poppins)
- Expo Linear Gradient
- Expo Splash Screen
- React Native Web
- React Native WebView
- React Native YouTube IFrame

## Instalación

```bash
npm install
```

## Ejecución

Desde la carpeta del proyecto, ejecuta:

```bash
npm start
```

Y luego selecciona la plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Descargar APK

Puedes descargar el APK directamente desde el siguiente enlace:

https://drive.google.com/file/d/1RsxXCif1Ji7Bxashx6_eAhR5vDXGUiN7/view?usp=sharing

## Estructura principal

- `App.tsx`: punto de entrada principal con carga de fuentes, splash screen y configuración de navegación.
- `src/navigation/DrawerNavigator.tsx`: configuración del drawer y contenido personalizado.
- `src/screens/HomeScreen.tsx`: pantalla de perfil / bienvenida.
- `src/screens/SumadoraScreen.tsx`: pantalla para sumar dos números.
- `src/screens/TraductorScreen.tsx`: pantalla para convertir número a letras.
- `src/screens/TablaScreen.tsx`: pantalla para generar la tabla de multiplicar.
- `src/screens/ExperienciaScreen.tsx`: pantalla de experiencia con video y contenido.
- `src/theme/colors.ts`: paleta de colores del proyecto.
- `src/theme/typography.ts`: estilos tipográficos reutilizables.
- `src/utils/numberToWords.ts`: función para convertir números a texto.

## Notas

- El proyecto se entrega como una aplicación privada (`private: true`) en `package.json`.
- Asegúrate de tener instalado Expo CLI para ejecutar el proyecto localmente.

## Licencia

Este proyecto está bajo la licencia incluida en el archivo `LICENSE`.
