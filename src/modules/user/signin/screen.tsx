import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import UserSignin from './user-signin';
import type { RootStackParamList } from '../../../../App';

type UserSigninScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signin'>;
type UserSigninScreenRouteProp = RouteProp<RootStackParamList, 'Signin'>;

export interface UserSigninProps {
  navigation: UserSigninScreenNavigationProp;
  route: UserSigninScreenRouteProp;
}

export default function Screen(props: any) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <UserSignin {...props} />
    </View>
  );
}
