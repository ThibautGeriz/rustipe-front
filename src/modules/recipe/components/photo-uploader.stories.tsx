import React from 'react';
import { action } from '@storybook/addon-actions';
import { MockedProvider } from '@apollo/client/testing';

import PhotoUploader from './photo-uploader';

export default { title: 'Photo uploader', component: PhotoUploader };

const onPhotoUploding = action('onPhotoUploding');
const onPhotoUploded = action('onPhotoUploded');
const onPhotoUploadError = action('onPhotoUploadError');

export const withoutImage = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <PhotoUploader
      url={null}
      onPhotoUploding={onPhotoUploding}
      onPhotoUploded={onPhotoUploded}
      onPhotoUploadError={onPhotoUploadError}
      style={{ width: 100, height: 100 }}
    />
  </MockedProvider>
);

export const withImage = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <PhotoUploader
      url="https://reactnative.dev/img/header_logo.svg"
      onPhotoUploding={onPhotoUploding}
      onPhotoUploded={onPhotoUploded}
      onPhotoUploadError={onPhotoUploadError}
      style={{ width: 100, height: 100 }}
    />
  </MockedProvider>
);
