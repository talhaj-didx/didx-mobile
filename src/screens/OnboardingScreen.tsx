import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { theme } from '../constants/theme';
import { setOnboardingComplete } from '../utils/storage';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onDone: () => void;
}

const slides = [
  {
    key: '1',
    title: 'Global Marketplace',
    text: 'Wholesale DIDs from 100+ countries',
    backgroundColor: theme.BACKGROUND,
    image: require('../../assets/onboading-icons/global-marketplace.gif'),
  },
  {
    key: '2',
    title: 'Instant Provisioning',
    text: 'Purchase and configure in real-time',
    backgroundColor: theme.BACKGROUND,
    image: require('../../assets/onboading-icons/instant-provisioning.gif'),
  },
  {
    key: '3',
    title: 'Real-time Stats',
    text: 'Manage CDRs and support tickets',
    backgroundColor: theme.BACKGROUND,
    image: require('../../assets/onboading-icons/realtime-stats.gif'),
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onDone }) => {
  const handleDone = async () => {
    await setOnboardingComplete(false);  // should be true later
    onDone();
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        {item.image && (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={handleDone}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dot}
      renderDoneButton={() => (
        <View style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </View>
      )}
      renderNextButton={() => (
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.SPACING.lg,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: theme.SPACING.xl,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.TEXT,
    marginBottom: theme.SPACING.md,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: theme.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 28,
  },
  activeDot: {
    backgroundColor: theme.PRIMARY,
    width: 12,
    height: 12,
  },
  dot: {
    backgroundColor: theme.BORDER,
    width: 8,
    height: 8,
  },
  doneButton: {
    backgroundColor: theme.PRIMARY,
    paddingHorizontal: theme.SPACING.lg,
    paddingVertical: theme.SPACING.sm,
    borderRadius: 8,
    marginRight: theme.SPACING.md,
  },
  doneButtonText: {
    color: theme.BACKGROUND,
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.SPACING.lg,
    paddingVertical: theme.SPACING.sm,
    borderRadius: 8,
    marginRight: theme.SPACING.md,
  },
  nextButtonText: {
    color: theme.PRIMARY,
    fontSize: 16,
    fontWeight: '600',
  },
});
