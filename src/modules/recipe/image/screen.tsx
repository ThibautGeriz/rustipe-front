import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import ImageDetail from './image-detail';
import Header from './header';
import type { RootStackParamList } from '../../../../App';

type ImageDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Image'>;
type ImageScreenRouteProp = RouteProp<RootStackParamList, 'Image'>;

export interface ImageDetailProps {
  navigation: ImageDetailScreenNavigationProp;
  route: ImageScreenRouteProp;
}

export default function Screen(props: any) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Header {...props} />
      <ImageDetail {...props} />
    </View>
  );
}
