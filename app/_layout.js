import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; // Import StatusBar for status bar customization

export default function Layout() {
  const scheme = useColorScheme(); // Detect system theme (dark or light)

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Configure the status bar */}
      <StatusBar style="light" backgroundColor="green" translucent />

      {/* Define the stack navigator with global screen options */}
      <Stack
        screenOptions={{
          //headerShown: false, // Hide headers globally
          statusBarStyle: 'light', // Set status bar text/icons to light
          statusBarTranslucent: true, // Make the status bar translucent
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, }} />
        <Stack.Screen name="home" options={{ title: 'HomePage' }} />
        <Stack.Screen name="add-edit" options={{ title: 'Manage Patient Details' }} />
        <Stack.Screen name="webview" options={{ title: 'Health Resources' }} />
      </Stack>
    </ThemeProvider>
  );
}