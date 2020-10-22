import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import type { ImageDetailProps } from './screen';
import useDimension from '../../hooks/useDimension';

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
    <ImageZoom
      cropWidth={width}
      cropHeight={contentHeight}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
    >
      <Image
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
        source={{ uri: imageUrl }}
        accessibilityLabel="Recipe's image"
      />
    </ImageZoom>
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
