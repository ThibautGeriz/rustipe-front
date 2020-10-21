import { enableFetchMocks } from 'jest-fetch-mock';

import * as React from 'react';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';
import { MockedProvider } from '@apollo/client/testing';
import * as ImagePicker from 'expo-image-picker';

import RecipeImagePicker, { getFileExtension, GET_PHOTO_UPLOAD_URL } from './photo-uploader';

enableFetchMocks();

const getPhotoUploadUrl = jest.fn();
const getPhotoUploadUrlMock = {
  request: {
    query: GET_PHOTO_UPLOAD_URL,
    variables: { extension: 'jpeg' },
  },
  result: getPhotoUploadUrl,
};
const imageAsBase64 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFDZp';

describe('Photo uploader', () => {
  const onPhotoUploding = jest.fn();
  const onPhotoUploded = jest.fn();
  const onPhotoUploadError = jest.fn();

  const defaultProps = {
    url: null,
    onPhotoUploding,
    onPhotoUploded,
    onPhotoUploadError,
  };
  const getRecipeImagePicker = (props?: any, mock?: any[]) =>
    render(
      <MockedProvider mocks={mock ?? [getPhotoUploadUrlMock]} addTypename={false}>
        <RecipeImagePicker {...defaultProps} {...props} />
      </MockedProvider>,
    );

  let component: RenderAPI;

  beforeEach(() => {
    onPhotoUploding.mockReset();
    onPhotoUploded.mockReset();
    onPhotoUploadError.mockReset();
    getPhotoUploadUrl.mockReset();
    getPhotoUploadUrl.mockReturnValue({
      data: { getPhotoUploadUrl: 'https://upload.url/some-id.jpeg' },
    });
    fetchMock.doMock();
  });
  describe('with a photo', () => {
    beforeEach(() => {
      // given
      component = getRecipeImagePicker({ url: 'https://reactnative.dev/img/header_logo.svg' });
    });

    it('should show the image', () => {
      // then
      const image = component.queryByA11yLabel("Recipe's image");
      expect(image).toBeTruthy();
      expect(image!.props.source).toEqual({ uri: 'https://reactnative.dev/img/header_logo.svg' });
    });
  });

  describe('without a photo', () => {
    beforeEach(() => {
      // given
      component = getRecipeImagePicker({ url: null });
    });

    it('should not show the image', () => {
      // then
      const image = component.queryByA11yLabel("Recipe's image");
      expect(image).toBeFalsy();
    });
    describe('when uploading a photo', () => {
      beforeEach(async () => {
        // given
        ((ImagePicker.launchImageLibraryAsync as unknown) as jest.Mock<{}>).mockReturnValueOnce({
          uri: imageAsBase64,
          cancelled: false,
        });

        // when
        await fireEvent.press(component.getByTestId('uploadPhotoLink'));
        await wait();
        await wait();
      });

      it('should ask the browser/OS for a file', () => {
        expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
          allowsEditing: true,
          aspect: [4, 3],
          base64: false,
          mediaTypes: 'Images',
          quality: 0.7,
        });
      });

      it('should retrieve the URl to upload photo', async () => {
        // then
        expect(getPhotoUploadUrl).toHaveBeenCalled();
      });

      it('should upload the photo', async () => {
        // then
        await wait();
        const call = ((fetch as unknown) as jest.Mock<any>).mock.calls[1];
        expect(call[0]).toBe('https://upload.url/some-id.jpeg');
      });

      it('should show the image', () => {
        // then
        const image = component.queryByA11yLabel("Recipe's image");
        expect(image).toBeTruthy();
        expect(image!.props.source).toEqual({ uri: imageAsBase64 });
      });

      it('should call the callback', () => {
        // then
        expect(onPhotoUploded).toHaveBeenCalledWith('https://upload.url/some-id.jpeg');
      });
    });
  });
  describe('getFileExtension', () => {
    describe('with a file URI', () => {
      it('should extract the extention', () => {
        // given
        const input =
          'file:///var/mobile/Containers/Data/Application/A5905002-69DA-4158-9C6C-B84E0CE02A07/Library/Caches/ExponentExperienceData/%2540thibautgery%252Frustipe/ImagePicker/F3CF387E-8788-4C41-8566-A95D85762AB0.jpg';

        // when
        const result = getFileExtension(input);

        // then
        expect(result).toBe('jpg');
      });
    });

    describe('with a base64 URI', () => {
      it('should extract the extention', () => {
        // given
        const input = imageAsBase64;

        // when
        const result = getFileExtension(input);

        // then
        expect(result).toBe('jpeg');
      });
    });
  });
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));
