import * as MediaLibrary from 'expo-media-library';

export const requestMediaPermission = async (): Promise<boolean> => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    console.log('Permission granted');
    return true;
  } else {
    console.log('Permission denied');
    return false;
  }
};
