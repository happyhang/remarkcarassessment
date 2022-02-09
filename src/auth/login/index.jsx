import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  View, StyleSheet, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContainerStyle } from 'common/styles';
import FormikForm from 'common/components/formikForm';
import FormikTextInput from 'common/components/formikTextInput';
import Button from 'common/components/button';
import { LoginContext } from 'context/login';

const styles = StyleSheet.create({
  container: {
    ...ContainerStyle.outerContainer,
    justifyContent: 'center',
  },
  contentContainer: {
    ...ContainerStyle.contentContainer,
    ...ContainerStyle.standardScreenSpacing,
  },
});

const initialForm = {
  username: '',
  password: '',
};

const validateForm = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter username';
  } if (!values.password) {
    errors.password = 'Please enter password';
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
};

function LoginScreen() {
  const { bottom } = useSafeAreaInsets();
  const loginContext = React.useContext(LoginContext);

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, { paddingBottom: bottom }]}>
        <FormikForm
          initialValues={initialForm}
          validate={validateForm}
          onSubmit={(f) => {
            const result = loginContext.attemptLogin(f.username, f.password);
            if (!result) {
              Alert.alert('Error', 'Incorrect username or password entered. Please try again.', [{
                text: 'OK',
              }]);
            }
          }}
        >
          {({ handleSubmit }) => (
            <View>
              <FormikTextInput
                label="Username"
                name="username"
              />
              <FormikTextInput
                label="Password"
                name="password"
                secureTextEntry
              />
              <Button onPress={handleSubmit} text="Submit" />
            </View>
          )}
        </FormikForm>
      </View>
    </View>
  );
}

export default observer(LoginScreen);
