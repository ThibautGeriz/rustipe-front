import React from 'react';
import { StyleSheet, View, AsyncStorage, TouchableHighlight } from 'react-native';
import {
  TextInput,
  Title,
  Subheading,
  Button,
  ActivityIndicator,
  HelperText,
  Snackbar,
  useTheme,
  Text,
} from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';

import { KeyboardAwareScrollView } from '../../components/react-native-keyboard-aware-scroll-view';
import { AUTH_TOKEN_NAME } from '../constants';

import type { UserSignupProps } from './screen';

export const SIGNUP = gql`
  mutation($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export default function UserSignup({ navigation }: UserSignupProps) {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState<string>('');

  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onError = () => {
    setVisible(true);
  };

  const [signup, { loading, error: mutationError }] = useMutation(SIGNUP, {
    onError,
  });
  const [emailError, setEmailError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Title style={styles.title}>Rustipe</Title>
        <Subheading style={styles.subtitle}>All your recipes in one place</Subheading>
      </View>
      <KeyboardAwareScrollView>
        <TextInput
          testID="emailInput"
          style={styles.textInput}
          label="Email"
          error={!!emailError}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="username"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        <TextInput
          testID="passwordInput"
          style={styles.textInput}
          label="Password"
          error={!!passwordError}
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <HelperText type="error" visible={!!passwordError}>
          {passwordError}
        </HelperText>
        {loading || (
          <Button
            testID="signupButton"
            style={styles.button}
            mode="contained"
            onPress={async () => {
              if (!email) {
                setEmailError('Email cannot be empty');
                return;
              }
              if (!email.includes('@') || !email.includes('.')) {
                setEmailError('Not a valid email');
                return;
              }
              setEmailError('');
              if (password.length < 7) {
                setPasswordError('Password must be at least 7 characters');
                return;
              }
              setPasswordError('');
              const token = await signup({ variables: { email, password } });
              await AsyncStorage.setItem(AUTH_TOKEN_NAME, token.data);
              navigation.navigate('Recipes', {});
            }}
          >
            Signup
          </Button>
        )}
        {!loading || <ActivityIndicator animating data-testid="ActivityIndicator" />}
        <View style={styles.links}>
          <TouchableHighlight onPress={() => navigation.navigate('Signin', {})}>
            <Text style={styles.link}>You already have a account?</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {mutationError && mutationError.message ? mutationError.message : undefined}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: { color: 'white', marginBottom: 20 },
  subtitle: { color: 'white' },
  textInput: { margin: 10 },
  button: { margin: 10 },
  links: { margin: 10, alignItems: 'center', justifyContent: 'center' },
  link: { textDecorationLine: 'underline' },
});