import * as Network from 'expo-network';

export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isConnected && networkState.isInternetReachable !== false;
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};
