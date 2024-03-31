import 'react-native-gesture-handler';
import * as React from 'react';
import {Providers} from './source/providers';
import AppNavigator from './source/navigation';

const App = () => {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
};

export default App;
