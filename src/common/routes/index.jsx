import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { LoginContext } from 'context/login';
import LoginScreen from '../../auth/login';
import { CarMovieListScreen } from '../../carMovieList';

const Stack = createNativeStackNavigator();

function Routes() {
  const loginContext = React.useContext(LoginContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loginContext.isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        ) : (
          <Stack.Screen
            name="Car Movie List"
            component={CarMovieListScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default observer(Routes);
