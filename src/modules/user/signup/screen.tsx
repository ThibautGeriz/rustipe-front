import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import UserSignup from './user-signup';
import type { RootStackParamList } from '../../../../App';

type UserSignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
type UserSignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;

export interface UserSignupProps {
  navigation: UserSignupScreenNavigationProp;
  route: UserSignupScreenRouteProp;
}

export default function Screen(props: any) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <UserSignup {...props} />
    </View>
  );
}
