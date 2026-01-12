import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@didx_mobile:onboarding_complete';

export const setOnboardingComplete = async (value: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
};

export const getOnboardingComplete = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Error reading onboarding status:', error);
    return false;
  }
};
