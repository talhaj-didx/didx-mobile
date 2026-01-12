import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { OfflineScreen } from '../components/OfflineScreen';
import { checkNetworkStatus } from '../utils/network';
import { theme } from '../constants/theme';

interface WebViewScreenProps {
  url: string;
}

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    checkNetworkStatus().then((isOnline) => {
      setIsOffline(!isOnline);
    });

    const interval = setInterval(async () => {
      const isOnline = await checkNetworkStatus();
      setIsOffline(!isOnline);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webViewRef.current) {
          webViewRef.current.goBack();
          return true; // Prevent default back behavior
        }
        return false; // Allow default back behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const hideElementsScript = `
    (function() {
      function hideElements() {
        document.querySelectorAll('header, footer').forEach(el => el.style.display = 'none');
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideElements);
      } else {
        hideElements();
      }
    })();
    true;
  `;

  if (isOffline) {
    return <OfflineScreen />;
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        sharedCookiesEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        injectedJavaScript={hideElementsScript}
        onMessage={() => {}}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND,
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
