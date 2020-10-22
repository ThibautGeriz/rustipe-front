import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function useDimension() {
  const { width: initialViewWidth, height: initialViewHeight } = Dimensions.get('window');
  const [width, setWidth] = useState(initialViewWidth);
  const [height, setHeight] = useState(initialViewHeight);

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then(setImageSize);
    const subscription = ScreenOrientation.addOrientationChangeListener(setImageSize);
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
  const setImageSize = () => {
    const { width: viewWidth, height: viewHeight } = Dimensions.get('window');
    setWidth(viewWidth);
    setHeight(viewHeight);
  };
  return { width, height };
}
