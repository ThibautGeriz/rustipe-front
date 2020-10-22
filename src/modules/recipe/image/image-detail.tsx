import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';

import useDimension from '../../hooks/useDimension';
import type { ImageDetailProps } from './screen';

const HEADER_HEIGHT: number = 30;

export default function RecipeDetail({ route }: ImageDetailProps) {
  const { imageUrl } = route.params;
  const [ratio, setRatio] = useState(16 / 9);
  const { width, height } = useDimension();

  useEffect(() => {
    (async () => {
      setRatio(await getImageRatio(imageUrl));
    })();

    return () => undefined;
  }, []);

  const contentHeight = height - HEADER_HEIGHT;
  let imageWidth = width;
  let imageHeight = imageWidth / ratio;

  if (imageHeight > contentHeight) {
    imageHeight = contentHeight;
    imageWidth = imageHeight * ratio;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
        source={{ uri: imageUrl }}
        accessibilityLabel="Recipe's image"
      />
    </View>
  );
}

async function getImageRatio(imageUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUrl,
      (imageWidth: number, imageHeight: number) => {
        resolve(imageWidth / imageHeight);
      },
      reject,
    );
  });
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
