import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Platform,
  ImageStyle,
  StyleProp,
  TouchableHighlight,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';

interface getPhotoUploadUrlVar {
  extension: String;
}

export const GET_PHOTO_UPLOAD_URL = gql`
  mutation($extension: String!) {
    getPhotoUploadUrl(extension: $extension)
  }
`;

type RecipeImagePicker = {
  url: string | null;
  onPhotoUploding(uri: string): any;
  onPhotoUploded(url: string): any;
  onPhotoUploadError(error: any): any;
  style: StyleProp<ImageStyle> | undefined;
};

export default function RecipeImagePicker({
  url,
  onPhotoUploding,
  onPhotoUploded,
  onPhotoUploadError,
  style,
}: RecipeImagePicker) {
  const [image, setImage] = useState<string | null>(url);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const [_getPhotoUploadUrl] = useMutation(GET_PHOTO_UPLOAD_URL);
  async function getPhotoUploadUrl(extension: string): Promise<string> {
    const { data } = await _getPhotoUploadUrl({ variables: { extension } });
    return data?.getPhotoUploadUrl;
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: false,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      onPhotoUploding(result.uri);
      setLoading(true);
      try {
        const remoteUrl = await uploadImage(getPhotoUploadUrl, result.uri);
        setLoading(false);
        onPhotoUploded(remoteUrl);
      } catch (error) {
        setLoading(false);
        setImage(null);
        onPhotoUploadError(error);
      }
    }
  };
  let text = <Text style={{ color: colors.primary }}>Pick an image</Text>;
  if (isLoading) {
    text = <ActivityIndicator />;
  }
  let content = (
    <View style={[style, styles.container, { borderColor: colors.primary }]}>{text}</View>
  );
  const uri = image ?? url;
  if (uri != null) {
    content = (
      <ImageBackground
        source={{ uri }}
        style={[style, styles.container, { borderColor: colors.primary }]}
        accessibilityLabel="Recipe's image"
      >
        {text}
      </ImageBackground>
    );
  }

  return (
    <TouchableHighlight testID="uploadPhotoLink" onPress={pickImage}>
      {content}
    </TouchableHighlight>
  );
}

async function uploadImage(
  getPhotoUploadUrl: (extension: string) => Promise<string>,
  uri: string,
): Promise<string> {
  const extension = getFileExtension(uri);
  const uploadUrl: string = await getPhotoUploadUrl(extension);

  await uploadFileToServer(uploadUrl, uri);
  return uploadUrl.split('?')[0];
}

export function getFileExtension(uri: string): string {
  const base64Extractor = /^data:image\/(\w*);base64,/;
  const extension = uri.match(base64Extractor);
  if (extension && extension[1]) {
    return extension[1];
  }
  const parts = uri.split('.');
  return parts[parts.length - 1];
}

const uploadFileToServer = async (uploadUrl: string, fileUri: string) => {
  const imageBody = await getBlob(fileUri);

  return fetch(uploadUrl, {
    method: 'PUT',
    body: imageBody,
  });
};

const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    resizeMode: 'contain',
  },
});
