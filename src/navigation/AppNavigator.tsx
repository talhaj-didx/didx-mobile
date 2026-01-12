import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Search, LifeBuoy } from 'lucide-react-native';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { getOnboardingComplete } from '../utils/storage';
import { theme } from '../constants/theme';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardScreen = () => <WebViewScreen url="https://google.com" />;
const InventoryScreen = () => <WebViewScreen url="https://google.com/search?q=inventory" />;
const SupportScreen = () => <WebViewScreen url="https://google.com/search?q=support" />;

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.PRIMARY,
        tabBarInactiveTintColor: theme.TEXT_SECONDARY,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.BORDER,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <LifeBuoy size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await getOnboardingComplete();
      setHasCompletedOnboarding(completed);
    };
    checkOnboarding();
  }, []);

  if (hasCompletedOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.PRIMARY} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}
    >
      <Stack.Screen name="Onboarding">
        {({ navigation }) => (
          <OnboardingScreen
            onDone={() => {
              setHasCompletedOnboarding(true);
              navigation.replace('MainTabs');
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.BACKGROUND,
  },
});
