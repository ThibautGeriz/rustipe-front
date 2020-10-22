import * as React from 'react';
import { Image } from 'react-native';
import { render, RenderAPI } from 'react-native-testing-library';
import '@testing-library/jest-native/extend-expect';
import { RouteProp } from '@react-navigation/native';

import ImageDetail from './image-detail';
import type { RootStackParamList } from '../../../../App';

describe('Image Detail', () => {
  const route = {
    params: {
      imageUrl: 'https://reactnative.dev/img/header_logo.svg',
    },
  } as RouteProp<RootStackParamList, 'Image'>;

  const getImageDetail = (props?: any) => render(<ImageDetail route={route} {...props} />);

  let component: RenderAPI;

  describe('by default', () => {
    beforeEach(() => {
      const getSizeMock = jest.spyOn(Image, 'getSize');
      getSizeMock.mockImplementation(() => null);
      component = getImageDetail();
    });

    it('should show the image', () => {
      // then
      const image = component.queryByA11yLabel("Recipe's image");
      expect(image).toBeTruthy();
      expect(image!.props.source).toEqual({ uri: 'https://reactnative.dev/img/header_logo.svg' });
    });
  });
});
