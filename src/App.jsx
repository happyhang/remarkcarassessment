import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from 'common/routes';
import StoreProvider from 'common/store';

function App() {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </StoreProvider>
  );
}

export default App;
