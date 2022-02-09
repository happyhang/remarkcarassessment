import * as React from 'react';
import PropTypes from 'prop-types';
import { LoginContext, LoginInstance } from 'context/login';
import { create, persist } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { observable } from 'mobx';
import { CarMovieListContext, CarMovieListInstance } from '../../carMovieList';

// Attempt using mobx-persist to persist the LoginInstance
const loginSchema = {
  isLoggedIn: true,
  username: true,
};
const persistLoginStore = persist(loginSchema)(observable(LoginInstance));

async function hydrateStore() {
  const hydrate = create({ storage: AsyncStorage });
  await hydrate('LoginState', persistLoginStore);
}

// I am not familiar with MobX and its rendering practices, so as temporary measure I
// am just dumping everything here as a global context provider.
function StoreProvider({ children }) {
  // Currently the app may show a blank screen for brief moment when it is rehydrating.
  // In practice the app should have a splash screen and continue not hiding the splash
  // screen until it finished initializing.
  const [isReady, setIsReady] = React.useState(false);

  React.useLayoutEffect(() => {
    hydrateStore().then(() => {
      setIsReady(true);
    });
  }, []);

  return isReady ? (
    <LoginContext.Provider value={LoginInstance}>
      <CarMovieListContext.Provider value={CarMovieListInstance}>
        {children}
      </CarMovieListContext.Provider>
    </LoginContext.Provider>
  ) : null;
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
